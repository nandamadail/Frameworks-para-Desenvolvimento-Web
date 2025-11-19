const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Model Test', () => {
  it('deve criar um usuário com os campos corretos', () => {
    const userData = {
      nome: 'João Silva',
      email: 'joao@teste.com',
      senha: 'senha123'
    };

    const validUser = new User(userData);
    expect(validUser.nome).toBe(userData.nome);
    expect(validUser.email).toBe(userData.email);
    expect(validUser.senha).toBe(userData.senha);
  });

  it('deve requerer campos obrigatórios', () => {
    const userWithoutRequiredField = new User({});
    const validation = userWithoutRequiredField.validateSync();
    
    expect(validation.errors.nome).toBeDefined();
    expect(validation.errors.email).toBeDefined();
    expect(validation.errors.senha).toBeDefined();
  });

  it('deve validar o schema do usuário', () => {
    const userData = {
      nome: 'Maria Santos',
      email: 'maria@teste.com',
      senha: 'senha456'
    };

    const user = new User(userData);
    expect(user).toHaveProperty('nome');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('senha');
  });

  it('deve aceitar email único', () => {
    const userData = {
      nome: 'Pedro Costa',
      email: 'pedro@teste.com',
      senha: 'senha789'
    };

    const user = new User(userData);
    expect(user.email).toBe(userData.email);
  });

  it('deve criar usuário sem campos extras', () => {
    const userData = {
      nome: 'Ana Silva',
      email: 'ana@teste.com',
      senha: 'senha321',
      campoExtra: 'valor'
    };

    const user = new User(userData);
    expect(user.campoExtra).toBeUndefined();
  });
});
