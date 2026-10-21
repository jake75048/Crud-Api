API CRUD de Produtos - Node.js e SQL Server

API  desenvolvida em Node.js com Express para o gerenciamento de produtos de uma loja, utilizando SQL Server.

 Tecnologias Utilizadas
- Node.js
- Express
- mssql com driver msnodesqlv8 (utilizando Autenticação do Windows para ambiente local)

---

 Estrutura do Projeto
- `app.js`: Configuração do servidor Express, rotas do CRUD e validações.
- `config/db.js`: Configuração da conexão com o banco de dados SQL Server.
- `script.sql`: Script SQL para criação do banco de dados e da tabela `Produtos`.

---

 Como Executar
 

1. Pré-requisitos
- Node.js instalado na máquina.
- SQL Server (ou SQL Server Express) rodando localmente.


 2. Configuração do Banco de Dados
Abra o seu SQL Server Management Studio (SSMS), crie um novo arquivo de consulta, cole e execute os comandos do arquivo `script.sql` para criar a base de dados `LojaDB` e a tabela `Produtos`.

 3. Instalação das Dependências
Abra o terminal na pasta raiz do projeto e execute o comando para baixar todas as dependências listadas no `package.json`:

npm install