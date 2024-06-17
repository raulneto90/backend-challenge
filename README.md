# Desafio Técnico para Vaga Backend - Node.js

## Funcionalidades

### Registro de usuário

- **URL**: `/auth/register`
- **Método**: `POST`
- **Corpo da Requisição**:
  ```json
  {
    "username": "nome_de_usuario",
    "password": "senha_segura"
  }
  ```
- **Resposta**:
  ```json
  {
    "message": "Usuário registrado com sucesso"
  }
  ```

### Login de usuário

- **URL**: `/auth/login`
- **Método**: `POST`
- **Corpo da Requisição**:
  ```json
  {
    "username": "nome_de_usuario",
    "password": "senha_segura"
  }
  ```
- **Resposta**:
  ```json
  {
    "token": "jwt_token"
  }
  ```

### Criar uma nova tarefa

- **URL**: `/tasks`
- **Método**: `POST`
- **Cabeçalho**: `Authorization: Bearer jwt_token`
- **Corpo da Requisição**:
  ```json
  {
    "title": "Título da tarefa",
    "description": "Descrição da tarefa",
    "status": "pendente"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": "uuid",
    "title": "Título da tarefa",
    "description": "Descrição da tarefa",
    "status": "pendente",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Obter todas as tarefas com paginação

- **URL**: `/tasks`
- **Método**: `GET`
- **Cabeçalho**: `Authorization: Bearer jwt_token`
- **Parâmetros de Consulta**:
  - `page` (opcional, número inteiro, default: 1) - Número da página
  - `limit` (opcional, número inteiro, default: 10) - Número de tarefas por página
- **Resposta**:
  ```json
  {
    "tasks": [
      {
        "id": "uuid",
        "title": "Título da tarefa",
        "description": "Descrição da tarefa",
        "status": "pendente",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 1,
      "totalTasks": 1
    }
  }
  ```

### Obter uma tarefa pelo ID

- **URL**: `/tasks/:id`
- **Método**: `GET`
- **Cabeçalho**: `Authorization: Bearer jwt_token`
- **Resposta**:
  ```json
  {
    "id": "uuid",
    "title": "Título da tarefa",
    "description": "Descrição da tarefa",
    "status": "pendente",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Atualizar uma tarefa

- **URL**: `/tasks/:id`
- **Método**: `PUT`
- **Cabeçalho**: `Authorization: Bearer jwt_token`
- **Corpo da Requisição**:
  ```json
  {
    "title": "Novo título da tarefa",
    "description": "Nova descrição da tarefa",
    "status": "em progresso"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": "uuid",
    "title": "Novo título da tarefa",
    "description": "Nova descrição da tarefa",
    "status": "em progresso",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

### Deletar uma tarefa

- **URL**: `/tasks/:id`
- **Método**: `DELETE`
- **Cabeçalho**: `Authorization: Bearer jwt_token`
- **Resposta**:
  ```json
  {
    "message": "Tarefa deletada com sucesso"
  }
  ```

## Como baixar e utilizar o projeto

Em seu terminal, realize o clone do projeto:

```bash
git clone git@github.com:raulneto90/backend-challenge.git
```

Instale as dependencias

```bash
cd backend-challenge
npm install
```

Informe as seguintes variáveis ambiente:

```
NODE_ENV=
DATABASE_URL=
PORT=
JWT_SECRET=
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Execute o projeto:

```bash
npm run dev
```
