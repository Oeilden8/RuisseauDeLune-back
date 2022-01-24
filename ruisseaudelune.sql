-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: ruisseaudelune
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'wilder@wild.fr','wilder');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `source` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `asset_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` VALUES (1,'public/assets/images/bercheres-1.jpg','photo','berchere1'),(2,'public/assets/images/bercheres-2.jpg','photo','bercheres2'),(3,'public/assets/images/bercheres-3.jpg','photo','berchere3'),(4,'public/assets/images/boites.jpg','photo','boites'),(5,'public/assets/images/Bruno.jpg','photo','Bruno'),(6,'public/assets/images/flute.png','photo','flute'),(7,'public/assets/images/guitare.png','photo','guitare'),(8,'public/assets/images/kamishibai.jpg','photo','kamishibai'),(9,'public/assets/images/Martine.png','photo','Martine'),(10,'public/assets/images/papillons.jpg','photo','papillons'),(11,'public/assets/images/raconte-tapis.jpg','photo','raconte-tapis'),(12,'public/assets/images/roro-le-pompier.jpg','photo','roro-le-pompier'),(13,'public/assets/images/spectacle-ribambelle.jpg','photo','ribambelle'),(14,'public/assets/images/trio-musique.jpg','photo','trio-musique'),(15,'public/assets/images/xylophone.png','photo','xylophone');
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname_lastname` varchar(150) NOT NULL,
  `presentation` text,
  `phone` varchar(10) DEFAULT NULL,
  `diplomes` text,
  `assets_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_assets_id` (`assets_id`),
  CONSTRAINT `fk_assets_id` FOREIGN KEY (`assets_id`) REFERENCES `assets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'Bruno','Auteur-compositeur, chanteur et guitariste au sein de plusieurs groupes musicaux. Animateur Musicien intervenant dans des structures accueillant de jeunes enfants (crèches, Relais Petite Enfance, ALSH, Hopital de jour etc…)','0781397145','Diplomé universitaire intitulé « la musique et le tout-petit, la musique et l’enfant en situation de handicap » au CFMI de Tours-Fondettes.',5),(2,'Martine','Educatrice de Jeunes Enfants depuis de nombreuses années en multi-Accueil. A suivi différentes formations avec « Enfance et Musique » (autour de la musique, du chant, de la danse etc…)','0622022458','Diplomé universitaire intitulé « la musique et le tout-petit, la musique et l’enfant en situation de handicap » au CFMI de Tours-Fondettes.',9);
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `places` varchar(150) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'spectacle','Goutte d\'eau',NULL,'L\'eau comme élément central est prétexte à un voyage onirique. L\'enfant est invité à découvrir un univers sensoriel, composé de musiques douces ou rythmées, de jeux d\'ombres, de chansons originales et d\'effets visuels et sonores. L\'absence de narration laisse le jeune spectateur libre dans son interprétation et son imaginaire, le tout dans un décor épuré.\n'),(2,'atelier','Autour du livre',NULL,'Mille et une façons de raconter des histoires : kamishibaî, raconte-robe,\nraconte-tapis, théâtre d\'ombres avec de nombreux albums jeunesse.'),(3,'atelier','Eveil Musical',NULL,'Exploration musicale grâce à de multiples instruments : Guitare, Balafon, Petites percussions, métallophone, ukulele, harmonica, kazoo etc... Découverte de chansons d\'hier et d\'aujourd hui, d\'ici et d\'ailleurs. Jeux musicaux corporels.');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'/20211207134258-admins','2022-01-24 11:24:40'),(2,'/20211215092543-assets','2022-01-24 11:24:40'),(3,'/20211215093112-events','2022-01-24 11:24:40'),(4,'/20211215095824-selection-assets','2022-01-24 11:24:40'),(5,'/20211215100047-contact','2022-01-24 11:24:40'),(6,'/20211215110516-teamAdmin','2022-01-24 11:24:40'),(7,'/20211217090309-news','2022-01-24 11:24:40'),(8,'/20220124095102-add-assetsInsertions','2022-01-24 11:25:01'),(9,'/20220124095328-add-eventsInsertions','2022-01-24 11:26:21'),(10,'/20220124095507-add-newsInsertions','2022-01-24 11:35:44'),(11,'/20220124095606-add-contactInsertions','2022-01-24 11:35:44');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `actual_place` varchar(50) DEFAULT NULL,
  `date_first` date DEFAULT NULL,
  `date_last` date DEFAULT NULL,
  `description` text,
  `assets_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Goutte d\'Eau','La Loupe','2020-02-20','2022-05-21',NULL,NULL);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `selection_assets`
--

DROP TABLE IF EXISTS `selection_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `selection_assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `assets_id` int NOT NULL,
  `events_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `selection_assets`
--

LOCK TABLES `selection_assets` WRITE;
/*!40000 ALTER TABLE `selection_assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `selection_assets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-24 12:22:14
