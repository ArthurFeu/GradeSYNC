# GradeSync: Sistema de Matrícula de Alunos

Este projeto é uma aplicação web para o cadastro e gerenciamento de matrículas de alunos em turmas online. A aplicação permite a criação, edição, listagem e exclusão de registros de alunos, com o objetivo de facilitar o gerenciamento de matrículas em instituições de ensino.

O backend foi desenvolvido para suportar todas as funcionalidades necessárias, incluindo rotas para gerenciamento de alunos (/students), cursos (/courses), matrículas (/enrollments) e escolas (/schools). No entanto, o frontend foi implementado apenas para a visualização e gestão de alunos. As rotas para cursos, matrículas e escolas ainda não possuem uma interface de usuário correspondente no frontend, o que significa que, no momento, os recursos dessas funcionalidades estão acessíveis apenas através da API.

## Tecnologias Utilizadas

### Front-end:
- **Framework JS**: [Vue.js](https://vuejs.org/)
- **Framework de UI**: [Vuetify](https://vuetifyjs.com/)

### Back-end:
- **API**: Node.js com Express
- **Banco de Dados**: MySQL
- **Linguagem**: JavaScript

## Funcionalidades

- **Cadastro de Alunos**: Permite o cadastro de novos alunos com informações como nome, email, RA e CPF.
- **Listagem de Alunos**: Exibe uma lista dos alunos cadastrados com opções de editar e excluir cada aluno.
- **Edição de Alunos**: Permite a atualização das informações dos alunos cadastrados.
- **Exclusão de Alunos**: Remove o registro de um aluno do banco de dados.
- **Validações**: Garante que todos os campos obrigatórios sejam preenchidos corretamente.


## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Crie e configure o banco de dados usando SQL conforme o arquivo de schema fornecido.

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Altere as configurações no arquivo `client.js`.

5. Para rodar a aplicação, execute:

    ```bash
    npm run start
    ```

