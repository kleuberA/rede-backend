# Back end Rede Social

Este é um projeto de backend para uma rede social, desenvolvido como parte de um estudo para aprender e praticar os conceitos de desenvolvimento de software web. O objetivo deste projeto é criar uma aplicação que abrange a funcionalidade básica de uma rede social, incluindo cadastro de usuários, postagem de conteúdo, curtidas, comentários e conexões entre usuários.

## Stack utilizada

-   **Node.js**: A plataforma utilizada para o desenvolvimento do backend.

-   **Express.js**: Framework para criar APIs web robustas.

-   **PostgreSQL**: Banco de dados relacional para armazenar informações dos usuários, posts e relacionamentos.

-   **Prisma**: ORM (Object-Relational Mapping) para interagir com o PostgreSQL.

-   **Docker**: Para a criação de containers e gerenciamento de dependências.

-   **JWT (JSON Web Tokens)**: Para autenticação de usuários.
    Bcrypt: Para criptografar senhas.

## Funcionalidades

O projeto visa abranger as seguintes funcionalidades:

1. Cadastro e Autenticação de Usuários:

-   Registro de novos usuários.
-   Login com autenticação JWT.

## Deploy

Para fazer o deploy desse projeto rode

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```bash
DATABASE_URL=postgresql://seu-usuario:senha@localhost:5432/seu-banco-de-dados
JWT_SECRET=your-jwt-secret
```

4. Configure o Docker para o Prisma:

No arquivo docker-compose.yml, configure o serviço do banco de dados PostgreSQL de acordo com as informações do seu banco de dados.

5. Inicie os containers do Docker:

```bash
docker-compose up -d
```

6. Aplicar migrações do Prisma:

```bash
npx prisma migrate dev
```

7. Inicie o servidor:

```bash
npm run dev
```
