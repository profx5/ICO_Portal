-- MySQL dump 10.13  Distrib 5.7.12, for osx10.11 (x86_64)
--
-- Host: localhost    Database: ico_portal
-- ------------------------------------------------------
-- Server version	5.7.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(10) COLLATE utf8_bin NOT NULL,
  `address` varchar(42) COLLATE utf8_bin NOT NULL,
  `investor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_investor_id_15648101_fk_investors_id` (`investor_id`),
  CONSTRAINT `accounts_investor_id_15648101_fk_investors_id` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add account',7,'add_account'),(20,'Can change account',7,'change_account'),(21,'Can delete account',7,'delete_account'),(22,'Can add deposit',8,'add_deposit'),(23,'Can change deposit',8,'change_deposit'),(24,'Can delete deposit',8,'delete_deposit'),(25,'Can add investor',9,'add_investor'),(26,'Can change investor',9,'change_investor'),(27,'Can delete investor',9,'delete_investor'),(28,'Can add KYC',10,'add_kyc'),(29,'Can change KYC',10,'change_kyc'),(30,'Can delete KYC',10,'delete_kyc'),(31,'Can add mint',11,'add_mint'),(32,'Can change mint',11,'change_mint'),(33,'Can delete mint',11,'delete_mint'),(34,'Can add phase',12,'add_phase'),(35,'Can change phase',12,'change_phase'),(36,'Can delete phase',12,'delete_phase'),(37,'Can add association',13,'add_association'),(38,'Can change association',13,'change_association'),(39,'Can delete association',13,'delete_association'),(40,'Can add code',14,'add_code'),(41,'Can change code',14,'change_code'),(42,'Can delete code',14,'delete_code'),(43,'Can add nonce',15,'add_nonce'),(44,'Can change nonce',15,'change_nonce'),(45,'Can delete nonce',15,'delete_nonce'),(46,'Can add user social auth',16,'add_usersocialauth'),(47,'Can change user social auth',16,'change_usersocialauth'),(48,'Can delete user social auth',16,'delete_usersocialauth'),(49,'Can add partial',17,'add_partial'),(50,'Can change partial',17,'change_partial'),(51,'Can delete partial',17,'delete_partial');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8_bin NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8_bin NOT NULL,
  `first_name` varchar(30) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(150) COLLATE utf8_bin NOT NULL,
  `email` varchar(254) COLLATE utf8_bin NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$100000$CrUP33kkntpN$DvjQIe5LCNkSOQ0q7ChEuP69hb+W8XIXXY3p2jHwub0=','2018-04-02 21:01:37.008632',1,'admin','','','',1,1,'2018-04-02 21:01:34.491587');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposits`
--

DROP TABLE IF EXISTS `deposits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deposits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(32,8) NOT NULL,
  `amount_wo_bonus` decimal(32,8) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `charged_at` datetime(6) DEFAULT NULL,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  `investor_id` int(11) NOT NULL,
  `mint_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mint_id` (`mint_id`),
  KEY `deposits_investor_id_d7cc7080_fk_investors_id` (`investor_id`),
  CONSTRAINT `deposits_investor_id_d7cc7080_fk_investors_id` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`),
  CONSTRAINT `deposits_mint_id_19248720_fk_mint_log_id` FOREIGN KEY (`mint_id`) REFERENCES `mint_log` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposits`
--

LOCK TABLES `deposits` WRITE;
/*!40000 ALTER TABLE `deposits` DISABLE KEYS */;
/*!40000 ALTER TABLE `deposits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8_bin,
  `object_repr` varchar(200) COLLATE utf8_bin NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext COLLATE utf8_bin NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2018-04-02 21:01:45.395376','1','KYC for Roman  Nesytov',3,'',10,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8_bin NOT NULL,
  `model` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(13,'social_django','association'),(14,'social_django','code'),(15,'social_django','nonce'),(17,'social_django','partial'),(16,'social_django','usersocialauth'),(7,'user_office','account'),(8,'user_office','deposit'),(9,'user_office','investor'),(10,'user_office','kyc'),(11,'user_office','mint'),(12,'user_office','phase');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2018-04-02 20:31:38.715264'),(2,'auth','0001_initial','2018-04-02 20:31:39.203937'),(3,'admin','0001_initial','2018-04-02 20:31:39.316763'),(4,'admin','0002_logentry_remove_auto_add','2018-04-02 20:31:39.330288'),(5,'contenttypes','0002_remove_content_type_name','2018-04-02 20:31:39.459750'),(6,'auth','0002_alter_permission_name_max_length','2018-04-02 20:31:39.519107'),(7,'auth','0003_alter_user_email_max_length','2018-04-02 20:31:39.567195'),(8,'auth','0004_alter_user_username_opts','2018-04-02 20:31:39.578000'),(9,'auth','0005_alter_user_last_login_null','2018-04-02 20:31:39.625330'),(10,'auth','0006_require_contenttypes_0002','2018-04-02 20:31:39.628028'),(11,'auth','0007_alter_validators_add_error_messages','2018-04-02 20:31:39.639839'),(12,'auth','0008_alter_user_username_max_length','2018-04-02 20:31:39.757144'),(13,'auth','0009_alter_user_last_name_max_length','2018-04-02 20:31:39.809573'),(14,'sessions','0001_initial','2018-04-02 20:31:39.878887'),(15,'user_office','0001_initial','2018-04-02 20:31:40.276373'),(16,'default','0001_initial','2018-04-02 20:31:55.405439'),(17,'social_auth','0001_initial','2018-04-02 20:31:55.408071'),(18,'default','0002_add_related_name','2018-04-02 20:31:55.464675'),(19,'social_auth','0002_add_related_name','2018-04-02 20:31:55.466776'),(20,'default','0003_alter_email_max_length','2018-04-02 20:31:55.498022'),(21,'social_auth','0003_alter_email_max_length','2018-04-02 20:31:55.500715'),(22,'default','0004_auto_20160423_0400','2018-04-02 20:31:55.513873'),(23,'social_auth','0004_auto_20160423_0400','2018-04-02 20:31:55.516382'),(24,'social_auth','0005_auto_20160727_2333','2018-04-02 20:31:55.540123'),(25,'social_django','0006_partial','2018-04-02 20:31:55.587701'),(26,'social_django','0007_code_timestamp','2018-04-02 20:31:55.672359'),(27,'social_django','0008_partial_timestamp','2018-04-02 20:31:55.734074'),(28,'social_django','0005_auto_20160727_2333','2018-04-02 20:31:55.737825'),(29,'social_django','0003_alter_email_max_length','2018-04-02 20:31:55.739936'),(30,'social_django','0004_auto_20160423_0400','2018-04-02 20:31:55.742366'),(31,'social_django','0001_initial','2018-04-02 20:31:55.744704'),(32,'social_django','0002_add_related_name','2018-04-02 20:31:55.746792'),(33,'user_office','0002_investor_referrer','2018-04-02 20:41:54.006882');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8_bin NOT NULL,
  `session_data` longtext COLLATE utf8_bin NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('o6a7wdf133o1058ev5ov2mifin1arviz','MDZiODAyZDllZDE3Y2U2YmRhOTYzZDIxODY5MjQwOTYxZWQ2MDE1YTp7Il9hdXRoX3VzZXJfaWQiOiI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLlVzZXJPZmZpY2VBdXRoQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjMxNzcwMjhiN2JmMGM5OWY5MzQxODM2YzViMTE3M2EyMGQ3Zjc1ZDUifQ==','2018-04-16 21:01:58.517226'),('onzj3cdzcupdd54m2dl0v8hwd1njcro4','MTc2ZDRlY2FiZjkzZmRkYTA2MjI5ZjU4M2Q1MTVkZjUyMDhjYjE0YTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxNTNiYzUwY2IwYTIwMDhhMjNmZjdlNmUzOWE2ZmQ0ZGYwNjY1NjNlIn0=','2018-04-16 21:01:37.011332');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investors`
--

DROP TABLE IF EXISTS `investors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `investors` (
  `password` varchar(128) COLLATE utf8_bin NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8_bin NOT NULL,
  `eth_account` varchar(42) COLLATE utf8_bin DEFAULT NULL,
  `tokens_amount` decimal(32,8) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `referral_id` varchar(16) COLLATE utf8_bin NOT NULL,
  `referrer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `referral_id` (`referral_id`),
  UNIQUE KEY `eth_account` (`eth_account`),
  KEY `investors_referrer_id_fe866d5b_fk_investors_id` (`referrer_id`),
  CONSTRAINT `investors_referrer_id_fe866d5b_fk_investors_id` FOREIGN KEY (`referrer_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investors`
--

LOCK TABLES `investors` WRITE;
/*!40000 ALTER TABLE `investors` DISABLE KEYS */;
INSERT INTO `investors` VALUES ('pbkdf2_sha256$100000$gfQQu2XMrLA3$QpsvkVn82HUvIpwXL02OdzE9MFtVtJKmwQIn9IyHzcM=','2018-04-02 20:35:16.346342',1,'_pel_men',NULL,0.00000000,'2018-04-02 17:35:16.199859','xG7SdjRHXqvoBbOd',NULL),('pbkdf2_sha256$100000$vmkoZM1AsnmZ$4b41l+p09kEgSVK13O17NAyGX8NpW1n9+qU5b87LbwI=','2018-04-02 21:01:58.515490',4,'gordon','0x73015966604928A312F79F7E69291a656Cb88602',0.00000000,'2018-04-02 17:44:00.839322','7i3mNYpmy2Dr4JjD',1),('pbkdf2_sha256$100000$KNphzulyY3LT$SJ+V7WlOgajeieYuC7EQomF2C8WLeXGYA9yqoYeOaHc=','2018-04-02 20:59:53.032539',7,'user1',NULL,0.00000000,'2018-04-02 17:59:48.155369','gWnJHPwE7nBavLnW',4);
/*!40000 ALTER TABLE `investors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kyc`
--

DROP TABLE IF EXISTS `kyc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kyc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  `firstname` varchar(30) COLLATE utf8_bin NOT NULL,
  `midname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `surname` varchar(30) COLLATE utf8_bin NOT NULL,
  `country` varchar(30) COLLATE utf8_bin NOT NULL,
  `birthdate` date NOT NULL,
  `document_no` varchar(50) COLLATE utf8_bin NOT NULL,
  `photo` varchar(100) COLLATE utf8_bin NOT NULL,
  `selfie` varchar(100) COLLATE utf8_bin NOT NULL,
  `decline_reason` longtext COLLATE utf8_bin,
  `approve_txn_hash` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `investor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `investor_id` (`investor_id`),
  CONSTRAINT `kyc_investor_id_1910e4d7_fk_investors_id` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kyc`
--

LOCK TABLES `kyc` WRITE;
/*!40000 ALTER TABLE `kyc` DISABLE KEYS */;
/*!40000 ALTER TABLE `kyc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mint_log`
--

DROP TABLE IF EXISTS `mint_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mint_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(10) COLLATE utf8_bin NOT NULL,
  `txn_hash` varchar(100) COLLATE utf8_bin NOT NULL,
  `account_to` varchar(100) COLLATE utf8_bin NOT NULL,
  `account_from` varchar(100) COLLATE utf8_bin NOT NULL,
  `value` varchar(100) COLLATE utf8_bin NOT NULL,
  `txn_date` datetime(6) DEFAULT NULL,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  `confirmation_date` datetime(6) DEFAULT NULL,
  `block_hash` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `block_number` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mint_log_currency_txn_hash_8dcafacb_uniq` (`currency`,`txn_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mint_log`
--

LOCK TABLES `mint_log` WRITE;
/*!40000 ALTER TABLE `mint_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `mint_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phases`
--

DROP TABLE IF EXISTS `phases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) COLLATE utf8_bin NOT NULL,
  `begin_date` datetime(6) NOT NULL,
  `end_date` datetime(6) NOT NULL,
  `bonus_percents` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phases`
--

LOCK TABLES `phases` WRITE;
/*!40000 ALTER TABLE `phases` DISABLE KEYS */;
/*!40000 ALTER TABLE `phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_association`
--

DROP TABLE IF EXISTS `social_auth_association`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_association` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_url` varchar(255) COLLATE utf8_bin NOT NULL,
  `handle` varchar(255) COLLATE utf8_bin NOT NULL,
  `secret` varchar(255) COLLATE utf8_bin NOT NULL,
  `issued` int(11) NOT NULL,
  `lifetime` int(11) NOT NULL,
  `assoc_type` varchar(64) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_association_server_url_handle_078befa2_uniq` (`server_url`,`handle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_association`
--

LOCK TABLES `social_auth_association` WRITE;
/*!40000 ALTER TABLE `social_auth_association` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_auth_association` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_code`
--

DROP TABLE IF EXISTS `social_auth_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) COLLATE utf8_bin NOT NULL,
  `code` varchar(32) COLLATE utf8_bin NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_code_email_code_801b2d02_uniq` (`email`,`code`),
  KEY `social_auth_code_code_a2393167` (`code`),
  KEY `social_auth_code_timestamp_176b341f` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_code`
--

LOCK TABLES `social_auth_code` WRITE;
/*!40000 ALTER TABLE `social_auth_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_auth_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_nonce`
--

DROP TABLE IF EXISTS `social_auth_nonce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_nonce` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_url` varchar(255) COLLATE utf8_bin NOT NULL,
  `timestamp` int(11) NOT NULL,
  `salt` varchar(65) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_nonce_server_url_timestamp_salt_f6284463_uniq` (`server_url`,`timestamp`,`salt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_nonce`
--

LOCK TABLES `social_auth_nonce` WRITE;
/*!40000 ALTER TABLE `social_auth_nonce` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_auth_nonce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_partial`
--

DROP TABLE IF EXISTS `social_auth_partial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_partial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(32) COLLATE utf8_bin NOT NULL,
  `next_step` smallint(5) unsigned NOT NULL,
  `backend` varchar(32) COLLATE utf8_bin NOT NULL,
  `data` longtext COLLATE utf8_bin NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `social_auth_partial_token_3017fea3` (`token`),
  KEY `social_auth_partial_timestamp_50f2119f` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_partial`
--

LOCK TABLES `social_auth_partial` WRITE;
/*!40000 ALTER TABLE `social_auth_partial` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_auth_partial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_usersocialauth`
--

DROP TABLE IF EXISTS `social_auth_usersocialauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_usersocialauth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(32) COLLATE utf8_bin NOT NULL,
  `uid` varchar(255) COLLATE utf8_bin NOT NULL,
  `extra_data` longtext COLLATE utf8_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_usersocialauth_provider_uid_e6b5e668_uniq` (`provider`,`uid`),
  KEY `social_auth_usersocialauth_user_id_17d28448_fk_investors_id` (`user_id`),
  CONSTRAINT `social_auth_usersocialauth_user_id_17d28448_fk_investors_id` FOREIGN KEY (`user_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_usersocialauth`
--

LOCK TABLES `social_auth_usersocialauth` WRITE;
/*!40000 ALTER TABLE `social_auth_usersocialauth` DISABLE KEYS */;
INSERT INTO `social_auth_usersocialauth` VALUES (1,'twitter','1240887655','{\"auth_time\": 1522690516, \"id\": 1240887655, \"access_token\": {\"oauth_token\": \"1240887655-5OWWv4P8yePCG3u8D7uYuV5aCZV6ZhPGJcp78s3\", \"oauth_token_secret\": \"4uIEEoIvvwB95HDlNFcXDhxfcyNxIa83Q3wPq4KEB2c3U\", \"user_id\": \"1240887655\", \"screen_name\": \"_pel_men\", \"x_auth_expires\": \"0\"}}',1);
/*!40000 ALTER TABLE `social_auth_usersocialauth` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-02 21:22:17
