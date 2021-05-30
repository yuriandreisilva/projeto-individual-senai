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
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `emailUsuario_UNIQUE` (`emailUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adm_usuario`
--

LOCK TABLES `adm_usuario` WRITE;
/*!40000 ALTER TABLE `adm_usuario` DISABLE KEYS */;
INSERT INTO `adm_usuario` VALUES (19,'silvio@santos.com.br','2aa8f0bef5ca2997f992cce61f0ed85a1820cdbb636f2cfcfc0fe865d39be8fa',1,0),(20,'yuri@gmail.com','2aa8f0bef5ca2997f992cce61f0ed85a1820cdbb636f2cfcfc0fe865d39be8fa',1,1);
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
  `senha` int NOT NULL,
  `statusResp` varchar(7) NOT NULL,
  `nomeResp` varchar(45) DEFAULT NULL COMMENT 'Chave estrangeira com id do responsável',
  `dataNascResp` date DEFAULT NULL,
  PRIMARY KEY (`idAluno`),
  UNIQUE KEY `cpfAluno_UNIQUE` (`cpfAluno`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_aluno_responsavel1_idx` (`nomeResp`)
) ENGINE=InnoDB AUTO_INCREMENT=409 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` VALUES (368,'100.260.559-88','Gilderas Dfasfasd','1996-07-03','teste@gmail.com',1234,'ativo','Dfasdfas Sadfasdf','1996-07-03'),(371,'255.503.440-41','Gilderas Afsdfsda','1996-07-03','teste@gmail.comm',1234,'inativo','null','0000-00-00'),(372,'101.260.559-88','Gilderas','1997-07-03','teste@hotmail.comm',1234,'ativo','Gilderas Pai','1977-07-03'),(374,'101.260.559-18','Gilderas','1997-07-03','teste@hotmail.conm',1234,'ativo','Gilderas Pai','1977-07-03'),(375,'101.260.559-11','Gilderas','1997-07-03','teste@hotmail.cos',1234,'ativo','Gilderas Pai','1977-07-03'),(376,'101.260.559-10','Gilderas','1997-07-03','teste@hotmail.co',1234,'ativo','Gilderas Pai','1977-07-03'),(377,'101.260.559-15','Gilderas','1997-07-03','teste@hotmail.c',1234,'ativo','Gilderas Pai','1977-07-03'),(379,'101.260.559-35','Gilderas','1997-07-03','teste@hotmail',1234,'ativo','Gilderas Pai','1977-07-03'),(380,'101.260.559-31','Gilderas','1997-07-03','teste@hotmail.dafsd',1234,'ativo','Gilderas Pai','1977-07-03'),(381,'101.260.559-37','Gilderas','1997-07-03','teste@hotmail.dafsdfa',1234,'ativo','Gilderas Pai','1977-07-03'),(382,'101.260.559-87','Gilderas','1997-07-03','teste@hotmail.asdfasw',1234,'ativo','Gilderas Pai','1977-07-03'),(383,'101.260.559-16','Gilderas','1997-07-03','teste@hotmail.asdfasd',1234,'ativo','Gilderas Pai','1977-07-03'),(384,'101.260.559-95','Gilderas','1997-07-03','teste@hotmail.fasdf',1234,'ativo','Gilderas Pai','1977-07-03'),(385,'101.260.559-85','Gilderas','1997-07-03','teste@hotmail.fasadfasd',1234,'ativo','Gilderas Pai','1977-07-03'),(387,'101.260.559-60','Gilderas','1997-07-03','teste@hotmail.dafsdf',1234,'ativo','Gilderas Pai','1977-07-03'),(388,'101.260.559-61','Gilderas','1997-07-03','teste@hotmail.dafsfds',1234,'ativo','Gilderas Pai','1977-07-03'),(389,'101.260.123-90','Gilderas','1997-07-03','teste@hotmail.dqwwqwe',1234,'ativo','Gilderas Pai','1977-07-03'),(390,'101.260.456-90','Gilderas','1997-07-03','teste@hotmail.ljlklk',1234,'ativo','Gilderas Pai','1977-07-03'),(391,'101.260.789-90','Gilderas','1997-07-03','teste@hotmail.dfasdfq',1234,'ativo','Gilderas Pai','1977-07-03'),(392,'101.123.789-90','Gilderas','1997-07-03','teste@hotmail.piopi',1234,'ativo','Gilderas Pai','1977-07-03'),(393,'101.456.789-90','Gilderas','1997-07-03','teste@hotmail.qweqweq',1234,'ativo','Gilderas Pai','1977-07-03'),(394,'101.789.789-90','Gilderas','1997-07-03','teste@hotmail.piolumj',1234,'ativo','Gilderas Pai','1977-07-03'),(395,'123.789.789-90','Gilderas','1997-07-03','teste@hotmail.dasdscs',1234,'ativo','Gilderas Pai','1977-07-03'),(397,'456.789.789-90','Gilderas','1997-07-03','teste@hotmail.dfasdfasd',1234,'ativo','Gilderas Pai','1977-07-03'),(398,'789.789.789-90','Gilderas','1997-07-03','teste@hotmail.ççlkj',1234,'ativo','Gilderas Pai','1977-07-03'),(399,'123.123.123-12','Gilderas','1997-07-03','teste@hotmail.xcsss',1234,'ativo','Gilderas Pai','1977-07-03'),(400,'456.123.123-12','Gilderas','1997-07-03','teste@hotmail.dqdq',1234,'ativo','Gilderas Pai','1977-07-03'),(401,'456.456.123-12','Gilderas','1997-07-03','teste@hotmail.asdcasd',1234,'ativo','Gilderas Pai','1977-07-03'),(402,'456.456.456-12','Gilderas','1997-07-03','teste@hotmail.adfsdf',1234,'ativo','Gilderas Pai','1977-07-03'),(405,'789.456.456-45','Gilderas','1997-07-03','teste@hotmail.casdcas',1234,'ativo','Gilderas Pai','1977-07-03'),(406,'789.789.456-45','Gilderas','1997-07-03','teste@hotmail.bvnvbn',1234,'ativo','Gilderas Pai','1977-07-03'),(407,'789.789.789-45','Gilderas','1997-07-03','teste@hotmail.dfasdfh',1234,'ativo','Gilderas Pai','1977-07-03'),(408,'789.789.789-78','Gilderas','1997-07-03','teste@hotmail.xxxx',1234,'ativo','Gilderas Pai','1977-07-03');
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimo_has_livro`
--

DROP TABLE IF EXISTS `emprestimo_has_livro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimo_has_livro` (
  `emprestimo_livro_idEmprestimo` int NOT NULL,
  `livro_idLivro` int NOT NULL,
  `qtdLivro` int NOT NULL,
  PRIMARY KEY (`livro_idLivro`,`emprestimo_livro_idEmprestimo`),
  KEY `fk_emprestimo_livro_has_livro_livro1_idx` (`livro_idLivro`),
  KEY `fk_emprestimo_livro_has_livro_emprestimo_livro1_idx` (`emprestimo_livro_idEmprestimo`),
  CONSTRAINT `fk_emprestimo_livro_has_livro_emprestimo_livro1` FOREIGN KEY (`emprestimo_livro_idEmprestimo`) REFERENCES `emprestimo_livro` (`idEmprestimo`),
  CONSTRAINT `fk_emprestimo_livro_has_livro_livro1` FOREIGN KEY (`livro_idLivro`) REFERENCES `livro` (`idLivro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimo_has_livro`
--

LOCK TABLES `emprestimo_has_livro` WRITE;
/*!40000 ALTER TABLE `emprestimo_has_livro` DISABLE KEYS */;
INSERT INTO `emprestimo_has_livro` VALUES (105,20,1),(107,20,1),(108,20,5),(110,20,1),(111,20,1),(106,21,3),(111,21,1),(114,21,1),(116,21,1),(119,21,1),(148,21,1),(149,21,10),(150,21,1),(151,21,1),(106,22,3),(117,22,1),(120,22,1),(122,22,1),(149,22,1),(150,22,1),(106,24,3),(115,24,1),(135,33,1),(137,123,1),(139,124,1),(132,125,1),(140,126,1),(145,127,1),(143,128,1),(144,129,1),(141,130,1),(123,131,1),(149,133,1),(146,135,1);
/*!40000 ALTER TABLE `emprestimo_has_livro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emprestimo_livro`
--

DROP TABLE IF EXISTS `emprestimo_livro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emprestimo_livro` (
  `idEmprestimo` int NOT NULL AUTO_INCREMENT COMMENT 'ID do empréstimo do livro',
  `dataEmprestimo` date NOT NULL COMMENT 'Data empréstimo do livro',
  `dataDevolucao` date NOT NULL COMMENT 'Data devolução do livro',
  `status` int NOT NULL DEFAULT '1' COMMENT 'Status atual do livro',
  `valorMulta` float DEFAULT NULL,
  `aluno_idAluno` int NOT NULL,
  `adm_usuario_idUsuario` int NOT NULL,
  PRIMARY KEY (`idEmprestimo`),
  KEY `fk_emprestimo_livro_aluno_idx` (`aluno_idAluno`),
  KEY `fk_emprestimo_livro_adm_usuario1_idx` (`adm_usuario_idUsuario`),
  CONSTRAINT `fk_emprestimo_livro_adm_usuario1` FOREIGN KEY (`adm_usuario_idUsuario`) REFERENCES `adm_usuario` (`idUsuario`),
  CONSTRAINT `fk_emprestimo_livro_aluno` FOREIGN KEY (`aluno_idAluno`) REFERENCES `aluno` (`idAluno`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emprestimo_livro`
--

LOCK TABLES `emprestimo_livro` WRITE;
/*!40000 ALTER TABLE `emprestimo_livro` DISABLE KEYS */;
INSERT INTO `emprestimo_livro` VALUES (105,'2021-05-24','2021-05-31',1,0,389,20),(106,'2021-05-24','2021-05-31',1,0,389,20),(107,'2021-05-24','2021-05-31',1,0,389,20),(108,'2021-05-24','2021-05-31',1,0,389,20),(109,'2021-05-25','2021-06-01',1,0,389,20),(110,'2021-05-25','2021-06-01',1,0,389,20),(111,'2021-05-25','2021-06-01',1,0,407,20),(113,'2021-05-25','2021-06-01',1,0,389,20),(114,'2021-05-25','2021-06-01',1,0,407,20),(115,'2021-05-25','2021-06-01',1,0,407,20),(116,'2021-05-25','2021-06-01',1,0,389,20),(117,'2021-05-25','2021-06-01',1,0,387,20),(118,'2021-05-26','2021-06-02',1,0,389,20),(119,'2021-05-26','2021-06-02',1,0,389,20),(120,'2021-05-26','2021-06-02',1,0,389,20),(121,'2021-05-26','2021-06-02',1,0,407,20),(122,'2021-05-26','2021-06-02',1,0,407,20),(123,'2021-05-26','2021-06-02',1,0,407,20),(124,'2021-05-26','2021-06-02',1,0,389,20),(125,'2021-05-26','2021-06-02',1,0,389,20),(126,'2021-05-26','2021-06-02',1,0,389,20),(127,'2021-05-26','2021-06-02',1,0,389,20),(128,'2021-05-26','2021-06-02',1,0,389,20),(129,'2021-05-26','2021-06-02',1,0,389,20),(130,'2021-05-26','2021-06-02',1,0,407,20),(131,'2021-05-26','2021-06-02',1,0,389,20),(132,'2021-05-26','2021-06-02',1,0,407,20),(133,'2021-05-26','2021-06-02',1,0,374,20),(134,'2021-05-26','2021-06-02',1,0,389,20),(135,'2021-05-26','2021-06-02',1,0,375,20),(136,'2021-05-26','2021-06-02',1,0,389,20),(137,'2021-05-26','2021-06-02',1,0,372,20),(138,'2021-05-26','2021-06-02',1,0,389,20),(139,'2021-05-26','2021-06-02',1,0,389,20),(140,'2021-05-26','2021-06-02',1,0,407,20),(141,'2021-05-26','2021-06-02',1,0,389,20),(142,'2021-05-26','2021-06-02',1,0,407,20),(143,'2021-05-26','2021-06-02',1,0,407,20),(144,'2021-05-26','2021-06-02',1,0,407,20),(145,'2021-05-26','2021-06-02',1,0,389,20),(146,'2021-05-26','2021-06-02',1,0,389,20),(147,'2021-05-26','2021-06-02',1,0,389,20),(148,'2021-05-26','2021-06-02',1,0,372,20),(149,'2021-05-26','2021-06-02',1,0,389,20),(150,'2021-05-26','2021-06-02',1,0,389,20),(151,'2021-05-26','2021-06-02',1,0,407,20);
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
) ENGINE=InnoDB AUTO_INCREMENT=320 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livro`
--

LOCK TABLES `livro` WRITE;
/*!40000 ALTER TABLE `livro` DISABLE KEYS */;
INSERT INTO `livro` VALUES (20,'Livro Tec','MX-123','1999-07-30',0,2),(21,'Livro Tec 2222222','MX-1234','1996-07-03',87,2),(22,'Livro Tecccccccccc dfadfasdf','MX-123gggg','1996-07-01',0,2),(23,'Livro Para Testar Zerado','123GGG','1999-01-01',0,1),(24,'Titulo Livro 1	','Codigo Livro T1	','1999-01-01',0,1),(25,'Titulo Livro 2	','Codigo Livro T2	','1999-01-01',2,1),(26,'Titulo Livro 3	','Codigo Livro T3	','1999-01-01',3,1),(27,'Titulo Livro 4	','Codigo Livro T4	','1999-01-01',1,1),(28,'Titulo Livro 5	','Codigo Livro T5	','1999-01-01',1,1),(29,'Titulo Livro 6	','Codigo Livro T6	','1999-01-01',1,1),(30,'Titulo Livro 7	','Codigo Livro T7	','1999-01-01',1,1),(31,'Titulo Livro 8	','Codigo Livro T8	','1999-01-01',1,1),(32,'Titulo Livro 9	','Codigo Livro T9	','1999-01-01',1,1),(33,'Titulo Livro 10	','Codigo Livro T10	','1999-01-01',0,1),(34,'Titulo Livro 11	','Codigo Livro T11	','1999-01-01',1,1),(35,'Titulo Livro 12	','Codigo Livro T12	','1999-01-01',1,1),(36,'Titulo Livro 13	','Codigo Livro T13	','1999-01-01',1,1),(37,'Titulo Livro 14	','Codigo Livro T14	','1999-01-01',1,1),(38,'Titulo Livro 15	','Codigo Livro T15	','1999-01-01',1,1),(39,'Titulo Livro 16	','Codigo Livro T16	','1999-01-01',1,1),(40,'Titulo Livro 17	','Codigo Livro T17	','1999-01-01',1,1),(41,'Titulo Livro 18	','Codigo Livro T18	','1999-01-01',1,1),(42,'Titulo Livro 19	','Codigo Livro T19	','1999-01-01',1,1),(43,'Titulo Livro 20	','Codigo Livro T20	','1999-01-01',1,1),(44,'Titulo Livro 21	','Codigo Livro T21	','1999-01-01',1,1),(45,'Titulo Livro 22	','Codigo Livro T22	','1999-01-01',1,1),(46,'Titulo Livro 23	','Codigo Livro T23	','1999-01-01',1,1),(47,'Titulo Livro 24	','Codigo Livro T24	','1999-01-01',1,1),(48,'Titulo Livro 25	','Codigo Livro T25	','1999-01-01',1,1),(49,'Titulo Livro 26	','Codigo Livro T26	','1999-01-01',1,1),(50,'Titulo Livro 27	','Codigo Livro T27	','1999-01-01',1,1),(51,'Titulo Livro 28	','Codigo Livro T28	','1999-01-01',1,1),(52,'Titulo Livro 29	','Codigo Livro T29	','1999-01-01',1,1),(53,'Titulo Livro 30	','Codigo Livro T30	','1999-01-01',1,1),(54,'Titulo Livro 31	','Codigo Livro T31	','1999-01-01',1,1),(55,'Titulo Livro 32	','Codigo Livro T32	','1999-01-01',1,1),(56,'Titulo Livro 33	','Codigo Livro T33	','1999-01-01',1,1),(57,'Titulo Livro 34	','Codigo Livro T34	','1999-01-01',1,1),(58,'Titulo Livro 35	','Codigo Livro T35	','1999-01-01',1,1),(59,'Titulo Livro 36	','Codigo Livro T36	','1999-01-01',1,1),(60,'Titulo Livro 37	','Codigo Livro T37	','1999-01-01',1,1),(61,'Titulo Livro 38	','Codigo Livro T38	','1999-01-01',1,1),(62,'Titulo Livro 39	','Codigo Livro T39	','1999-01-01',1,1),(63,'Titulo Livro 40	','Codigo Livro T40	','1999-01-01',1,1),(64,'Titulo Livro 41	','Codigo Livro T41	','1999-01-01',1,1),(65,'Titulo Livro 42	','Codigo Livro T42	','1999-01-01',0,1),(66,'Titulo Livro 43	','Codigo Livro T43	','1999-01-01',1,1),(67,'Titulo Livro 44	','Codigo Livro T44	','1999-01-01',1,1),(68,'Titulo Livro 45	','Codigo Livro T45	','1999-01-01',1,1),(69,'Titulo Livro 46	','Codigo Livro T46	','1999-01-01',1,1),(70,'Titulo Livro 47	','Codigo Livro T47	','1999-01-01',1,1),(71,'Titulo Livro 48	','Codigo Livro T48	','1999-01-01',1,1),(72,'Titulo Livro 49	','Codigo Livro T49	','1999-01-01',1,1),(73,'Titulo Livro 50	','Codigo Livro T50	','1999-01-01',1,1),(74,'Titulo Livro 51	','Codigo Livro T51	','1999-01-01',1,1),(75,'Titulo Livro 52	','Codigo Livro T52	','1999-01-01',1,1),(76,'Titulo Livro 53	','Codigo Livro T53	','1999-01-01',1,1),(77,'Titulo Livro 54	','Codigo Livro T54	','1999-01-01',1,1),(78,'Titulo Livro 55	','Codigo Livro T55	','1999-01-01',1,1),(79,'Titulo Livro 56	','Codigo Livro T56	','1999-01-01',1,1),(80,'Titulo Livro 57	','Codigo Livro T57	','1999-01-01',1,1),(81,'Titulo Livro 58	','Codigo Livro T58	','1999-01-01',1,1),(82,'Titulo Livro 59	','Codigo Livro T59	','1999-01-01',1,1),(83,'Titulo Livro 60	','Codigo Livro T60	','1999-01-01',1,1),(84,'Titulo Livro 61	','Codigo Livro T61	','1999-01-01',1,1),(85,'Titulo Livro 62	','Codigo Livro T62	','1999-01-01',1,1),(86,'Titulo Livro 63	','Codigo Livro T63	','1999-01-01',1,1),(87,'Titulo Livro 64	','Codigo Livro T64	','1999-01-01',1,1),(88,'Titulo Livro 65	','Codigo Livro T65	','1999-01-01',1,1),(89,'Titulo Livro 66	','Codigo Livro T66	','1999-01-01',1,1),(90,'Titulo Livro 67	','Codigo Livro T67	','1999-01-01',1,1),(91,'Titulo Livro 68	','Codigo Livro T68	','1999-01-01',1,1),(92,'Titulo Livro 69	','Codigo Livro T69	','1999-01-01',1,1),(93,'Titulo Livro 70	','Codigo Livro T70	','1999-01-01',1,1),(94,'Titulo Livro 71	','Codigo Livro T71	','1999-01-01',1,1),(95,'Titulo Livro 72	','Codigo Livro T72	','1999-01-01',1,1),(96,'Titulo Livro 73	','Codigo Livro T73	','1999-01-01',1,1),(97,'Titulo Livro 74	','Codigo Livro T74	','1999-01-01',1,1),(98,'Titulo Livro 75	','Codigo Livro T75	','1999-01-01',1,1),(99,'Titulo Livro 76	','Codigo Livro T76	','1999-01-01',1,1),(100,'Titulo Livro 77	','Codigo Livro T77	','1999-01-01',1,1),(101,'Titulo Livro 78	','Codigo Livro T78	','1999-01-01',1,1),(102,'Titulo Livro 79	','Codigo Livro T79	','1999-01-01',1,1),(103,'Titulo Livro 80	','Codigo Livro T80	','1999-01-01',1,1),(104,'Titulo Livro 81	','Codigo Livro T81	','1999-01-01',1,1),(105,'Titulo Livro 82	','Codigo Livro T82	','1999-01-01',1,1),(106,'Titulo Livro 83	','Codigo Livro T83	','1999-01-01',1,1),(107,'Titulo Livro 84	','Codigo Livro T84	','1999-01-01',1,1),(108,'Titulo Livro 85	','Codigo Livro T85	','1999-01-01',1,1),(109,'Titulo Livro 86	','Codigo Livro T86	','1999-01-01',1,1),(110,'Titulo Livro 87	','Codigo Livro T87	','1999-01-01',1,1),(111,'Titulo Livro 88	','Codigo Livro T88	','1999-01-01',1,1),(112,'Titulo Livro 89	','Codigo Livro T89	','1999-01-01',1,1),(113,'Titulo Livro 90	','Codigo Livro T90	','1999-01-01',1,1),(114,'Titulo Livro 91	','Codigo Livro T91	','1999-01-01',1,1),(115,'Titulo Livro 92	','Codigo Livro T92	','1999-01-01',1,1),(116,'Titulo Livro 93	','Codigo Livro T93	','1999-01-01',1,1),(117,'Titulo Livro 94	','Codigo Livro T94	','1999-01-01',1,1),(118,'Titulo Livro 95	','Codigo Livro T95	','1999-01-01',1,1),(119,'Titulo Livro 96	','Codigo Livro T96	','1999-01-01',1,1),(120,'Titulo Livro 97	','Codigo Livro T97	','1999-01-01',1,1),(121,'Titulo Livro 98	','Codigo Livro T98	','1999-01-01',1,1),(122,'Titulo Livro 99	','Codigo Livro T99	','1999-01-01',1,1),(123,'Titulo Livro 100	','Codigo Livro T100	','1999-01-01',0,1),(124,'Titulo Livro 101	','Codigo Livro T101	','1999-01-01',0,1),(125,'Titulo Livro 102	','Codigo Livro T102	','1999-01-01',0,1),(126,'Titulo Livro 103	','Codigo Livro T103	','1999-01-01',0,1),(127,'Titulo Livro 104	','Codigo Livro T104	','1999-01-01',0,1),(128,'Titulo Livro 105	','Codigo Livro T105	','1999-01-01',0,1),(129,'Titulo Livro 106	','Codigo Livro T106	','1999-01-01',0,1),(130,'Titulo Livro 107	','Codigo Livro T107	','1999-01-01',0,1),(131,'Titulo Livro 108	','Codigo Livro T108	','1999-01-01',0,1),(132,'Titulo Livro 109	','Codigo Livro T109	','1999-01-01',1,1),(133,'Titulo Livro 110	','Codigo Livro T110	','1999-01-01',0,1),(134,'Titulo Livro 111	','Codigo Livro T111	','1999-01-01',1,1),(135,'Titulo Livro 112	','Codigo Livro T112	','1999-01-01',0,1),(136,'Titulo Livro 113	','Codigo Livro T113	','1999-01-01',1,1),(137,'Titulo Livro 114	','Codigo Livro T114	','1999-01-01',1,1),(138,'Titulo Livro 115	','Codigo Livro T115	','1999-01-01',1,1),(139,'Titulo Livro 116	','Codigo Livro T116	','1999-01-01',1,1),(140,'Titulo Livro 117	','Codigo Livro T117	','1999-01-01',1,1),(141,'Titulo Livro 118	','Codigo Livro T118	','1999-01-01',1,1),(142,'Titulo Livro 119	','Codigo Livro T119	','1999-01-01',1,1),(143,'Titulo Livro 120	','Codigo Livro T120	','1999-01-01',1,1),(144,'Titulo Livro 121	','Codigo Livro T121	','1999-01-01',1,1),(145,'Titulo Livro 122	','Codigo Livro T122	','1999-01-01',1,1),(146,'Titulo Livro 123	','Codigo Livro T123	','1999-01-01',1,1),(147,'Titulo Livro 124	','Codigo Livro T124	','1999-01-01',1,1),(148,'Titulo Livro 125	','Codigo Livro T125	','1999-01-01',1,1),(149,'Titulo Livro 126	','Codigo Livro T126	','1999-01-01',1,1),(150,'Titulo Livro 127	','Codigo Livro T127	','1999-01-01',1,1),(151,'Titulo Livro 128	','Codigo Livro T128	','1999-01-01',1,1),(152,'Titulo Livro 129	','Codigo Livro T129	','1999-01-01',1,1),(153,'Titulo Livro 130	','Codigo Livro T130	','1999-01-01',1,1),(154,'Titulo Livro 131	','Codigo Livro T131	','1999-01-01',1,1),(155,'Titulo Livro 132	','Codigo Livro T132	','1999-01-01',1,1),(156,'Titulo Livro 133	','Codigo Livro T133	','1999-01-01',1,1),(157,'Titulo Livro 134	','Codigo Livro T134	','1999-01-01',1,1),(158,'Titulo Livro 135	','Codigo Livro T135	','1999-01-01',1,1),(159,'Titulo Livro 136	','Codigo Livro T136	','1999-01-01',1,1),(160,'Titulo Livro 137	','Codigo Livro T137	','1999-01-01',1,1),(161,'Titulo Livro 138	','Codigo Livro T138	','1999-01-01',1,1),(162,'Titulo Livro 139	','Codigo Livro T139	','1999-01-01',1,1),(163,'Titulo Livro 140	','Codigo Livro T140	','1999-01-01',1,1),(164,'Titulo Livro 141	','Codigo Livro T141	','1999-01-01',1,1),(165,'Titulo Livro 142	','Codigo Livro T142	','1999-01-01',1,1),(166,'Titulo Livro 143	','Codigo Livro T143	','1999-01-01',1,1),(167,'Titulo Livro 144	','Codigo Livro T144	','1999-01-01',1,1),(168,'Titulo Livro 145	','Codigo Livro T145	','1999-01-01',1,1),(169,'Titulo Livro 146	','Codigo Livro T146	','1999-01-01',1,1),(170,'Titulo Livro 147	','Codigo Livro T147	','1999-01-01',1,1),(171,'Titulo Livro 148	','Codigo Livro T148	','1999-01-01',1,1),(172,'Titulo Livro 149	','Codigo Livro T149	','1999-01-01',1,1),(173,'Titulo Livro 150	','Codigo Livro T150	','1999-01-01',1,1),(174,'Titulo Livro 151	','Codigo Livro T151	','1999-01-01',1,1),(175,'Titulo Livro 152	','Codigo Livro T152	','1999-01-01',1,1),(176,'Titulo Livro 153	','Codigo Livro T153	','1999-01-01',1,1),(177,'Titulo Livro 154	','Codigo Livro T154	','1999-01-01',1,1),(178,'Titulo Livro 155	','Codigo Livro T155	','1999-01-01',1,1),(179,'Titulo Livro 156	','Codigo Livro T156	','1999-01-01',1,1),(180,'Titulo Livro 157	','Codigo Livro T157	','1999-01-01',1,1),(181,'Titulo Livro 158	','Codigo Livro T158	','1999-01-01',1,1),(182,'Titulo Livro 159	','Codigo Livro T159	','1999-01-01',1,1),(183,'Titulo Livro 160	','Codigo Livro T160	','1999-01-01',1,1),(184,'Titulo Livro 161	','Codigo Livro T161	','1999-01-01',1,1),(185,'Titulo Livro 162	','Codigo Livro T162	','1999-01-01',1,1),(186,'Titulo Livro 163	','Codigo Livro T163	','1999-01-01',1,1),(187,'Titulo Livro 164	','Codigo Livro T164	','1999-01-01',1,1),(188,'Titulo Livro 165	','Codigo Livro T165	','1999-01-01',1,1),(189,'Titulo Livro 166	','Codigo Livro T166	','1999-01-01',1,1),(190,'Titulo Livro 167	','Codigo Livro T167	','1999-01-01',1,1),(191,'Titulo Livro 168	','Codigo Livro T168	','1999-01-01',1,1),(192,'Titulo Livro 169	','Codigo Livro T169	','1999-01-01',1,1),(193,'Titulo Livro 170	','Codigo Livro T170	','1999-01-01',1,1),(194,'Titulo Livro 171	','Codigo Livro T171	','1999-01-01',1,1),(195,'Titulo Livro 172	','Codigo Livro T172	','1999-01-01',1,1),(196,'Titulo Livro 173	','Codigo Livro T173	','1999-01-01',1,1),(197,'Titulo Livro 174	','Codigo Livro T174	','1999-01-01',1,1),(198,'Titulo Livro 175	','Codigo Livro T175	','1999-01-01',1,1),(199,'Titulo Livro 176	','Codigo Livro T176	','1999-01-01',1,1),(200,'Titulo Livro 177	','Codigo Livro T177	','1999-01-01',1,1),(201,'Titulo Livro 178	','Codigo Livro T178	','1999-01-01',1,1),(202,'Titulo Livro 179	','Codigo Livro T179	','1999-01-01',1,1),(203,'Titulo Livro 180	','Codigo Livro T180	','1999-01-01',1,1),(204,'Titulo Livro 181	','Codigo Livro T181	','1999-01-01',1,1),(205,'Titulo Livro 182	','Codigo Livro T182	','1999-01-01',1,1),(206,'Titulo Livro 183	','Codigo Livro T183	','1999-01-01',1,1),(207,'Titulo Livro 184	','Codigo Livro T184	','1999-01-01',1,1),(208,'Titulo Livro 185	','Codigo Livro T185	','1999-01-01',1,1),(209,'Titulo Livro 186	','Codigo Livro T186	','1999-01-01',1,1),(210,'Titulo Livro 187	','Codigo Livro T187	','1999-01-01',1,1),(211,'Titulo Livro 188	','Codigo Livro T188	','1999-01-01',1,1),(212,'Titulo Livro 189	','Codigo Livro T189	','1999-01-01',1,1),(213,'Titulo Livro 190	','Codigo Livro T190	','1999-01-01',1,1),(214,'Titulo Livro 191	','Codigo Livro T191	','1999-01-01',1,1),(215,'Titulo Livro 192	','Codigo Livro T192	','1999-01-01',1,1),(216,'Titulo Livro 193	','Codigo Livro T193	','1999-01-01',1,1),(217,'Titulo Livro 194	','Codigo Livro T194	','1999-01-01',1,1),(218,'Titulo Livro 195	','Codigo Livro T195	','1999-01-01',1,1),(219,'Titulo Livro 196	','Codigo Livro T196	','1999-01-01',1,1),(220,'Titulo Livro 197	','Codigo Livro T197	','1999-01-01',1,1),(221,'Titulo Livro 198	','Codigo Livro T198	','1999-01-01',1,1),(222,'Titulo Livro 199	','Codigo Livro T199	','1999-01-01',1,1),(223,'Titulo Livro 200	','Codigo Livro T200	','1999-01-01',1,1),(224,'Titulo Livro 201	','Codigo Livro T201	','1999-01-01',1,1),(225,'Titulo Livro 202	','Codigo Livro T202	','1999-01-01',1,1),(226,'Titulo Livro 203	','Codigo Livro T203	','1999-01-01',1,1),(227,'Titulo Livro 204	','Codigo Livro T204	','1999-01-01',1,1),(228,'Titulo Livro 205	','Codigo Livro T205	','1999-01-01',1,1),(229,'Titulo Livro 206	','Codigo Livro T206	','1999-01-01',1,1),(230,'Titulo Livro 207	','Codigo Livro T207	','1999-01-01',1,1),(231,'Titulo Livro 208	','Codigo Livro T208	','1999-01-01',1,1),(232,'Titulo Livro 209	','Codigo Livro T209	','1999-01-01',1,1),(233,'Titulo Livro 210	','Codigo Livro T210	','1999-01-01',1,1),(234,'Titulo Livro 211	','Codigo Livro T211	','1999-01-01',1,1),(235,'Titulo Livro 212	','Codigo Livro T212	','1999-01-01',1,1),(236,'Titulo Livro 213	','Codigo Livro T213	','1999-01-01',1,1),(237,'Titulo Livro 214	','Codigo Livro T214	','1999-01-01',1,1),(238,'Titulo Livro 215	','Codigo Livro T215	','1999-01-01',1,1),(239,'Titulo Livro 216	','Codigo Livro T216	','1999-01-01',1,1),(240,'Titulo Livro 217	','Codigo Livro T217	','1999-01-01',1,1),(241,'Titulo Livro 218	','Codigo Livro T218	','1999-01-01',1,1),(242,'Titulo Livro 219	','Codigo Livro T219	','1999-01-01',1,1),(243,'Titulo Livro 220	','Codigo Livro T220	','1999-01-01',1,1),(244,'Titulo Livro 221	','Codigo Livro T221	','1999-01-01',1,1),(245,'Titulo Livro 222	','Codigo Livro T222	','1999-01-01',1,1),(246,'Titulo Livro 223	','Codigo Livro T223	','1999-01-01',1,1),(247,'Titulo Livro 224	','Codigo Livro T224	','1999-01-01',1,1),(248,'Titulo Livro 225	','Codigo Livro T225	','1999-01-01',1,1),(249,'Titulo Livro 226	','Codigo Livro T226	','1999-01-01',1,1),(250,'Titulo Livro 227	','Codigo Livro T227	','1999-01-01',1,1),(251,'Titulo Livro 228	','Codigo Livro T228	','1999-01-01',1,1),(252,'Titulo Livro 229	','Codigo Livro T229	','1999-01-01',1,1),(253,'Titulo Livro 230	','Codigo Livro T230	','1999-01-01',1,1),(254,'Titulo Livro 231	','Codigo Livro T231	','1999-01-01',1,1),(255,'Titulo Livro 232	','Codigo Livro T232	','1999-01-01',1,1),(256,'Titulo Livro 233	','Codigo Livro T233	','1999-01-01',1,1),(257,'Titulo Livro 234	','Codigo Livro T234	','1999-01-01',1,1),(258,'Titulo Livro 235	','Codigo Livro T235	','1999-01-01',1,1),(259,'Titulo Livro 236	','Codigo Livro T236	','1999-01-01',1,1),(260,'Titulo Livro 237	','Codigo Livro T237	','1999-01-01',1,1),(261,'Titulo Livro 238	','Codigo Livro T238	','1999-01-01',1,1),(262,'Titulo Livro 239	','Codigo Livro T239	','1999-01-01',1,1),(263,'Titulo Livro 240	','Codigo Livro T240	','1999-01-01',1,1),(264,'Titulo Livro 241	','Codigo Livro T241	','1999-01-01',1,1),(265,'Titulo Livro 242	','Codigo Livro T242	','1999-01-01',1,1),(266,'Titulo Livro 243	','Codigo Livro T243	','1999-01-01',1,1),(267,'Titulo Livro 244	','Codigo Livro T244	','1999-01-01',1,1),(268,'Titulo Livro 245	','Codigo Livro T245	','1999-01-01',1,1),(269,'Titulo Livro 246	','Codigo Livro T246	','1999-01-01',1,1),(270,'Titulo Livro 247	','Codigo Livro T247	','1999-01-01',1,1),(271,'Titulo Livro 248	','Codigo Livro T248	','1999-01-01',1,1),(272,'Titulo Livro 249	','Codigo Livro T249	','1999-01-01',1,1),(273,'Titulo Livro 250	','Codigo Livro T250	','1999-01-01',1,1),(274,'Titulo Livro 251	','Codigo Livro T251	','1999-01-01',1,1),(275,'Titulo Livro 252	','Codigo Livro T252	','1999-01-01',1,1),(276,'Titulo Livro 253	','Codigo Livro T253	','1999-01-01',1,1),(277,'Titulo Livro 254	','Codigo Livro T254	','1999-01-01',1,1),(278,'Titulo Livro 255	','Codigo Livro T255	','1999-01-01',1,1),(279,'Titulo Livro 256	','Codigo Livro T256	','1999-01-01',1,1),(280,'Titulo Livro 257	','Codigo Livro T257	','1999-01-01',1,1),(281,'Titulo Livro 258	','Codigo Livro T258	','1999-01-01',1,1),(282,'Titulo Livro 259	','Codigo Livro T259	','1999-01-01',1,1),(283,'Titulo Livro 260	','Codigo Livro T260	','1999-01-01',1,1),(284,'Titulo Livro 261	','Codigo Livro T261	','1999-01-01',1,1),(285,'Titulo Livro 262	','Codigo Livro T262	','1999-01-01',1,1),(286,'Titulo Livro 263	','Codigo Livro T263	','1999-01-01',1,1),(287,'Titulo Livro 264	','Codigo Livro T264	','1999-01-01',1,1),(288,'Titulo Livro 265	','Codigo Livro T265	','1999-01-01',1,1),(289,'Titulo Livro 266	','Codigo Livro T266	','1999-01-01',1,1),(290,'Titulo Livro 267	','Codigo Livro T267	','1999-01-01',1,1),(291,'Titulo Livro 268	','Codigo Livro T268	','1999-01-01',1,1),(292,'Titulo Livro 269	','Codigo Livro T269	','1999-01-01',1,1),(293,'Titulo Livro 270	','Codigo Livro T270	','1999-01-01',1,1),(294,'Titulo Livro 271	','Codigo Livro T271	','1999-01-01',1,1),(295,'Titulo Livro 272	','Codigo Livro T272	','1999-01-01',1,1),(296,'Titulo Livro 273	','Codigo Livro T273	','1999-01-01',1,1),(297,'Titulo Livro 274	','Codigo Livro T274	','1999-01-01',1,1),(298,'Titulo Livro 275	','Codigo Livro T275	','1999-01-01',1,1),(299,'Titulo Livro 276	','Codigo Livro T276	','1999-01-01',1,1),(300,'Titulo Livro 277	','Codigo Livro T277	','1999-01-01',1,1),(301,'Titulo Livro 278	','Codigo Livro T278	','1999-01-01',1,1),(302,'Titulo Livro 279	','Codigo Livro T279	','1999-01-01',1,1),(303,'Titulo Livro 280	','Codigo Livro T280	','1999-01-01',1,1),(304,'Titulo Livro 281	','Codigo Livro T281	','1999-01-01',1,1),(305,'Titulo Livro 282	','Codigo Livro T282	','1999-01-01',1,1),(306,'Titulo Livro 283	','Codigo Livro T283	','1999-01-01',1,1),(307,'Titulo Livro 284	','Codigo Livro T284	','1999-01-01',1,1),(308,'Titulo Livro 285	','Codigo Livro T285	','1999-01-01',1,1),(309,'Titulo Livro 286	','Codigo Livro T286	','1999-01-01',1,1),(310,'Titulo Livro 287	','Codigo Livro T287	','1999-01-01',1,1),(311,'Titulo Livro 288	','Codigo Livro T288	','1999-01-01',1,1),(312,'Titulo Livro 289	','Codigo Livro T289	','1999-01-01',1,1),(313,'Titulo Livro 290	','Codigo Livro T290	','1999-01-01',1,1),(314,'Titulo Livro 291	','Codigo Livro T291	','1999-01-01',1,1),(315,'Titulo Livro 292	','Codigo Livro T292	','1999-01-01',1,1),(316,'Titulo Livro 293	','Codigo Livro T293	','1999-01-01',1,1),(317,'Titulo Livro 294	','Codigo Livro T294	','1999-01-01',1,1),(318,'Titulo Livro 295	','Codigo Livro T295	','1999-01-01',1,1),(319,'Titulo Livro 296	','Codigo Livro T296	','1999-01-01',1,1);
/*!40000 ALTER TABLE `livro` ENABLE KEYS */;
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

-- Dump completed on 2021-05-30 11:29:14
