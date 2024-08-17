# API DE BIBLIOTECA

***

## Sobre o projeto

### Resumo

Este projeto implementa uma API RESTful para gerenciar uma biblioteca usando Node.js, Express, e MongoDB. A API permite gerenciar autores, livros, e clientes, com funcionalidades CRUD completas. A autenticação de usuários é baseada em JWT, com controles de acesso que garantem que apenas administradores possam criar, atualizar, ou excluir registros de usuários e clientes. O projeto também inclui uma rota de instalação para configurar o banco de dados com registros iniciais e um administrador padrão. A documentação da API é gerada automaticamente usando Swagger.

### Instuções

Para inicializar o projeto primeiro é necessário instalar as dependências com o seguinte comando:

```
npm install
```

Após isso, deve-se criar um arquivo .env na raiz do projeto com o seguinte conteúdo:

```
MONGODB_URI=mongodb://localhost:27017/nome-do-bd
```

Com isso o sistema já está pronto para uso. Para iniciá-lo basta apenas usar o comando:

```
npm start
```

Assim o software estará rodando no localhost através da porta 5000. Para instalar o banco de dados com as inserções iniciais basta acessar a rota GET/install.

Para mais informações sobre as rotas do sistema, acessa a rota GET/docs ou rode o comando abaixo no terminal para ter acesso à documentação

```
npm run swagger-autogen
```
