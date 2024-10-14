const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configurando a conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Usuário root
  password: '', // Sem senha
  database: 'pulse' // Nome do seu banco de dados
});

// Conectando ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida!');
});

app.use(cors());
app.use(bodyParser.json());

// Rota para login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(query, [email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      return res.status(500).send({ message: 'Erro ao fazer login', error: err });
    }

    if (results.length === 0) {
      return res.status(401).send({ message: 'Credenciais inválidas' });
    }

    res.status(200).send({ message: 'Login bem-sucedido', usuario: results[0] });
  });
});

// Rota para cadastrar um novo usuário
app.post('/api/cadastrar', (req, res) => {
  const { nome, email, senha } = req.body;

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [nome, email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).send({ message: 'Erro ao cadastrar usuário', error: err });
    }

    res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
  });
});

// Rota para listar todos os usuários
app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).send({ message: 'Erro ao buscar usuários', error: err });
    }

    res.status(200).send(results);
  });
});

// Rota para excluir um usuário pelo ID
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      return res.status(500).send({ message: 'Erro ao excluir usuário', error: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    res.status(200).send({ message: 'Usuário excluído com sucesso!' });
  });
});

// Exemplo de rota para teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});