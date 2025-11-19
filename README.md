# Frameworks para Desenvolvimento Web

Este projeto demonstra o desenvolvimento de uma aplicação web usando frameworks modernos.

## Estrutura do Projeto

- **backend/**: API em Node.js com Express
- **projeto/**: Aplicação mobile em React Native com Expo

## Backend

### Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- MongoDB (Mongoose)
- JWT para autenticação
- Integração com TikTok API

### Instalação

```bash
cd backend
npm install
```

### Configuração

Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:

```env
JWT_SECRET=seu_segredo_jwt
TIKTOK_CLIENT_KEY=sua_chave_tiktok
TIKTOK_CLIENT_SECRET=seu_segredo_tiktok
TIKTOK_REDIRECT_URI=http://localhost:3000/api/tiktok/callback
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=pulse
```

### Executar o Servidor

```bash
cd backend
node server.js
```

### Testes

O projeto inclui testes unitários e de integração usando Jest e Supertest.

#### Executar Testes

```bash
cd backend
npm test
```

#### Executar Testes em Modo Watch

```bash
cd backend
npm run test:watch
```

#### Cobertura de Testes

Os testes são executados com relatório de cobertura de código automaticamente. Após executar `npm test`, você verá um relatório de cobertura no terminal.

#### Tipos de Testes

- **Testes de Modelo (User.test.js)**: Valida o schema do modelo de usuário Mongoose
- **Testes de API (api.test.js)**: Testa as rotas da API REST

## Frontend (Projeto)

### Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- TypeScript

### Instalação

```bash
cd projeto
npm install
```

### Executar

```bash
npm start
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

ISC
