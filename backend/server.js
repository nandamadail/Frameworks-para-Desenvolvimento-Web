require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Inicializa o Express
const app = express();
const port = 3000;

// Carregar variáveis de ambiente
const JWT_SECRET = process.env.JWT_SECRET; 
const TIKTOK_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
const TIKTOK_REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI; 

// Configurações de banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Usando variável de ambiente
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME 
});

// Conexão com o banco
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida!');
});

app.use(cors());
app.use(bodyParser.json());

// Middleware para autenticação de JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Pega o token do cabeçalho Authorization
  
  if (!token) {
    return res.status(403).send('Acesso negado');
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }
    req.user = user;
    next();
  });
};

// Rota de login e geração de JWT
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(query, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao fazer login');
    }

    if (results.length === 0) {
      return res.status(401).send('Credenciais inválidas');
    }

    const usuario = results[0];
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({
      message: 'Login bem-sucedido',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    });
  });
});

// Rota de cadastro de usuário
app.post('/api/cadastrar', (req, res) => {
  const { nome, email, senha } = req.body;

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [nome, email, senha], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao cadastrar usuário');
    }

    res.status(201).send('Usuário cadastrado com sucesso');
  });
});

// Rota para listar usuários (apenas para administradores)
app.get('/api/usuarios', authenticateJWT, (req, res) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar usuários');
    }

    res.status(200).send(results);
  });
});

// Rota de autenticação TikTok
app.get('/api/tiktok/auth', (req, res) => {
  const authUrl = `https://www.tiktok.com/auth/authorize/?client_key=${TIKTOK_CLIENT_KEY}&response_type=code&scope=user.info.basic&redirect_uri=${TIKTOK_REDIRECT_URI}&state=xyz`;
  res.redirect(authUrl);
});

// Rota para processar callback do TikTok e obter o token de acesso
app.get('/api/tiktok/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).send('Código de autenticação ausente');
  }

  try {
    const response = await axios.post('https://open-api.tiktok.com/oauth/access_token', {
      client_key: TIKTOK_CLIENT_KEY,
      client_secret: TIKTOK_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: TIKTOK_REDIRECT_URI
    });

    const accessToken = response.data.access_token;

    // Função para obter os dados do perfil do TikTok
    const obterDadosPerfilTikTok = async (accessToken) => {
      try {
        const perfilResponse = await axios.get('https://open-api.tiktok.com/user/info/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const usuario = perfilResponse.data.data;
        const seguidores = usuario.follower_count;
        const curtidas = usuario.total_like_count;
        const visualizacoes = usuario.total_play_count;

        return {
          seguidores,
          curtidas,
          visualizacoes
        };
      } catch (error) {
        console.error('Erro ao obter dados do perfil do TikTok:', error);
        return null;
      }
    };

    // Obter os dados do perfil
    const dadosPerfil = await obterDadosPerfilTikTok(accessToken);

    if (dadosPerfil) {
      // Salvar o token e os dados do perfil no banco de dados
      db.query('INSERT INTO tiktok_tokens (access_token, seguidores, curtidas, visualizacoes) VALUES (?, ?, ?, ?)', 
        [accessToken, dadosPerfil.seguidores, dadosPerfil.curtidas, dadosPerfil.visualizacoes], 
        (err, result) => {
          if (err) {
            return res.status(500).send('Erro ao salvar dados do TikTok');
          }

          res.status(200).send({
            message: 'Autenticação e obtenção de dados bem-sucedidas',
            access_token: accessToken,
            dadosPerfil
          });
        }
      );
    } else {
      res.status(500).send('Erro ao obter dados do perfil do TikTok');
    }
  } catch (error) {
    console.error('Erro ao trocar código por token:', error);
    res.status(500).send('Erro ao obter token do TikTok');
  }
});

// Rota do dashboard (precisa de autenticação)
app.get('/api/dashboard', authenticateJWT, (req, res) => {
  const queryInfluencers = 'SELECT COUNT(*) AS totalInfluencers FROM influencers';
  const queryEngagement = 'SELECT SUM(engagement) AS totalEngagement FROM engagement_data';

  db.query(queryInfluencers, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar dados de influenciadores');
    }

    const totalInfluencers = results[0].totalInfluencers;

    db.query(queryEngagement, (err, results) => {
      if (err) {
        return res.status(500).send('Erro ao buscar dados de engajamento');
      }

      const totalEngagement = results[0].totalEngagement;

      res.status(200).send({
        totalInfluencers,
        totalEngagement
      });
    });
  });
});

// Exemplo de rota para teste
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
