# Sistema CRUD de Contas Contábeis

Este projeto tem como objetivo criar um sistema CRUD simples e funcional para cadastro de contas contábeis, utilizando Java Spring Boot no backend e React no frontend, com PostgreSQL como banco de dados. A aplicação permite criar, visualizar, editar e deletar contas contábeis com os seguintes dados:

- ID único
- Nome da conta
- Valor associado
- Natureza (débito ou crédito)

## Tecnologias Utilizadas

### Backend
- Java 21
- Spring Boot
- JPA/Hibernate
- PostgreSQL

### Frontend
- React
- Ant Design (UI)
- Axios (requisições HTTP)

### Infraestrutura
- Docker
- Docker Compose

## Como Rodar o Projeto

### Pré-requisitos
- Docker
- Docker Compose

### Passos
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/contas_crud_projeto.git
cd contas_crud_projeto
```

2. Inicie os containers:
```bash
docker-compose up --build
```

3. Acesse a aplicação:
- Frontend: `http://localhost:4173`
- Backend (Swagger ou API): `http://localhost:8080/swagger-ui.html`

### Endpoints API
- `GET /contas` - Listar contas
- `POST /contas` - Criar nova conta
- `PUT /contas/{id}` - Atualizar conta
- `DELETE /contas/{id}` - Deletar conta

## Estrutura de Diretórios

```
/backend
  └── src/main/java/com/synchro/contas
  └── ...
/frontend
  └── src/
  └── public/
  └── ...
/docker-compose.yml
/README.md
```

## Funcionalidades Adicionais (Opcional)
- Geração de relatório `.xlsx` com a listagem de contas
- Filtros por natureza ou valor