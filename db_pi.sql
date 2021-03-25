-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sala_arco_iris
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `adm_usuario`
--

DROP TABLE IF EXISTS `adm_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adm_usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT COMMENT 'ID do usuário/adm',
  `emailUsuario` varchar(45) NOT NULL COMMENT 'E-mail usuário/adm',
  `senhaUsuario` varchar(95) NOT NULL COMMENT 'Senha usuário/adm',
  `status` int NOT NULL,
  `permissao` int NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adm_usuario`
--

LOCK TABLES `adm_usuario` WRITE;
/*!40000 ALTER TABLE `adm_usuario` DISABLE KEYS */;
INSERT INTO `adm_usuario` VALUES (1,'yuri@gmail.com','296506902c693b458707ad6f7e24a544',1,1),(12,'silvio@santos.com.br','2aa8f0bef5ca2997f992cce61f0ed85a1820cdbb636f2cfcfc0fe865d39be8fa',1,1);
/*!40000 ALTER TABLE `adm_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aluno` (
  `idAluno` int NOT NULL AUTO_INCREMENT COMMENT 'ID do aluno (automático)',
  `cpfAluno` varchar(15) NOT NULL,
  `nomeAluno` varchar(45) NOT NULL COMMENT 'Nome completo do aluno',
  `dataNasc` date NOT NULL COMMENT 'Data nascimento do aluno',
  `email` varchar(45) NOT NULL COMMENT 'E-mail do aluno',
  `idResponsavel` int NOT NULL COMMENT 'Chave estrangeira com id do responsável',
  `senha` int NOT NULL,
  `statusResponsavel` varchar(7) NOT NULL COMMENT '2 = Aluno possui responsável ativo\\n 3 = Aluno não possui responsável ativo',
  PRIMARY KEY (`idAluno`),
  UNIQUE KEY `cpfAluno_UNIQUE` (`cpfAluno`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_aluno_responsavel1_idx` (`idResponsavel`)
) ENGINE=InnoDB AUTO_INCREMENT=368 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` VALUES (362,'664.179.500-42','Gilderas Dfasdfads','1996-07-03','teste@hotmail.com',0,1234,'inativo');
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimo_livro`
--

DROP TABLE IF EXISTS `emprestimo_livro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimo_livro` (
  `idEmprestimo` int NOT NULL COMMENT 'ID do empréstimo do livro',
  `dataEmprestimo` date NOT NULL COMMENT 'Data empréstimo do livro',
  `dataDevolucao` date NOT NULL COMMENT 'Data devolução do livro',
  `status` int NOT NULL COMMENT 'Status atual do livro',
  `alunoIdAluno` int NOT NULL COMMENT 'Chave estrangeira do id do aluno',
  `valorMulta` float DEFAULT NULL,
  PRIMARY KEY (`idEmprestimo`),
  KEY `fk_emprestimo_livro_aluno1_idx` (`alunoIdAluno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimo_livro`
--

LOCK TABLES `emprestimo_livro` WRITE;
/*!40000 ALTER TABLE `emprestimo_livro` DISABLE KEYS */;
/*!40000 ALTER TABLE `emprestimo_livro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livro`
--

DROP TABLE IF EXISTS `livro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livro` (
  `idLivro` int NOT NULL AUTO_INCREMENT COMMENT 'ID do livro',
  `nomeLivro` varchar(45) NOT NULL COMMENT 'Nome completo do livro',
  `codigoLivro` varchar(20) NOT NULL COMMENT 'Código do livro',
  `publicacao` date NOT NULL COMMENT 'Ano do livro',
  `qtdEstoque` int NOT NULL COMMENT 'QTD estoque',
  `statusLivro` int NOT NULL COMMENT 'Status do livro',
  PRIMARY KEY (`idLivro`),
  UNIQUE KEY `codigoLivro_UNIQUE` (`codigoLivro`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livro`
--

LOCK TABLES `livro` WRITE;
/*!40000 ALTER TABLE `livro` DISABLE KEYS */;
INSERT INTO `livro` VALUES (15,'Livro Tec','MX-12345','2021-03-04',10,2),(19,'Livro Tec','MX-123asfas','1996-07-03',10,2);
/*!40000 ALTER TABLE `livro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livro_has_emprestimo`
--

DROP TABLE IF EXISTS `livro_has_emprestimo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livro_has_emprestimo` (
  `livroIdLivro` int NOT NULL COMMENT 'ID do livro emprestado',
  `emprestimoLivroIdEmprestimo` int NOT NULL COMMENT 'ID do empréstimo',
  KEY `fk_livro_has_emprestimo_livro_emprestimo_livro1_idx` (`emprestimoLivroIdEmprestimo`),
  KEY `fk_livro_has_emprestimo_livro_livro1_idx` (`livroIdLivro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livro_has_emprestimo`
--

LOCK TABLES `livro_has_emprestimo` WRITE;
/*!40000 ALTER TABLE `livro_has_emprestimo` DISABLE KEYS */;
/*!40000 ALTER TABLE `livro_has_emprestimo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsavel`
--

DROP TABLE IF EXISTS `responsavel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsavel` (
  `idResponsavel` int NOT NULL COMMENT 'ID do responsável',
  `nomeResp` varchar(45) NOT NULL COMMENT 'Nome completo do responsável',
  `dataNasc` date NOT NULL COMMENT 'Data nascimento do responsável',
  PRIMARY KEY (`idResponsavel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsavel`
--

LOCK TABLES `responsavel` WRITE;
/*!40000 ALTER TABLE `responsavel` DISABLE KEYS */;
INSERT INTO `responsavel` VALUES (725765,'Dfasdf Asdfasdf','1996-07-04');
/*!40000 ALTER TABLE `responsavel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sala_arco_iris'
--

--
-- Dumping routines for database 'sala_arco_iris'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-25 12:16:23
