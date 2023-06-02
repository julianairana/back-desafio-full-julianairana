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

- [Clients](#1-clients)
    - [POST - /clients](#11-criação-de-clientes)
    - [GET - /clients](#12-listando-clientes)
	- [GET - /clients/:client_id](#13-listar-client-por-id)
	- [PATCH - /clients/:client_id](#14-atualizar-client-por-id)
	- [DELETE - /clients/:client_id](#15-deletar-client-por-id)
- [Login](#2-login)
    - [POST - /login](#21-login-de-clientes)
- [Contacts](#3-contacts)
    - [POST - /contacts](#31-criação-de-contatos)
    - [GET - /contacts](#32-listando-contatos)
	- [GET - /contacts/:contact_id](#33-listar-contato-por-id)
	- [PATCH - /contacts/:contact_id](#34-atualizar-contato-por-id)
	- [DELETE - /contacts/:contact_id](#35-deletar-contato-por-id)

---

## 1. **Clients**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Client é definido como:

| Campo       | Tipo   | Descrição                                       |
| ----------- |--------|-------------------------------------------------|
| id          | string | Identificador único do cliente.                 |
| name        | string | O nome do do cliente.                           |
| email       | string | O e-mail do do cliente.                         |
| password    | string | A senha de acesso do do cliente.                |
| phone       | string | O número do do cliente.                         |
| image       | string | A imagem do do cliente.                         |
| dateRegister| date   | A data de registro do do cliente.               |
| gender      | enum | O gênero do do cliente.                           |

### Endpoints

| Método   | Rota         | Descrição                               |
|----------|------------  |-----------------------------------------|
| POST     | /clients     | Criação de um cliente.                  |
| GET      | /clients     | Lista todos os clientes                 |
| GET      | /clients/:client_id| Lista um cliente usando seu ID como parâmetro |
| PATCH      | /clients/:client_id| Atualiza um cliente usando seu ID como parâmetro |
| DELETE      | /clients/:client_id| Deleta um cliente usando seu ID como parâmetro |

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

### `/ clients/:client_id`

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

### `/ clients/:client_id`

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

### `/ clients/:client_id`

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

## 2. **Login**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Login é definido como:

| Campo       | Tipo   | Descrição                                       |
| ----------- |--------|-------------------------------------------------|
| email       | string | O e-mail do do cliente.                         |
| password    | string | A senha de acesso do do cliente.                |

### Endpoints

| Método   | Rota         | Descrição                               |
|----------|------------  |-----------------------------------------|
| POST     | /login     | Login de um cliente.                  |

---

### 2.1. **Login de Cliente**

[ Voltar para os Endpoints ](#5-endpoints)

### `/login`

### Exemplo de Request:
```
POST /login
Host: http://localhost:3000
Authorization: Token do cliente
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "joao@mail.com",
	"password": "Testando123@"
}
```

### Schema de Validação com Yup:
```javascript
    email: z.string().email().max(45),
    password: z.string().max(120)
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFpcmFuYUBtYWlsLmNvbSIsImlhdCI6MTY4NTQ
	NTg1OSwiZXhwIjoxNjg1NTQyMjU5LCJzdWIiOiI2In0.oLOP71sSGj_bgJsHxQVBUPWT41UkWLWUkvzWZY3CwbE"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 Unauthorized   | Invalid credentials |

---



## 3. **Contatos**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Contact é definido como:

| Campo       | Tipo   | Descrição                                       |
| ----------- |--------|-------------------------------------------------|
| id          | string | Identificador único do contato.                 |
| fullName    | string | O nome do do contato.                           |
| email       | string | O e-mail do do contato.                         |
| phone       | string | O número do do contato.                         |
| dateRegister| date   | A data de registro do do contato.               |
| gender      | enum   | O gênero do do contato.                         |

### Endpoints

| Método   | Rota         | Descrição                               |
|----------|------------  |-----------------------------------------|
| POST     | /contacts     | Criação de um contato.                  |
| GET      | /contacts     | Lista todos os contatos                 |
| GET      | /contacts/:contact_id| Lista um contato usando seu ID como parâmetro |
| PATCH      | /contacts/:contact_id| Atualiza um contato usando seu ID como parâmetro |
| DELETE      | /contacts/:contact_id| Deleta um contato usando seu ID como parâmetro |

---

### 3.1. **Criação de Contato**

[ Voltar para os Endpoints ](#5-endpoints)

### `/contacts`

### Exemplo de Request:
```
POST /contacts
Host: http://localhost:3000
Authorization: Token do cliente
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"fullName": "joao",
	"email": "joao@mail.com",
	"phone": "11966545453",
	"gender": "male"
}
```

### Schema de Validação com Yup:
```javascript
 fullName: z.string().max(45),

    email: z.string().email().max(45).nullish(),

    phone: z.string().max(45),

    gender: z.nativeEnum(GenderContact)
```
OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"fullName": "joao",
	"email": "joao@mail.com",
	"phone": "11665d45453",
	"gender": "male",
	"id": 5,
	"dateRegister": "2023-05-26T21:03:50.709Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | You don't have permissions. |

---

### 3.2. **Listando Contatos**

[ Voltar aos Endpoints ](#5-endpoints)

### `/contacts`

### Exemplo de Request:
```
GET /contacts
Host: http://localhost:3000
Authorization: Token do cliente
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
	"fullName": "joao",
	"email": "joao@mail.com",
	"phone": "11665d45453",
	"gender": "male",
	"id": 5,
	"dateRegister": "2023-05-26T21:03:50.709Z"
}
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 3.3. **Listar Contato por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/ contacts/:contact_id`

### Exemplo de Request:
```
GET /contacts/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://localhost:3000
Authorization: Token do cliente
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| contact_id     | string      | Identificador único do contato (Contact) |

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
	"fullName": "Maria",
	"email": "maria@mail.com",
	"phone": "119748393049",
	"gender": "female",
	"id": 7,
	"dateRegister": "2023-05-29T14:46:30.412Z",
	"client": {
		"name": "José",
		"email": "jose@mail.com",
		"phone": "11485904965",
		"image": null,
		"gender": "male",
		"id": 6,
		"dateRegister": "2023-05-26T21:17:57.623Z"
	}
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Contact not found. |
| 401 Unauthorized   | You don`t have permissions. |


### 3.4. **Atualizar Contato por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/ contacts/:contact_id`

### Exemplo de Request:
```
PATCH /clients/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://localhost:3000
Authorization: Token do cliente
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| contact_id     | string      | Identificador único do contato (Contact) |

### Corpo da Requisição:
```json
{
	"fullName": "José"
}
```

### Exemplo de Response:
```
200 OK
```
```json
{
		"fullName": "José",
		"email": "jose@mail.com",
		"phone": "11485904965",
		"gender": "male",
		"id": 6,
		"dateRegister": "2023-05-26T21:17:57.623Z"
	},
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not Found   | Contact not found. |
| 401 Unauthorized   | You don`t have permissions. |

### 3.5. **Deletar Contato por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/ contacts/:contact_id`

### Exemplo de Request:
```
DELETE /contacts/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://localhost:3000
Authorization: Token do cliente
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| contactt_id     | string      | Identificador único do contato (Contato) |

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
| 404 Not Found   | Contact not found. |
| 401 Unauthorized   | You don`t have permissions. |



