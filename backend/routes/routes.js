const express = require('express');
const router = express.Router();
const connection = require('./db'); // Arquivo de conexão com o MySQL

// Rota para cadastrar um novo usuário
router.post('/api/cadastrar', (req, res) => {
  // Extrai nome, email e senha do corpo da requisição
  const { nome, email, senha } = req.body;

  // Validação básica dos dados
  if (!nome || !email || !senha) {
    return res.status(400).send({ message: 'Nome, e-mail e senha são obrigatórios.' });
  }

  // Query SQL para inserir um novo usuário na tabela 'usuarios'
  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

  // Executa a query no banco de dados
  connection.query(query, [nome, email, senha], (err, results) => {
    if (err) {
      // Loga o erro no console e retorna uma resposta de erro
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).send({ message: 'Erro ao cadastrar usuário.', error: err });
    }
    
    // Se a inserção for bem-sucedida, retorna uma resposta de sucesso
    res.status(201).send({ message: 'Usuário cadastrado com sucesso!', userId: results.insertId });
  });
});

// Exporta o router para ser usado em outras partes da aplicação
module.exports = router;
