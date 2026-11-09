# Around The U.S. — Full Stack

Aplicação web completa que combina um front-end em React com um back-end em Node.js, permitindo o cadastro, a autenticação e o gerenciamento de cartões de lugares de forma persistente e segura.

> ⚠️ **ATENÇÃO — LINK DE DEPLOY:** substitua o texto abaixo pelo endereço real da aplicação publicada.

🔗 **Deploy:** [COLOQUE AQUI O LINK DE DEPLOY](https://seu-link-de-deploy.com)

> ⚠️ **ATENÇÃO — PRINT DO PROJETO:** adicione uma imagem na pasta do repositório (ex.: `docs/screenshot.png`) e ajuste o caminho abaixo.

![Print do projeto Around The U.S.](COLOQUE-AQUI-O-CAMINHO-OU-URL-DA-IMAGEM)

> ⚠️ **ATENÇÃO — VÍDEO NO YOUTUBE:** substitua o link abaixo pela URL do vídeo que explica o projeto.

🎥 **Vídeo explicativo:** [COLOQUE AQUI A URL DO VÍDEO NO YOUTUBE](https://www.youtube.com/watch?v=SEU_VIDEO_ID)

---

## Problema

O front-end do Around precisava de um back-end real para gerenciar usuários e cartões, já que os dados não podiam mais ficar fixos no código nem se perder ao recarregar a página. Era necessário persistir as informações, validá-las e responder aos erros de forma clara. Além disso, era preciso implementar um sistema de autenticação para que apenas usuários logados pudessem acessar e gerenciar seus próprios dados.

## Solução

Desenvolvemos uma aplicação full stack que integra um front-end em React a uma API RESTful construída com Node.js, Express e MongoDB. A solução permite:

- **Cadastro e autenticação de usuários** com e-mail e senha, utilizando JWT para sessões seguras.
- **Gerenciamento de cartões:** criação, listagem, exclusão e curtidas de cartões de lugares.
- **Edição de perfil e avatar:** atualização dos dados do usuário logado.
- **Proteção de rotas:** todas as rotas da API (exceto login e registro) são protegidas por um middleware de autorização.
- **Tratamento centralizado de erros** e **validação de dados** com Celebrate/Joi.
- **Persistência de dados** em banco MongoDB, com modelos e validações definidos via Mongoose.

## Arquitetura

O projeto é dividido em duas pastas principais, cada uma com sua responsabilidade:

```text
├── backend/                  # API RESTful (Node.js + Express + MongoDB)
│   ├── controllers/          # Lógica de cada operação
│   ├── errors/               # Classes de erro personalizadas
│   ├── middlewares/          # Autorização, validação e logs
│   ├── models/               # Schemas e validações do Mongoose
│   ├── routes/               # Definição das rotas
│   └── app.js                # Configuração do servidor
│
└── frontend/                 # Interface do usuário (React + Vite)
    ├── src/
    │   ├── components/       # Componentes React
    │   ├── contexts/         # Context API para estado global
    │   ├── utils/            # Serviços de autenticação e API
    │   └── ...
    └── ...
```

O fluxo de uma requisição no back-end segue a ordem: **rota → middleware → controlador → modelo → MongoDB**.

## Decisões Técnicas

| Tecnologia                 | Por quê                                                  |
| -------------------------- | -------------------------------------------------------- |
| **Node.js + Express**      | Criação simples e rápida da API e das rotas              |
| **MongoDB + Mongoose**     | Banco NoSQL flexível, com schemas e validação de dados   |
| **React + Vite**           | Desenvolvimento rápido e componentização da interface    |
| **JWT (JSON Web Token)**   | Autenticação stateless e segura entre cliente e servidor |
| **Celebrate / Joi**        | Validação robusta dos dados de entrada na API            |
| **Winston**                | Registro de requisições e erros para monitoramento       |
| **ESLint (`airbnb-base`)** | Padronização e qualidade do código                       |

## Como Executar

**Pré-requisitos:** Node.js 20.19+ ou 22.12+, npm e MongoDB rodando localmente (ou uma string de conexão do MongoDB Atlas).

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/michael-ribeiro-fs/web_project_api_full.git
   cd web_project_api_full
   ```

2. **Configure e inicie o back-end:**

   ```bash
   cd backend
   npm install
   ```

   Crie um arquivo `.env` na pasta `backend` com as variáveis:

   ```env
   NODE_ENV=production
   JWT_SECRET=sua_chave_secreta_aqui
   ```

   Em seguida, inicie o servidor:

   ```bash
   npm run dev
   ```

   O servidor estará disponível em `http://localhost:3000`.

3. **Configure e inicie o front-end (em outro terminal):**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:5173` (ou na porta indicada pelo Vite).

## Endpoints

### Autenticação

| Método | Endpoint    | Descrição                                          |
| ------ | ----------- | -------------------------------------------------- |
| `POST` | `/signup`   | Cadastro de usuário                                |
| `POST` | `/signin`   | Autenticação do usuário (retorna JWT)              |
| `GET`  | `/users/me` | Validação do token e recuperação do usuário logado |

### Usuários

| Método  | Endpoint           | Descrição                           |
| ------- | ------------------ | ----------------------------------- |
| `GET`   | `/users`           | Lista todos os usuários             |
| `GET`   | `/users/:userId`   | Retorna um usuário pelo `_id`       |
| `PATCH` | `/users/me`        | Atualiza o perfil do usuário logado |
| `PATCH` | `/users/me/avatar` | Atualiza o avatar do usuário logado |

### Cartões

| Método   | Endpoint               | Descrição                        |
| -------- | ---------------------- | -------------------------------- |
| `GET`    | `/cards`               | Lista todos os cartões           |
| `POST`   | `/cards`               | Cria um novo cartão              |
| `DELETE` | `/cards/:cardId`       | Exclui um cartão (apenas o dono) |
| `PUT`    | `/cards/:cardId/likes` | Curte um cartão                  |
| `DELETE` | `/cards/:cardId/likes` | Remove a curtida de um cartão    |

### Códigos de erro comuns

| Status | Significado                                                   |
| ------ | ------------------------------------------------------------- |
| `400`  | Dados inválidos ou `_id` mal formatado                        |
| `401`  | Token ausente ou inválido                                     |
| `403`  | Tentativa de acessar ou modificar um recurso de outro usuário |
| `404`  | Usuário, cartão ou rota não encontrado                        |
| `409`  | E-mail já cadastrado                                          |
| `500`  | Erro interno do servidor                                      |

## Próximos Passos

- Implementar testes automatizados (unitários e de integração) no back-end e no front-end.
- Aprimorar a acessibilidade, incluindo navegação por teclado e atributos ARIA.
- Melhorar o gerenciamento e a segurança das sessões (ex.: refresh tokens).
- Expandir a cobertura de tratamento de erros nas requisições à API.

## Licença

Projeto educacional desenvolvido para o curso da [TripleTen](https://tripleten.com/).

Autor: [Michael Ribeiro](https://github.com/michael-ribeiro-fs)
