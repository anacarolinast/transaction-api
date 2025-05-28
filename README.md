
# Transaction API

API construída com NestJS com o intuito de gerenciar transações financeiras. Ela permite criar, listar, remover transações e calcular estatísticas (quantidade, soma, média, mínimo e máximo) das transações realizadas nos últimos 60 segundos (tempo padrão, que pode ser alterado)

---

## Funcionalidades

**Endpoints:**

- `POST /transacao`: Cria uma nova transação.
- `GET /transacao`: Lista todas as transações.
- `DELETE /transacao`: Remove todas as transações.
- `GET /estatistica`: Retorna as estatísticas das transações nos últimos 60 segundos.  
  - Você pode passar um query param `intervaloMs` para definir um intervalo alternativo em milissegundos (já que por padrão a requisição traz as transações dos últimos 60 segundos).
- `GET /health`: Healthcheck para verificar se a API está saudável.
- Uma documentação Swagger está disponível em `/api-docs`.

---

## Rodando Localmente

1️⃣ Clone o repositório:

```bash
git clone https://github.com/anacarolinastn/transaction-api
cd transaction-api
```

2️⃣ Instale as dependências:

```bash
npm install
```

3️⃣ Construa o projeto:

```bash
npm run build
```

4️⃣ Inicie a aplicação:

```bash
npm run start
```

A API estará disponível em: `http://localhost:3000`

---

## Rodando com Docker

### Construir e rodar localmente

1️⃣ Construa a imagem Docker:

```bash
docker build -t {usuario}/{imagem}:tag .
```

2️⃣ Rode o container:

```bash
docker run -p 3000:3000 {usuario}/{imagem}:tag
```

---

### Usar a imagem do Docker Hub

Você também pode usar a imagem oficial publicada no Docker Hub:

```bash
docker pull anacarolstn/transaction-api:latest
docker run -p 3000:3000 anacarolstn/transaction-api:latest
```

A API estará disponível em: `http://localhost:3000`

---

## Documentação da API

Acesse a documentação interativa do Swagger em:

```bash
http://localhost:3000/api-docs
```
