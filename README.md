# Sistema CRUD de gerenciamento de clientes

Aluno:   Lucca Fabricio Magalhães<br />
Turma:   5B

## Funcionalidades

Conforme os requisitos do professor, foi criado um sistema CRUD (Create, Read, Update, Delete) com as seguintes funcionalidades principais:

- Exibição de todos os clientes cadastrados com opções para detalhar, editar e excluir.
- Formulário para inclusão de novos clientes.
- Atualização de dados dos clientes existentes.
- Remoção de um cliente do banco de dados, com confirmação.

Esse sistema é baseado no gerenciamento de **clientes**. Portanto, as funcionalidades acima são todas operações feitas sobre clientes. 

## Tecnologias Utilizadas

- **Frontend:**  
  - React  
  - React Router Dom  
  - Axios

- **Backend:**  
  - Node.js  
  - Express  
  - CORS  
  - MySQL

- **Banco de Dados:**  
  - MySQL

## Estrutura do Projeto

A estrutura de pastas do projeto está organizada da seguinte forma:

```
├── backend
│   ├── index.js
│   └── package.json
├── frontend
│   ├── public
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── favicon.ico
│   ├── src
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── App.css
│   │   └── components
│   │       ├── CustomerList.jsx
│   │       ├── CustomerForm.jsx
│   │       └── CustomerDetail.jsx
│   └── package.json
└── banco.sql
```

## Instalação e Execução

### Pré-requisitos

- **Node.js e npm:** Certifique-se de que estão instalados.
- **MySQL:** Deve estar instalado e rodando.
- **Git:** Para clonar o repositório, se necessário.

### 1. Configuração o Banco de Dados

1. Abra seu gerenciador de banco de dados (ex.: MySQL Workbench ou phpMyAdmin).
2. Importe o arquivo `crud_system.sql` com o seguinte conteúdo:

   ```sql
   -- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
    --
    -- Host: 127.0.0.1    Database: crud_system
    -- ------------------------------------------------------
    -- Server version	8.3.0
    
    /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
    /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
    /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
    /*!50503 SET NAMES utf8 */;
    /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
    /*!40103 SET TIME_ZONE='+00:00' */;
    /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
    /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
    /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
    /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
    
    --
    -- Table structure for table `clientes`
    --
    
    DROP TABLE IF EXISTS `clientes`;
    /*!40101 SET @saved_cs_client     = @@character_set_client */;
    /*!50503 SET character_set_client = utf8mb4 */;
    CREATE TABLE `clientes` (
      `id` int NOT NULL AUTO_INCREMENT,
      `nome` varchar(255) NOT NULL,
      `anoNascimento` int NOT NULL,
      `endereco` varchar(255) NOT NULL,
      `genero` varchar(50) NOT NULL,
      `cpf` varchar(11) NOT NULL,
      PRIMARY KEY (`id`),
      UNIQUE KEY `cpf` (`cpf`)
    ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    /*!40101 SET character_set_client = @saved_cs_client */;
    
    --
    -- Dumping data for table `clientes`
    --
    
    LOCK TABLES `clientes` WRITE;
    /*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
    INSERT INTO `clientes` VALUES (1,'João Silva',1985,'Rua A, 123','Masculino','12345678901'),(2,'Maria Souza',1990,'Avenida B, 456','Feminino','23456789012'),(3,'Pedro Costa',1975,'Travessa C, 789','Masculino','34567890123');
    /*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
    UNLOCK TABLES;
    /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
    
    /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
    /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
    /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
    /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
    /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
    /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
    /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
    
    -- Dump completed on 2025-04-10 14:15:24
   ```
3. Execute o código no ambiente e certifique-se que todas as tabelas são geradas corretamente.

### 2. Configurar o Backend

1. Abra um terminal e navegue até a pasta `backend`:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Abra o arquivo `index.js` e configure as credenciais de conexão com o MySQL (ex.: `seu_usuario` e `sua_senha`):

   ```js
   const DB_HOST       = 'seu_host';
   const DB_USER       = 'seu_usuario';
   const DB_PASS       = 'sua_senha'
   const DB_NAME       = 'nome_do_banco'
   });
   ```

4. Inicie o servidor backend:

   ```bash
   npm start
   ```

   O servidor ficará escutando na porta **3001**.  
   **Nota:** Ao acessar `http://localhost:3001/` diretamente no navegador, você verá a mensagem "Cannot GET /", pois o backend foi desenvolvido para servir uma API com endpoints específicos (como `/clientes`).

### 3. Configurar o Frontend

1. Em outro terminal, navegue até a pasta `frontend`:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie a aplicação React:

   ```bash
   npm start
   ```

   A aplicação iniciará na porta **3000**. Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000).
