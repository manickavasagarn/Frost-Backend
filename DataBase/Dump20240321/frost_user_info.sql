-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: frost
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(45) DEFAULT NULL,
  `FIRST_NAME` varchar(45) DEFAULT NULL,
  `LAST_NAME` varchar(45) DEFAULT NULL,
  `PHONE_NUMBER` varchar(45) DEFAULT NULL,
  `ADDRESS` varchar(145) DEFAULT NULL,
  `DOB` varchar(45) DEFAULT NULL,
  `GENDER` varchar(45) DEFAULT NULL,
  `UPDATE_TIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USER_ID_UNIQUE` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'4c055b34-c23a-4f25-b28a-3791ab9c9630','hello','Doe','1234567890','123 Main Street, Anytown, ABC, 12345, USA','1990-01-01','male','2024-03-21 14:44:51'),(2,'647ddf6f-f377-4116-9514-5fcc5bc9677e','John','Doe','1234567890','123 Main Street, Anytown, ABC, 12345, USA','1990-01-01','male',NULL),(3,'eb17d517-d57e-4d20-8a2f-ff7d0ed286f9','John','Doe','1234567890','123 Main Street, Anytown, ABC, 12345, USA','1990-01-01','male',NULL),(4,'f16dc098-abb2-4ef6-a140-edd0cae4825f','John','Doe3','1234567890','123 Main Street, Anytown, ABC, 12345, USA','1990-01-01','male','2024-03-21 12:21:35'),(5,'6558d734-e9bc-41b9-bf12-a394681ef828','John','Doe','1234567890','123 Main Street, Anytown, ABC, 12345, USA','1990-01-01','male',NULL),(6,'b5f9d840-6a2e-4423-9570-907cc5dd37ee','John','Doe','1234567890','123 Main Street, Anytown, ABC, 12345, USA','1990-01-01','male',NULL),(7,'92b2c8c0-0083-4688-b3a1-57b2270fa113','Manicka','Vasagar','5678','hell','2024-03-01','male',NULL),(8,'4f97181a-fcd0-4179-9eff-377f766d0f6a','newuser','Vasagar','1234567890','hello','2024-03-07','male',NULL),(9,'4ed7a1de-9108-4034-a257-1cb01b569968','test','66','1234567899','adm','2024-03-06','male',NULL),(10,'304ca2b0-6b45-4c65-9210-3c0be3a0c1b2','Manicka','Vasagar','1234567890','add','2024-03-12','male',NULL),(11,'89b6c932-592f-42fd-bf26-edae9458ffeb','Manicka','Vasagar','1234567890','adddres','2024-03-05','male',NULL),(12,'8292d4e6-5034-47a3-ac81-b702a65e6b2c','Manicka','Vasagar','1234567890','hello','2024-03-21','male','2024-03-21 16:49:59');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-21 16:56:04
