# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/)

A URL base da aplicação:
http://localhost:3000

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](file:///C:/Users/Usuario/Downloads/people_contact.drawio.pdf)

---

## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---
## 4. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Autenticação realizada pelo token do Cliente.

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Clients](#1-users)
    - [POST - /clients](#11-criação-de-clientes)
    - [GET - /clients](#12-listando-clientes)
	- [GET - /clients/:client_id](#13-listar-client-por-id)
	- [PATCH - /clients/:client_id](#14-atualizar-client-por-id)
	- [DELETE - /clients/:client_id](#15-deletar-client-por-id)
- [Contacts](#2-contacts)
    - [POST - /contacts](#11-criação-de-contatos)
    - [GET - /contacts](#12-listando-contatos)
	- [GET - /contacts/:contact_id](#13-listar-contato-por-id)
	- [PATCH - /contacts/:contact_id](#14-atualizar-contato-por-id)
	- [DELETE - /contacts/:contact_id](#15-deletar-contato-por-id)

---

## 1. **Clients**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo       | Tipo   | Descrição                                       |
| ----------- |--------|-------------------------------------------------|
| id          | string | Identificador único do usuário                  |
| name        | string | O nome do usuário.                              |
| email       | string | O e-mail do usuário.                            |
| password    | string | A senha de acesso do usuário                    |
| phone       | string | O número do usuário.                            |
| image       | string | A imagem do usuário.                            |
| dateRegister| date   | A data de registro do usuário.                  |
| gender      | string | O gênero do usuário.                            |

### Endpoints

| Método   | Rota         | Descrição                               |
|----------|------------  |-----------------------------------------|
| POST     | /clients     | Criação de um cliente.                  |
| GET      | /clients     | Lista todos os clientes                 |
| GET      | /clients/:clients_id| Lista um cliente usando seu ID como parâmetro 

---

### 1.1. **Criação de Cliente**

[ Voltar para os Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
```
POST /clients
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "joao",
	"email": "joao@mail.com",
	"password": "Testando123@",
	"phone": "11966545453",
	"gender": "male"
}
```

### Schema de Validação com Yup:
```javascript
name: z.string().max(45),

    email: z.string().email().max(45),

    password: z.string().max(120),

    phone: z.string().max(45),

    image: z.string().nullish(),

    gender: z.nativeEnum(GenderClient),
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"name": "joao",
	"email": "joao@mail.com",
	"phone": "11665d45453",
	"image": null,
	"gender": "male",
	"id": 5,
	"dateRegister": "2023-05-26T21:03:50.709Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already registered. |

---

### 1.2. **Listando Clientes**

[ Voltar aos Endpoints ](#5-endpoints)

### `/clients`

### Exemplo de Request:
```
GET /clients
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
{
	"name": "joao",
	"email": "joao@mail.com",
	"phone": "11665d45453",
	"image": null,
	"gender": "male",
	"id": 5,
	"dateRegister": "2023-05-26T21:03:50.709Z"
}
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Cliente por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/ clients/:clients_id`

### Exemplo de Request:
```
GET /clients/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| client_id     | string      | Identificador único do cliente (Client) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
{
	"client": {
		"name": "Maria",
		"email": "maria@mail.com",
		"phone": "11485904965",
		"image": null,
		"gender": "female",
		"id": 6,
		"dateRegister": "2023-05-26T21:17:57.623Z"
	},
	"contacts": [
		{
			"id": 11,
			"fullName": "José",
			"email": "jose@mail.com",
			"phone": "45635634734",
			"dateRegister": "2023-05-29T20:49:13.415Z",
			"gender": "male"
		},
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Client not found. |
| 401 Unauthorized   | You don`t have permissions. |

### 1.4. **Atualizar Cliente por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/ clients/:clients_id`

### Exemplo de Request:
```
GET /clients/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| client_id     | string      | Identificador único do cliente (Client) |

### Corpo da Requisição:
```json
{
	"name": "José"
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
		"name": "José",
		"email": "jose@mail.com",
		"phone": "11485904965",
		"image": null,
		"gender": "male",
		"id": 6,
		"dateRegister": "2023-05-26T21:17:57.623Z"
	},
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Client not found. |
| 401 Unauthorized   | You don`t have permissions. |

### 1.4. **Atualizar Cliente por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/ clients/:clients_id`

### Exemplo de Request:
```
PATCH /clients/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| client_id     | string      | Identificador único do cliente (Client) |

### Corpo da Requisição:
```json
{
	"name": "José"
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
		"name": "José",
		"email": "jose@mail.com",
		"phone": "11485904965",
		"image": null,
		"gender": "male",
		"id": 6,
		"dateRegister": "2023-05-26T21:17:57.623Z"
	},
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Client not found. |
| 401 Unauthorized   | You don`t have permissions. |

### 1.5. **Deletar Cliente por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/ clients/:clients_id`

### Exemplo de Request:
```
DELETE /clients/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://localhost:3000
Authorization: Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| client_id     | string      | Identificador único do cliente (Client) |

### Corpo da Requisição:
```json
vazio
```

### Exemplo de Response:
```
204 NO CONTENT
```
```json
vazio
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Client not found. |
| 401 Unauthorized   | You don`t have permissions. |


