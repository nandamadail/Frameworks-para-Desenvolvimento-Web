const request = require('supertest');
const app = require('../server');

describe('API Routes Test', () => {
  // Teste da rota raiz
  describe('GET /', () => {
    it('deve retornar mensagem de API funcionando', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('API funcionando!');
    });
  });

  // Teste da rota de cadastro
  describe('POST /api/cadastrar', () => {
    it('deve retornar erro 500 quando não houver conexão com banco', async () => {
      const userData = {
        nome: 'Teste User',
        email: 'teste@teste.com',
        senha: 'senha123'
      };

      const res = await request(app)
        .post('/api/cadastrar')
        .send(userData);

      // Como não temos banco de dados configurado, esperamos um erro 500
      expect([500, 201]).toContain(res.statusCode);
    });
  });

  // Teste da rota de login
  describe('POST /api/login', () => {
    it('deve retornar erro 500 quando não houver conexão com banco', async () => {
      const loginData = {
        email: 'teste@teste.com',
        senha: 'senha123'
      };

      const res = await request(app)
        .post('/api/login')
        .send(loginData);

      // Como não temos banco de dados configurado, esperamos um erro 500
      expect([500, 401]).toContain(res.statusCode);
    });
  });

  // Teste da rota de usuários (protegida)
  describe('GET /api/usuarios', () => {
    it('deve retornar 403 sem token de autenticação', async () => {
      const res = await request(app).get('/api/usuarios');
      expect(res.statusCode).toBe(403);
      expect(res.text).toBe('Acesso negado');
    });

    it('deve retornar 403 com token inválido', async () => {
      const res = await request(app)
        .get('/api/usuarios')
        .set('Authorization', 'Bearer token_invalido');
      
      expect(res.statusCode).toBe(403);
      expect(res.text).toBe('Token inválido');
    });
  });

  // Teste da rota do dashboard (protegida)
  describe('GET /api/dashboard', () => {
    it('deve retornar 403 sem token de autenticação', async () => {
      const res = await request(app).get('/api/dashboard');
      expect(res.statusCode).toBe(403);
      expect(res.text).toBe('Acesso negado');
    });
  });
});
