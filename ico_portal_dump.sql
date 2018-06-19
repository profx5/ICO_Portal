-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: ico_portal
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu18.04.1

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
  `currency` varchar(5) COLLATE utf8_bin NOT NULL,
  `address` varchar(100) COLLATE utf8_bin NOT NULL,
  `investor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_investor_id_15648101_fk_investors_id` (`investor_id`),
  CONSTRAINT `accounts_investor_id_15648101_fk_investors_id` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'BTC','38D8B642jmf2hKSh6UrpEt6zTb3xebxpaA',1),(2,'LTCT','mogAsfhBipgyiQKeppntzBiv5i9nqfwqWN',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add association',7,'add_association'),(20,'Can change association',7,'change_association'),(21,'Can delete association',7,'delete_association'),(22,'Can add code',8,'add_code'),(23,'Can change code',8,'change_code'),(24,'Can delete code',8,'delete_code'),(25,'Can add nonce',9,'add_nonce'),(26,'Can change nonce',9,'change_nonce'),(27,'Can delete nonce',9,'delete_nonce'),(28,'Can add user social auth',10,'add_usersocialauth'),(29,'Can change user social auth',10,'change_usersocialauth'),(30,'Can delete user social auth',10,'delete_usersocialauth'),(31,'Can add partial',11,'add_partial'),(32,'Can change partial',11,'change_partial'),(33,'Can delete partial',11,'delete_partial'),(34,'Can add account',12,'add_account'),(35,'Can change account',12,'change_account'),(36,'Can delete account',12,'delete_account'),(37,'Can add events processing',13,'add_eventsprocessing'),(38,'Can change events processing',13,'change_eventsprocessing'),(39,'Can delete events processing',13,'delete_eventsprocessing'),(40,'Can add exchange rate',14,'add_exchangerate'),(41,'Can change exchange rate',14,'change_exchangerate'),(42,'Can delete exchange rate',14,'delete_exchangerate'),(43,'Can add ic o_ info',15,'add_ico_info'),(44,'Can change ic o_ info',15,'change_ico_info'),(45,'Can delete ic o_ info',15,'delete_ico_info'),(46,'Can add investor',16,'add_investor'),(47,'Can change investor',16,'change_investor'),(48,'Can delete investor',16,'delete_investor'),(49,'Can add KYC',17,'add_kyc'),(50,'Can change KYC',17,'change_kyc'),(51,'Can delete KYC',17,'delete_kyc'),(52,'Can add payment',18,'add_payment'),(53,'Can change payment',18,'change_payment'),(54,'Can delete payment',18,'delete_payment'),(55,'Can add phase',19,'add_phase'),(56,'Can change phase',19,'change_phase'),(57,'Can delete phase',19,'delete_phase'),(58,'Can add tokens move',20,'add_tokensmove'),(59,'Can change tokens move',20,'change_tokensmove'),(60,'Can delete tokens move',20,'delete_tokensmove'),(61,'Can add transaction',21,'add_transaction'),(62,'Can change transaction',21,'change_transaction'),(63,'Can delete transaction',21,'delete_transaction'),(64,'Can add transfer',22,'add_transfer'),(65,'Can change transfer',22,'change_transfer'),(66,'Can delete transfer',22,'delete_transfer');
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
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$100000$44XvvD0VGTdm$whb4Dj6YM9WNDwExHWGgkUbn68cmxiApwAXa31CKMdg=','2018-06-18 19:44:45.995604',1,'admin','','','',1,1,'2018-06-18 19:44:08.085425');
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
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2018-06-18 19:46:52.447878','1','KYC for Roman Vladimirovich Nesytov',1,'[{\"added\": {}}]',17,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(7,'social_django','association'),(8,'social_django','code'),(9,'social_django','nonce'),(11,'social_django','partial'),(10,'social_django','usersocialauth'),(12,'user_office','account'),(13,'user_office','eventsprocessing'),(14,'user_office','exchangerate'),(15,'user_office','ico_info'),(16,'user_office','investor'),(17,'user_office','kyc'),(18,'user_office','payment'),(19,'user_office','phase'),(20,'user_office','tokensmove'),(21,'user_office','transaction'),(22,'user_office','transfer');
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2018-06-18 19:43:34.747174'),(2,'auth','0001_initial','2018-06-18 19:43:35.137256'),(3,'admin','0001_initial','2018-06-18 19:43:35.224594'),(4,'admin','0002_logentry_remove_auto_add','2018-06-18 19:43:35.236956'),(5,'contenttypes','0002_remove_content_type_name','2018-06-18 19:43:35.293492'),(6,'auth','0002_alter_permission_name_max_length','2018-06-18 19:43:35.344092'),(7,'auth','0003_alter_user_email_max_length','2018-06-18 19:43:35.380116'),(8,'auth','0004_alter_user_username_opts','2018-06-18 19:43:35.388758'),(9,'auth','0005_alter_user_last_login_null','2018-06-18 19:43:35.422523'),(10,'auth','0006_require_contenttypes_0002','2018-06-18 19:43:35.424523'),(11,'auth','0007_alter_validators_add_error_messages','2018-06-18 19:43:35.431759'),(12,'auth','0008_alter_user_username_max_length','2018-06-18 19:43:35.472747'),(13,'auth','0009_alter_user_last_name_max_length','2018-06-18 19:43:35.505623'),(14,'sessions','0001_initial','2018-06-18 19:43:35.551309'),(15,'user_office','0001_initial','2018-06-18 19:43:36.170227'),(16,'default','0001_initial','2018-06-18 19:43:36.750020'),(17,'social_auth','0001_initial','2018-06-18 19:43:36.764790'),(18,'default','0002_add_related_name','2018-06-18 19:43:36.936536'),(19,'social_auth','0002_add_related_name','2018-06-18 19:43:36.940117'),(20,'default','0003_alter_email_max_length','2018-06-18 19:43:37.048755'),(21,'social_auth','0003_alter_email_max_length','2018-06-18 19:43:37.061735'),(22,'default','0004_auto_20160423_0400','2018-06-18 19:43:37.080329'),(23,'social_auth','0004_auto_20160423_0400','2018-06-18 19:43:37.094722'),(24,'social_auth','0005_auto_20160727_2333','2018-06-18 19:43:37.159402'),(25,'social_django','0006_partial','2018-06-18 19:43:37.267429'),(26,'social_django','0007_code_timestamp','2018-06-18 19:43:37.417468'),(27,'social_django','0008_partial_timestamp','2018-06-18 19:43:37.654768'),(28,'social_django','0002_add_related_name','2018-06-18 19:43:37.670986'),(29,'social_django','0001_initial','2018-06-18 19:43:37.675214'),(30,'social_django','0005_auto_20160727_2333','2018-06-18 19:43:37.686088'),(31,'social_django','0004_auto_20160423_0400','2018-06-18 19:43:37.688832'),(32,'social_django','0003_alter_email_max_length','2018-06-18 19:43:37.699022');
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
INSERT INTO `django_session` VALUES ('035luvancs6czhy18j403767rfyyke1m','MTdhMjhjYzc1NzM4NGM1ZTYxMjJlZTAyMGI0ZWJhYTk3ZGJmY2MwYzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkVtYWlsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjFlMzg1ZGEyM2FkMWQxOGVlMTg1OTMxNTlhNDBhNjQ3OGIzOTk4MjYifQ==','2018-07-03 20:02:42.875910'),('2dgtoh0eyclidizwffq0671zt7xoezzl','YTFmZmI1YjNkNzY0ZWZiYjNhN2UwMDU4NzM1M2U4NDdiM2YwYjAwOTp7InBhcnRpYWxfcGlwZWxpbmVfdG9rZW4iOiIwMDM2NTRiYWZiNWY0ZDJhYjg3ZmY4N2EzMDJkYjM5MiIsIl9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoic29jaWFsX2NvcmUuYmFja2VuZHMuZW1haWwuRW1haWxBdXRoIiwiX2F1dGhfdXNlcl9oYXNoIjoiMWUzODVkYTIzYWQxZDE4ZWUxODU5MzE1OWE0MGE2NDc4YjM5OTgyNiIsInNvY2lhbF9hdXRoX2xhc3RfbG9naW5fYmFja2VuZCI6ImVtYWlsIn0=','2018-07-02 19:45:31.229756'),('4hukfa5kqakva8n1uidqmjmqz1rftsqe','MjIzYTlhOWZiZjBjYmMzMDEyMGJmZmFhOGYwNWRlYmIyNDI0OTFlODp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYzQyMWMxZTc2MTkwNjRhNWM0ZDYyZThmZGEwZmUwYzYyMDQyY2QwIn0=','2018-07-02 19:44:45.999218'),('hbnwpensyqdsgg8w25xuv6jw7v49kw7b','MTdhMjhjYzc1NzM4NGM1ZTYxMjJlZTAyMGI0ZWJhYTk3ZGJmY2MwYzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkVtYWlsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjFlMzg1ZGEyM2FkMWQxOGVlMTg1OTMxNTlhNDBhNjQ3OGIzOTk4MjYifQ==','2018-07-02 19:56:31.968684');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_processing`
--

DROP TABLE IF EXISTS `events_processing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events_processing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filter_id` varchar(100) COLLATE utf8_bin NOT NULL,
  `from_block` int(11) NOT NULL,
  `last_processed_block` int(11) DEFAULT NULL,
  `last_update_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_processing`
--

LOCK TABLES `events_processing` WRITE;
/*!40000 ALTER TABLE `events_processing` DISABLE KEYS */;
INSERT INTO `events_processing` VALUES (1,'0xb66bc463153165aa06141f845df49377',0,2490472,'2018-06-19 16:52:56.336268');
/*!40000 ALTER TABLE `events_processing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchange_rates`
--

DROP TABLE IF EXISTS `exchange_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchange_rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(5) COLLATE utf8_bin NOT NULL,
  `creation_date` datetime(6) NOT NULL,
  `rate` decimal(32,5) NOT NULL,
  `timestamp` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange_rates`
--

LOCK TABLES `exchange_rates` WRITE;
/*!40000 ALTER TABLE `exchange_rates` DISABLE KEYS */;
INSERT INTO `exchange_rates` VALUES (1,'ETH','2018-06-19 16:36:26.200144',532.58421,1529426162),(2,'LTC','2018-06-19 16:36:26.300390',98.04973,1529426162),(3,'BTC','2018-06-19 16:36:26.407252',6724.15692,1529426162),(4,'DASH','2018-06-19 16:36:26.505444',261.46747,1529426162),(5,'ETH','2018-06-19 16:41:26.160594',531.47270,1529426461),(6,'LTC','2018-06-19 16:41:26.265165',97.87245,1529426461),(7,'BTC','2018-06-19 16:41:26.382272',6721.66991,1529426461),(8,'DASH','2018-06-19 16:41:26.529250',260.97976,1529426461),(9,'ETH','2018-06-19 16:46:26.141171',531.53031,1529426762),(10,'LTC','2018-06-19 16:46:26.305799',97.88573,1529426762),(11,'BTC','2018-06-19 16:46:26.404763',6720.29557,1529426762),(12,'DASH','2018-06-19 16:46:26.507269',260.80601,1529426762),(13,'ETH','2018-06-19 16:47:50.639639',531.52603,1529426821),(14,'LTC','2018-06-19 16:47:50.740827',97.86509,1529426821),(15,'BTC','2018-06-19 16:47:50.918508',6720.68179,1529426821),(16,'DASH','2018-06-19 16:47:51.011476',260.80486,1529426821),(17,'ETH','2018-06-19 16:51:20.009417',532.28227,1529427061),(18,'LTC','2018-06-19 16:51:20.226227',97.92735,1529427061),(19,'BTC','2018-06-19 16:51:20.400793',6722.15653,1529427061),(20,'DASH','2018-06-19 16:51:20.547177',260.79886,1529427061),(21,'ETH','2018-06-19 16:51:26.218620',532.28227,1529427061),(22,'LTC','2018-06-19 16:51:26.324793',97.92735,1529427061),(23,'BTC','2018-06-19 16:51:26.424207',6722.15653,1529427061),(24,'DASH','2018-06-19 16:51:26.524458',260.79886,1529427061),(25,'ETH','2018-06-19 16:56:26.223829',531.80308,1529427361),(26,'LTC','2018-06-19 16:56:26.405134',97.89217,1529427361),(27,'BTC','2018-06-19 16:56:26.509393',6728.69012,1529427361),(28,'DASH','2018-06-19 16:56:26.874986',261.37959,1529427361),(29,'ETH','2018-06-19 17:01:26.297504',531.83716,1529427661),(30,'LTC','2018-06-19 17:01:26.397882',97.92875,1529427601),(31,'BTC','2018-06-19 17:01:26.564636',6731.57841,1529427661),(32,'DASH','2018-06-19 17:01:26.664806',261.53364,1529427661),(33,'ETH','2018-06-19 17:06:26.696073',532.63882,1529427901),(34,'LTC','2018-06-19 17:06:26.804423',97.95754,1529427901),(35,'BTC','2018-06-19 17:06:26.993734',6731.16549,1529427962),(36,'DASH','2018-06-19 17:06:27.174090',261.56756,1529427962),(37,'ETH','2018-06-19 17:11:26.789269',533.65189,1529428261),(38,'LTC','2018-06-19 17:11:26.891935',98.36669,1529428201),(39,'BTC','2018-06-19 17:11:27.080209',6743.02763,1529428261),(40,'DASH','2018-06-19 17:11:27.252553',262.35966,1529428261);
/*!40000 ALTER TABLE `exchange_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ico_info`
--

DROP TABLE IF EXISTS `ico_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ico_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `total_supply` decimal(65,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ico_info`
--

LOCK TABLES `ico_info` WRITE;
/*!40000 ALTER TABLE `ico_info` DISABLE KEYS */;
INSERT INTO `ico_info` VALUES (1,'2018-06-19 16:51:26.109188',1305698),(2,'2018-06-19 16:56:26.044448',1382719),(3,'2018-06-19 17:01:26.098089',1382719),(4,'2018-06-19 17:06:26.572464',1382719),(5,'2018-06-19 17:11:26.683501',1382719);
/*!40000 ALTER TABLE `ico_info` ENABLE KEYS */;
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
  `email` varchar(254) COLLATE utf8_bin DEFAULT NULL,
  `eth_account` varchar(42) COLLATE utf8_bin DEFAULT NULL,
  `tokens_amount` decimal(65,0) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `referral_id` varchar(16) COLLATE utf8_bin NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `referrer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `referral_id` (`referral_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `eth_account` (`eth_account`),
  KEY `investors_referrer_id_fe866d5b_fk_investors_id` (`referrer_id`),
  CONSTRAINT `investors_referrer_id_fe866d5b_fk_investors_id` FOREIGN KEY (`referrer_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investors`
--

LOCK TABLES `investors` WRITE;
/*!40000 ALTER TABLE `investors` DISABLE KEYS */;
INSERT INTO `investors` VALUES ('pbkdf2_sha256$100000$Nr1iz2AYgKV8$i/bJL2ad0JePdMpT74OOsEYfOWqKjaSb0dkEBU+HHUo=','2018-06-19 20:02:42.850415',1,'gordon@ongrid.pro','0xB0a3f48478d84a497f930d8455711d9981B66a70',779104,'2018-06-18 16:45:30.993391','p67gIuN5SW4Wgl6G',1,NULL);
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
  `user_photo` varchar(100) COLLATE utf8_bin NOT NULL,
  `firstname` varchar(30) COLLATE utf8_bin NOT NULL,
  `midname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `surname` varchar(30) COLLATE utf8_bin NOT NULL,
  `gender` varchar(1) COLLATE utf8_bin NOT NULL,
  `birthdate` date NOT NULL,
  `country` varchar(50) COLLATE utf8_bin NOT NULL,
  `city` varchar(50) COLLATE utf8_bin NOT NULL,
  `registration_address` varchar(500) COLLATE utf8_bin NOT NULL,
  `postcode` varchar(10) COLLATE utf8_bin NOT NULL,
  `document_type` varchar(50) COLLATE utf8_bin NOT NULL,
  `document_no` varchar(50) COLLATE utf8_bin NOT NULL,
  `document_country` varchar(50) COLLATE utf8_bin NOT NULL,
  `document_date` date NOT NULL,
  `document_photo` varchar(100) COLLATE utf8_bin NOT NULL,
  `decline_reason` longtext COLLATE utf8_bin,
  `approve_txn_id` char(32) COLLATE utf8_bin DEFAULT NULL,
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
INSERT INTO `kyc` VALUES (1,'APPROVED','kyc/1/selfie/download.jpeg','Roman','Vladimirovich','Nesytov','M','2018-06-18','Russia','Moscow','4922','124482','Passport','123123','Russia','2018-06-18','kyc/1/photo/download.jpeg','','73c0485724f54f3db00563e5426783cf',1);
/*!40000 ALTER TABLE `kyc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currency` varchar(5) COLLATE utf8_bin NOT NULL,
  `payer_account` varchar(50) COLLATE utf8_bin NOT NULL,
  `amount` decimal(65,18) NOT NULL,
  `amounti` decimal(65,0) NOT NULL,
  `external_id` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `txn_id` varchar(100) COLLATE utf8_bin NOT NULL,
  `received_at` datetime(6) NOT NULL,
  `tokens_move_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_tokens_move_id_8d316d9f_fk_tokens_moves_id` (`tokens_move_id`),
  CONSTRAINT `payments_tokens_move_id_8d316d9f_fk_tokens_moves_id` FOREIGN KEY (`tokens_move_id`) REFERENCES `tokens_moves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.230000000000000000,1230000000000000000,NULL,'0x3528ca76a93a02edd1f0b4aace3e45e63cd3d3ff277870e8d661a798a71f85e8','2018-06-19 16:32:13.089764',3),(2,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x4a20c3d5445fec65d5cbf1bdcf82f3aa54838ad1cf7e3019229d0980bceee0f4','2018-06-19 16:32:13.330672',10),(3,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x3893af392eeefa2cb606cd4ef00eccf86bfde80856ed27396770586cef3d7541','2018-06-19 16:32:14.784207',40),(4,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',0.100000000000000000,100000000000000000,NULL,'0x03059d2153218d04f15963d1875af3aeeab4d54e4eea317428916555f0f13f72','2018-06-19 16:32:15.668853',58),(5,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',0.100000000000000000,100000000000000000,NULL,'0x7137e18890be5985475dc7a86182c7747be62c4e647cf48092c635d1fb3f34fc','2018-06-19 16:32:15.723393',59),(6,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',0.500000000000000000,500000000000000000,NULL,'0x6638e6f4a63154a41bf8ca79d8fcab6cbd291744f5db8fa8eca4dd81a1e31fce','2018-06-19 16:32:15.768108',60),(7,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',0.500000000000000000,500000000000000000,NULL,'0x1c14226c21b16aca553378cd254fa41076cad29a46b56daa78fa53446fe67ae7','2018-06-19 16:32:15.825406',61),(8,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x675a4aa4003b2b3ceedcc7c3e0ecedfbd58f24f326592ee023222addb0dc68ad','2018-06-19 16:32:15.872503',62),(9,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x9a46b3843315cc999c54a7f531d5827af64c187269a7b9359030611092dc257b','2018-06-19 16:32:16.148113',68),(10,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.800000000000000000,1800000000000000000,NULL,'0x83642da93fe064ccbde86dc83f1e7871fbc57cf07a03e33e11e1171f2a520190','2018-06-19 16:32:16.802830',82),(11,'ETH','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',1.000000000000000000,1000000000000000000,NULL,'0x6522b59161779c8a87706e11095af7649bbf588a7088f30c9a9c3f40440281d5','2018-06-19 16:32:17.864681',108),(12,'ETH','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',1.000000000000000000,1000000000000000000,NULL,'0x07d69732220cbb3c0bc2e6786eb36f5f216d71cb195ae45f335af0e908f4d9f2','2018-06-19 16:32:17.909239',110),(13,'ETH','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',1.000000000000000000,1000000000000000000,NULL,'0xb806323772cc21ffe4000ca338038b058d73b975fb6594fc800e8fc863a2f5d7','2018-06-19 16:32:17.948103',112),(14,'ETH','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',1.000000000000000000,1000000000000000000,NULL,'0xc5820603ab479c8bfdbd57dc4585cdacbbffdd061b6ed0efebfdf5c2783a6612','2018-06-19 16:32:17.951279',113),(15,'ETH','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',1.000000000000000000,1000000000000000000,NULL,'0xc1ad3bf990668a3c90ed2758084081cbb23505d56b6635fbb26b3e40588d8fb5','2018-06-19 16:32:17.972827',114),(16,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0xd7afdc04ef2e34e6721ae5f3ff97ce982e7be89358a8313dbab4ab06bbd8d049','2018-06-19 16:52:56.468711',117);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
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
  `hard_cap` decimal(65,0) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_code`
--

LOCK TABLES `social_auth_code` WRITE;
/*!40000 ALTER TABLE `social_auth_code` DISABLE KEYS */;
INSERT INTO `social_auth_code` VALUES (1,'r.nesytov@ongrid.pro','e0d79c8f27b74e478a676544b5f464ba',1,'2018-06-18 19:45:12.533668');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_partial`
--

LOCK TABLES `social_auth_partial` WRITE;
/*!40000 ALTER TABLE `social_auth_partial` DISABLE KEYS */;
INSERT INTO `social_auth_partial` VALUES (1,'003654bafb5f4d2ab87ff87a302db392',4,'email','{\"args\": [], \"kwargs\": {\"password\": \"q123q123q123\", \"response\": {\"email\": [\"r.nesytov@ongrid.pro\"], \"password1\": [\"q123q123q123\"], \"password2\": [\"q123q123q123\"], \"g-recaptcha-response\": [\"03ACgFB9vMux03ChzSoEPwDxYPbr2kChNQjR2PryVngjffb6bCOOL4ZITMw81B54WvBVbEp0N-49HNeain1kNrO_iJe20w6uuG891SQP_uYzmdyzNzMd4Ix7i43LM78TwZIM36OESGtfJb6wUQoWjp-m1djrxmSbnyQ1H_OSxZtsawjavya8CdNHOL42aSYsC0-Riw33rGSUOlAe1AVO-SnmA6c-tLz1itSdfFTRsB0u0SrMv7vpFYS0nnpW468ivo_ETSlgzl8Riz0JAqOF_e7WQZCT86llSiVpF5QQSaJLLVSZBseluILSATT7zsjtBGgkyO4d3HNSGeHc17shBOtb44WVA1ydCo5QTJWCtWya1tyMC5gliPCLYkdJ7xeJrBaylqtFsTBrCnHD-k5TgPgguA5lbZ_ALazffY9pMctIrwHLw-pE1UBOuR_SHplaUQosLfdOTVnNkT\"], \"csrfmiddlewaretoken\": [\"N5wWaZL8tYCS7GaRXtsTwQCsLAGJhdNLHtlx6Gq1PrmTGPjBPddfYhadM8CcOJAk\"]}, \"is_new\": true, \"details\": {\"username\": \"r.nesytov\", \"email\": \"r.nesytov@ongrid.pro\", \"fullname\": \"\", \"first_name\": \"\", \"last_name\": \"\"}, \"uid\": \"r.nesytov@ongrid.pro\", \"new_association\": true, \"username\": null, \"user\": null, \"social\": null}}','2018-06-18 19:45:15.291178');
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
INSERT INTO `social_auth_usersocialauth` VALUES (1,'email','r.nesytov@ongrid.pro','{}',1);
/*!40000 ALTER TABLE `social_auth_usersocialauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens_moves`
--

DROP TABLE IF EXISTS `tokens_moves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens_moves` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(65,0) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `actualized_at` datetime(6) DEFAULT NULL,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  `direction` varchar(3) COLLATE utf8_bin NOT NULL,
  `investor_account` varchar(42) COLLATE utf8_bin NOT NULL,
  `transfer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tokens_moves_investor_account_e31641e0` (`investor_account`),
  KEY `tokens_moves_transfer_id_48e7ff8b_fk_transfers_id` (`transfer_id`),
  CONSTRAINT `tokens_moves_transfer_id_48e7ff8b_fk_transfers_id` FOREIGN KEY (`transfer_id`) REFERENCES `transfers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens_moves`
--

LOCK TABLES `tokens_moves` WRITE;
/*!40000 ALTER TABLE `tokens_moves` DISABLE KEYS */;
INSERT INTO `tokens_moves` VALUES (1,90000,'2018-06-19 16:32:12.980141','2018-06-19 16:32:12.980250','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',1),(2,90000,'2018-06-19 16:32:12.984486','2018-06-19 16:32:12.984527','ACTUAL','OUT','0xB0a3f48478d84a497f930d8455711d9981B66a70',1),(3,94735,'2018-06-19 16:32:12.992586','2018-06-19 16:32:12.992750','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',4),(4,4000,'2018-06-19 16:32:13.004973','2018-06-19 16:32:13.005164','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',3),(5,0,'2018-06-19 16:32:13.004921','2018-06-19 16:32:13.005148','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',2),(6,4000,'2018-06-19 16:32:13.011974','2018-06-19 16:32:13.012062','ACTUAL','OUT','0xB0a3f48478d84a497f930d8455711d9981B66a70',3),(7,100000,'2018-06-19 16:32:13.035378','2018-06-19 16:32:13.035447','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',5),(8,4000,'2018-06-19 16:32:13.110911','2018-06-19 16:32:13.110965','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',6),(9,4000,'2018-06-19 16:32:13.116293','2018-06-19 16:32:13.116379','ACTUAL','OUT','0xB0a3f48478d84a497f930d8455711d9981B66a70',6),(10,77021,'2018-06-19 16:32:13.131189','2018-06-19 16:32:13.131238','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',7),(11,1995,'2018-06-19 16:32:13.193280','2018-06-19 16:32:13.193315','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',8),(12,1995,'2018-06-19 16:32:13.260824','2018-06-19 16:32:13.260873','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',9),(13,1995,'2018-06-19 16:32:13.270079','2018-06-19 16:32:13.270147','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',10),(14,1995,'2018-06-19 16:32:13.352339','2018-06-19 16:32:13.352397','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',11),(15,1995,'2018-06-19 16:32:13.399540','2018-06-19 16:32:13.399607','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',12),(16,1995,'2018-06-19 16:32:13.444569','2018-06-19 16:32:13.444620','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',13),(17,1995,'2018-06-19 16:32:13.484639','2018-06-19 16:32:13.484699','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',14),(18,1995,'2018-06-19 16:32:13.526119','2018-06-19 16:32:13.526171','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',15),(19,1995,'2018-06-19 16:32:13.577482','2018-06-19 16:32:13.577532','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',16),(20,1994,'2018-06-19 16:32:13.623517','2018-06-19 16:32:13.623583','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',17),(21,1994,'2018-06-19 16:32:13.661570','2018-06-19 16:32:13.661619','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',18),(22,1994,'2018-06-19 16:32:13.704277','2018-06-19 16:32:13.704331','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',19),(23,1994,'2018-06-19 16:32:13.751066','2018-06-19 16:32:13.751134','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',20),(24,1994,'2018-06-19 16:32:13.805200','2018-06-19 16:32:13.805257','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',21),(25,1994,'2018-06-19 16:32:13.852459','2018-06-19 16:32:13.852518','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',22),(26,1994,'2018-06-19 16:32:13.900363','2018-06-19 16:32:13.900430','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',23),(27,1994,'2018-06-19 16:32:13.936340','2018-06-19 16:32:13.936392','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',24),(28,1994,'2018-06-19 16:32:13.977338','2018-06-19 16:32:13.977407','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',25),(29,1994,'2018-06-19 16:32:14.023517','2018-06-19 16:32:14.023566','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',26),(30,1994,'2018-06-19 16:32:14.090078','2018-06-19 16:32:14.090139','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',27),(31,1994,'2018-06-19 16:32:14.135211','2018-06-19 16:32:14.135265','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',28),(32,1994,'2018-06-19 16:32:14.182464','2018-06-19 16:32:14.182520','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',29),(33,1994,'2018-06-19 16:32:14.232216','2018-06-19 16:32:14.232266','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',30),(34,2287,'2018-06-19 16:32:14.280303','2018-06-19 16:32:14.280354','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',31),(35,2287,'2018-06-19 16:32:14.334265','2018-06-19 16:32:14.334332','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',32),(36,2287,'2018-06-19 16:32:14.386098','2018-06-19 16:32:14.386183','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',33),(37,2287,'2018-06-19 16:32:14.421912','2018-06-19 16:32:14.421963','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',34),(38,1923,'2018-06-19 16:32:14.481535','2018-06-19 16:32:14.481583','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',35),(39,1923,'2018-06-19 16:32:14.534035','2018-06-19 16:32:14.534090','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',36),(40,77021,'2018-06-19 16:32:14.585317','2018-06-19 16:32:14.585364','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',37),(41,1994,'2018-06-19 16:32:14.641331','2018-06-19 16:32:14.641401','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',38),(42,1994,'2018-06-19 16:32:14.686163','2018-06-19 16:32:14.686223','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',39),(43,1994,'2018-06-19 16:32:14.740572','2018-06-19 16:32:14.740632','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',40),(44,1994,'2018-06-19 16:32:14.806069','2018-06-19 16:32:14.806151','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',41),(45,1994,'2018-06-19 16:32:14.859787','2018-06-19 16:32:14.859892','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',42),(46,1994,'2018-06-19 16:32:14.907857','2018-06-19 16:32:14.907905','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',43),(47,1994,'2018-06-19 16:32:14.962705','2018-06-19 16:32:14.962755','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',44),(48,1994,'2018-06-19 16:32:15.015688','2018-06-19 16:32:15.015757','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',45),(49,1994,'2018-06-19 16:32:15.067411','2018-06-19 16:32:15.067471','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',46),(50,1994,'2018-06-19 16:32:15.120061','2018-06-19 16:32:15.120111','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',47),(51,1994,'2018-06-19 16:32:15.167411','2018-06-19 16:32:15.167475','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',48),(52,1994,'2018-06-19 16:32:15.204802','2018-06-19 16:32:15.204858','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',49),(53,1994,'2018-06-19 16:32:15.255205','2018-06-19 16:32:15.255264','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',50),(54,1994,'2018-06-19 16:32:15.298519','2018-06-19 16:32:15.298599','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',51),(55,1994,'2018-06-19 16:32:15.351033','2018-06-19 16:32:15.351101','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',52),(56,1994,'2018-06-19 16:32:15.396897','2018-06-19 16:32:15.396952','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',53),(57,1994,'2018-06-19 16:32:15.452447','2018-06-19 16:32:15.452517','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',54),(58,7702,'2018-06-19 16:32:15.490579','2018-06-19 16:32:15.490631','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',55),(59,7702,'2018-06-19 16:32:15.543314','2018-06-19 16:32:15.543379','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',56),(60,38510,'2018-06-19 16:32:15.587791','2018-06-19 16:32:15.587852','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',57),(61,38510,'2018-06-19 16:32:15.632398','2018-06-19 16:32:15.632447','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',58),(62,77021,'2018-06-19 16:32:15.687067','2018-06-19 16:32:15.687103','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',59),(63,1994,'2018-06-19 16:32:15.742819','2018-06-19 16:32:15.742856','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',60),(64,1994,'2018-06-19 16:32:15.789008','2018-06-19 16:32:15.789108','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',61),(65,1994,'2018-06-19 16:32:15.846436','2018-06-19 16:32:15.846510','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',62),(66,1994,'2018-06-19 16:32:15.890425','2018-06-19 16:32:15.890469','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',63),(67,1994,'2018-06-19 16:32:15.950296','2018-06-19 16:32:15.950375','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',64),(68,77021,'2018-06-19 16:32:15.988467','2018-06-19 16:32:15.988527','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',65),(69,1994,'2018-06-19 16:32:16.031512','2018-06-19 16:32:16.031578','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',66),(70,1994,'2018-06-19 16:32:16.067967','2018-06-19 16:32:16.068027','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',67),(71,1994,'2018-06-19 16:32:16.106803','2018-06-19 16:32:16.106861','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',68),(72,1994,'2018-06-19 16:32:16.169466','2018-06-19 16:32:16.169513','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',69),(73,1994,'2018-06-19 16:32:16.220937','2018-06-19 16:32:16.221032','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',70),(74,1994,'2018-06-19 16:32:16.264186','2018-06-19 16:32:16.264238','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',71),(75,1994,'2018-06-19 16:32:16.318184','2018-06-19 16:32:16.318248','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',72),(76,1703,'2018-06-19 16:32:16.357364','2018-06-19 16:32:16.357418','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',73),(77,1703,'2018-06-19 16:32:16.408355','2018-06-19 16:32:16.408415','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',74),(78,1703,'2018-06-19 16:32:16.456673','2018-06-19 16:32:16.456769','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',75),(79,170,'2018-06-19 16:32:16.580903','2018-06-19 16:32:16.580965','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',77),(80,1703,'2018-06-19 16:32:16.583362','2018-06-19 16:32:16.583425','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',76),(81,478,'2018-06-19 16:32:16.590901','2018-06-19 16:32:16.590964','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',78),(82,138637,'2018-06-19 16:32:16.629433','2018-06-19 16:32:16.629490','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',79),(83,479,'2018-06-19 16:32:16.669605','2018-06-19 16:32:16.669676','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',80),(84,1693,'2018-06-19 16:32:16.720005','2018-06-19 16:32:16.720061','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',81),(85,100000,'2018-06-19 16:32:16.763215','2018-06-19 16:32:16.763283','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',82),(86,100000,'2018-06-19 16:32:16.767465','2018-06-19 16:32:16.767506','ACTUAL','OUT','0xB0a3f48478d84a497f930d8455711d9981B66a70',82),(87,1994,'2018-06-19 16:32:16.824403','2018-06-19 16:32:16.824461','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',83),(88,1994,'2018-06-19 16:32:16.877957','2018-06-19 16:32:16.878026','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',84),(89,1994,'2018-06-19 16:32:16.936501','2018-06-19 16:32:16.936569','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',85),(90,1994,'2018-06-19 16:32:16.941218','2018-06-19 16:32:16.941280','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',86),(91,1994,'2018-06-19 16:32:16.995165','2018-06-19 16:32:16.995214','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',87),(92,1994,'2018-06-19 16:32:17.048691','2018-06-19 16:32:17.048747','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',88),(93,1994,'2018-06-19 16:32:17.097034','2018-06-19 16:32:17.097075','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',89),(94,1994,'2018-06-19 16:32:17.144504','2018-06-19 16:32:17.144555','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',90),(95,1994,'2018-06-19 16:32:17.194102','2018-06-19 16:32:17.194148','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',91),(96,1994,'2018-06-19 16:32:17.245943','2018-06-19 16:32:17.245998','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',92),(97,1994,'2018-06-19 16:32:17.300088','2018-06-19 16:32:17.300143','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',93),(98,1994,'2018-06-19 16:32:17.355445','2018-06-19 16:32:17.355517','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',94),(99,1994,'2018-06-19 16:32:17.405169','2018-06-19 16:32:17.405222','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',95),(100,1994,'2018-06-19 16:32:17.460287','2018-06-19 16:32:17.460354','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',96),(101,1994,'2018-06-19 16:32:17.510293','2018-06-19 16:32:17.510368','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',97),(102,1994,'2018-06-19 16:32:17.558622','2018-06-19 16:32:17.558692','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',98),(103,1994,'2018-06-19 16:32:17.608182','2018-06-19 16:32:17.608240','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',99),(104,1994,'2018-06-19 16:32:17.652970','2018-06-19 16:32:17.653039','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',100),(105,1994,'2018-06-19 16:32:17.706259','2018-06-19 16:32:17.706314','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',101),(106,10000,'2018-06-19 16:32:17.760433','2018-06-19 16:32:17.760488','ACTUAL','IN','0x73015966604928A312F79F7E69291a656Cb88602',102),(107,10000,'2018-06-19 16:32:17.812451','2018-06-19 16:32:17.812512','ACTUAL','IN','0x73015966604928A312F79F7E69291a656Cb88602',103),(108,77021,'2018-06-19 16:32:17.821971','2018-06-19 16:32:17.822023','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',104),(109,170,'2018-06-19 16:32:17.855519','2018-06-19 16:32:17.855567','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',105),(110,77021,'2018-06-19 16:32:17.867122','2018-06-19 16:32:17.867171','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',106),(111,170,'2018-06-19 16:32:17.887608','2018-06-19 16:32:17.887669','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',107),(112,77021,'2018-06-19 16:32:17.896945','2018-06-19 16:32:17.897015','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',108),(113,77021,'2018-06-19 16:32:17.912812','2018-06-19 16:32:17.912865','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',109),(114,77021,'2018-06-19 16:32:17.928543','2018-06-19 16:32:17.928586','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',110),(115,170,'2018-06-19 16:32:17.949422','2018-06-19 16:32:17.949473','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',111),(116,1994,'2018-06-19 16:32:17.965468','2018-06-19 16:32:17.965519','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',112),(117,77021,'2018-06-19 16:52:56.380870','2018-06-19 16:52:56.381018','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',113);
/*!40000 ALTER TABLE `tokens_moves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` varchar(1000) COLLATE utf8_bin NOT NULL,
  `nonce` int(11) DEFAULT NULL,
  `value` decimal(50,0) NOT NULL,
  `from_account` varchar(42) COLLATE utf8_bin DEFAULT NULL,
  `to_account` varchar(42) COLLATE utf8_bin NOT NULL,
  `gas` int(11) NOT NULL,
  `gas_price` decimal(50,0) DEFAULT NULL,
  `txn_hash` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `block_number` int(11) DEFAULT NULL,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  `fail_reason` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `txn_id` char(32) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `txn_hash` (`txn_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'0xeb931024000000000000000000000000b0a3f48478d84a497f930d8455711d9981b66a70',247,0,'0x73015966604928A312F79F7E69291a656Cb88602','0x703941C626999Ede2F1630ea95AFCcB6b96a3857',50000,5000000000,'0xf12948fccd4fad2d4a37dc5bd3690facdb60513d0994f85fec3b856225b1e3f8',2490391,'MINED',NULL,'2018-06-18 16:47:11.345055','73c0485724f54f3db00563e5426783cf'),(2,'0xeb931024000000000000000000000000b0a3f48478d84a497f930d8455711d9981b66a70',248,0,'0x73015966604928A312F79F7E69291a656Cb88602','0x703941C626999Ede2F1630ea95AFCcB6b96a3857',50000,5000000000,'0xe64da4251b66605b7d2550d1fa3b854e3b35642c12b0b7576b538cf0e2b23978',NULL,'FAILED','Other transaction with txn_hash=0xf12948fccd4fad2d4a37dc5bd3690facdb60513d0994f85fec3b856225b1e3f8 already mined','2018-06-19 16:32:26.050939','73c0485724f54f3db00563e5426783cf');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfers`
--

DROP TABLE IF EXISTS `transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transfers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `txn_hash` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `mint_txn_id` char(32) COLLATE utf8_bin DEFAULT NULL,
  `to_account` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `from_account` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `amount` decimal(65,0) DEFAULT NULL,
  `block_hash` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `block_number` int(10) unsigned DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `actualized_at` datetime(6) DEFAULT NULL,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `txn_hash` (`txn_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfers`
--

LOCK TABLES `transfers` WRITE;
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` VALUES (1,'0xd04dff3daa89a5898793cd426e95e2ed39d1cccc19e1213e815aca97a0d9c0f0',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0xB0a3f48478d84a497f930d8455711d9981B66a70',90000,'0x59e0d99753a0c4e40aa5374dadf1ea8dbab7be5c34b626e82d749167b21419c4',2241352,'2018-06-19 16:31:56.710861','2018-06-19 16:32:12.977028','ACTUAL'),(2,'0x0ec78427e0fdb5d5fe9fb24f907ea9b3704775b720f1fee3c447ad28e276293f',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',0,'0x075bbabeb4998df622dfe199957483e334e4a33e4501efcc966b1882f4bfb8d2',2224277,'2018-06-19 16:31:56.685521','2018-06-19 16:32:12.984371','ACTUAL'),(3,'0x85fb8ddffaa8d21cb1b013b0538ed56b551ca4acea4d34181da8b93723615791',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0xB0a3f48478d84a497f930d8455711d9981B66a70',4000,'0xfba4b4590aa6e629a1e2b6bfaae11bb302ca454edf572980cac8451e481ec45a',2242827,'2018-06-19 16:31:56.742281','2018-06-19 16:32:12.986068','ACTUAL'),(4,'0x3528ca76a93a02edd1f0b4aace3e45e63cd3d3ff277870e8d661a798a71f85e8',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',94735,'0x6d7cff1b792eb4089ed30c87064c1bcb11b0608c94734727f9ff6bfa828d75b8',2224221,'2018-06-19 16:31:56.659822','2018-06-19 16:32:12.983906','ACTUAL'),(5,'0x2236ad2c059aeaf9ddb78025cfbba33e0f80328f6d18365f025b97434268568c',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',100000,'0x454b20ea2a6cd17d0634c33895c7c0523a621b44aa0148f3ebd147ab3898a013',2242885,'2018-06-19 16:31:56.769423','2018-06-19 16:32:13.032131','ACTUAL'),(6,'0xf56b1b1e1c6ae0caf95a137b974fc5ee9c46d94d52e80705ce0f18f1e8e879dd',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0xB0a3f48478d84a497f930d8455711d9981B66a70',4000,'0x84184ce55d94f1d1872c1f64ba17f2d2dc6327c7dbe8637dc88b8a43f867ba8d',2242901,'2018-06-19 16:31:56.794448','2018-06-19 16:32:13.107612','ACTUAL'),(7,'0x4a20c3d5445fec65d5cbf1bdcf82f3aa54838ad1cf7e3019229d0980bceee0f4',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0xb0e2b6dfa3a035e3e57929a0ae0634500ff6a9e22ea6ed676d1a024adf7a9f6c',2242910,'2018-06-19 16:31:56.820041','2018-06-19 16:32:13.128517','ACTUAL'),(8,'0xdb9665f9000f6c77d625247f57a049f5bd4c6c26fb5215a45007ebd960f20f43',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0xe1941976829752883c285496e612c5f7d884cf5a26fa54dd2a4879e4bad8b8f9',2264448,'2018-06-19 16:31:56.845442','2018-06-19 16:32:13.191215','ACTUAL'),(9,'0xeefe6b7f74a36f60c4b01e75916e264ad718650af6aadcb57ff2c78e7c85c5b1',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x71558467adb084d8e6e4b2802aa36776724a3b78580e0c1ee55c79993d7681bb',2264450,'2018-06-19 16:31:56.870993','2018-06-19 16:32:13.257651','ACTUAL'),(10,'0x82bc30876e579e533313d178f43372cbc4da56e7368451d893fde30f99a988e8',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0xd4c8a638d7eb189c3cb15efa34b0e4febbf86eafe7053ed472f10ba3a58c73e9',2264482,'2018-06-19 16:31:56.896113','2018-06-19 16:32:13.266252','ACTUAL'),(11,'0x3364020c0003903baf23bfda273841c4461799a4ee3ae3ecad788b1f9f72b65a',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x3d5d8cec2a2bad0041de81c78f57bc93735b9c340c8fd9ce8caf4f4111ba78a2',2265112,'2018-06-19 16:31:56.921349','2018-06-19 16:32:13.348677','ACTUAL'),(12,'0xb414b9abff5af21be476db70a525845d236fa76b813328a00b51a6888caf0e42',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x92fe347ea9cba65f362c0fdb0b1c3ce4870f15bce219d74329cac6e601e70dd1',2265115,'2018-06-19 16:31:56.946730','2018-06-19 16:32:13.394498','ACTUAL'),(13,'0x70a76d8ff4a38bced47602d230acfb4b402a24d178eb34ef6cc663a9f8b3a6ac',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x42cff750c4c702aee7bbb2241370f84ccfae9212e38f0bf5ffb7b3845b9ac61b',2265129,'2018-06-19 16:31:56.972195','2018-06-19 16:32:13.441448','ACTUAL'),(14,'0xb92eca6c9d2c82ee197cc05faea34fc10156b06da4bc7d763ec85b6077c087d8',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x5ee570c0aa2dee662c772888e9a6a054763dbb29de8b62e2c6bdb911793cecd8',2265133,'2018-06-19 16:31:56.997587','2018-06-19 16:32:13.481302','ACTUAL'),(15,'0x0a4c4dff2a49e96049e2a3f04f51e6887f1ed3f5278d702cef2fc443e6d1b7f0',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x34ed00dffe25fd4f8a6c591517881573c64e362a7777221c5ba78af52151f023',2265140,'2018-06-19 16:31:57.022687','2018-06-19 16:32:13.522697','ACTUAL'),(16,'0x1ec4d9b84ae4dd7c85b5af2d617faf5c9ce8a7840efdafadcdfa24472d83c1c4',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x6cda24e04c00afa7cf2b7ce77814d559ff122f666f139dceb9ce8ec0322f2af8',2265152,'2018-06-19 16:31:57.048026','2018-06-19 16:32:13.574609','ACTUAL'),(17,'0xf4e1e7aa65f9533d8f046c59dcf6d58e91dae52820a0a2bd37974c673f7b2bb1',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xcce8436762bbd60927c61a05cf9aa685260ee74362bfa42cabb4934682d3bb12',2265166,'2018-06-19 16:31:57.078740','2018-06-19 16:32:13.619914','ACTUAL'),(18,'0x93b6bc80a0a67cbfcd69ee4017ff563dd68c3b8bd179eb0a5375eb5a65c966d8',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x9da2526e14630b1abc64da73d495ccbe91ca07477ef5ed0402a2c45223117dcf',2265177,'2018-06-19 16:31:57.105746','2018-06-19 16:32:13.658811','ACTUAL'),(19,'0x877f764a853483512ff05860b9f4bd4d165ce8924ef808afdfd25fe33c77af6a',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x7e0e8d1f45f6a2b6db3b2d0e541cfd88bd5ea629ecfed425779d1c1c43679487',2265189,'2018-06-19 16:31:57.130705','2018-06-19 16:32:13.701780','ACTUAL'),(20,'0x7da4275b5a96b4e7b2892a51d873769164ab4073dd00958f936e4a39fc773539',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x2ff0e00f53098f9f662c0c56a3156cdbd7a3e67e6293d9acc7b508b9955bb5f1',2265194,'2018-06-19 16:31:57.157050','2018-06-19 16:32:13.747465','ACTUAL'),(21,'0x76f387407c5ffdd8263e8cee85047f14790534eb24c02d0acc37930fd28f99df',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x451c5ce5023d74e9fc23d8b840a748545a310c96d1a0d7e5b2bb3ff19e5ff151',2265257,'2018-06-19 16:31:57.182217','2018-06-19 16:32:13.802292','ACTUAL'),(22,'0x93a414d25ebcdea3817f0d0b1e95a469d70116c4f48587a6bad5a447d185493e',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x75e650fc6d0126a9df4931105dc128a1c422133dc197a582830a5cdabd1bdee6',2265292,'2018-06-19 16:31:57.207788','2018-06-19 16:32:13.849261','ACTUAL'),(23,'0x6e669f1ff8a7c613ed91b19a8c5b49d01628aee47b00b8f7c21a30a5b1e8140f',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xe69ab1712c2f7f1f5120e45bb834fb8baf3a3a5674325d12282f3185c53b73e7',2265295,'2018-06-19 16:31:57.232927','2018-06-19 16:32:13.896481','ACTUAL'),(24,'0xbb2794adc43cb289efc54f9052d03d97e06ecde07af577bc63489b4bb91b3654',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x3eef92f066d72bd7fe065ba7f3214350195040ec449c97b5019f1bfd189c8e28',2265299,'2018-06-19 16:31:57.270702','2018-06-19 16:32:13.933359','ACTUAL'),(25,'0x78eddd75cdef5aadd6b1af6ef2572ee82031c4699d1f689614e52cfb000bddd0',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xe819bc747c70e6923de3a38a083e8bd1133de488f3e7b121b508fe8fadfbebb5',2265301,'2018-06-19 16:31:57.302414','2018-06-19 16:32:13.974009','ACTUAL'),(26,'0xa819b32d4a1945e5f1c30c5403914e51db16d13eb6418789ef202c8b422ac90e',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xcd6435185cc0e78870a8561361afee90785ddb4ad856bda6bc48f9049a4b984c',2265409,'2018-06-19 16:31:57.330148','2018-06-19 16:32:14.020816','ACTUAL'),(27,'0xf716c26e9644f2d894f7c7a77b3232041535b6948818b9389b4f74a671545dbc',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x038e2cc04af067a6ab039913e30ae201e1ff3900855add8ee4d36120894ea7b9',2265439,'2018-06-19 16:31:57.355351','2018-06-19 16:32:14.078940','ACTUAL'),(28,'0x68330d9cac8e5129694f99c7b9128603140e4e3b573fc310c3a73b7db63bfae4',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb6e502cc77656ce5b3c96425814884166aafd5685db74d2e232db3d09c6150a9',2265441,'2018-06-19 16:31:57.379965','2018-06-19 16:32:14.132583','ACTUAL'),(29,'0xaa306d4151e982d0fd11da355ec43a2779e80010a5f9f1c2e42a0c0f9489dcfc',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xbe0ed265b004d17e8b80be5fd9f3073c975d2beb1d061dd220cdc37f3ed758bf',2265483,'2018-06-19 16:31:57.405027','2018-06-19 16:32:14.179575','ACTUAL'),(30,'0x91e784a8c9c9432dffe02d72a8d455a95401f72f9d6a35173d5526c52312cfcb',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x485c0ed99e7744241675a7bd6cec74592bb5c25379df9266cd18bd4fb0527b2c',2265486,'2018-06-19 16:31:57.429866','2018-06-19 16:32:14.229197','ACTUAL'),(31,'0x5d8c2c73fec323b59bf42487e923757a294c1b5b43ee84bf68ba9384161c443b',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',2287,'0x613791fba81b5383e9536dab788578c8e787d2fd46769f880b076decd393ccd3',2281606,'2018-06-19 16:31:57.454368','2018-06-19 16:32:14.277425','ACTUAL'),(32,'0xd2fa437a108dd4c23c3a7f9463922f9aa8dfd59dae1bd6d5328cfef8dc4e89bc',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',2287,'0x57428734512c62ed614526376cafd37bb5a4117d192e8a3c4d782b818f9a3d42',2281626,'2018-06-19 16:31:57.485099','2018-06-19 16:32:14.330803','ACTUAL'),(33,'0x79978d1c347a6b466540a88dcf84f71fcd8f8b356ea66f7fd073a39c7e29e79d',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',2287,'0x857ffbd09ccbe4088c1b9ba8217a4a2cb129dca01a408195b37ffa0b0746ec58',2281639,'2018-06-19 16:31:57.516960','2018-06-19 16:32:14.382719','ACTUAL'),(34,'0x13b855f27e297f679f0cb018f0ab1f324622fa3203d7f4018dae9a8ae0a03e08',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',2287,'0x80be7d9b7b211639b3265931c1aa2603eb67ab6e2bd2f03c57990ce9c77c7211',2281655,'2018-06-19 16:31:57.544338','2018-06-19 16:32:14.419161','ACTUAL'),(35,'0x4f5b8a0373e9aa9fc54be0e8a742e72b6e7bc5b85a3fb125c8b9f0497d363908',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1923,'0xf65bd40a001ff7318be0f9b47653fb033ffefa88294b803d66a960a6a73b75c9',2281812,'2018-06-19 16:31:57.569457','2018-06-19 16:32:14.478741','ACTUAL'),(36,'0x5b89564130fe4b6c988ed4f97cc3ddba5bdc7a49797477cfc1a5bb23436b2f99',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1923,'0x032ab5b5077407dd8dbe75bcd750ca8f7ec792e675793f397f3a7110bb7e6d65',2281816,'2018-06-19 16:31:57.594734','2018-06-19 16:32:14.530733','ACTUAL'),(37,'0x3893af392eeefa2cb606cd4ef00eccf86bfde80856ed27396770586cef3d7541',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0x004ef6f3be8bbec9c099a357a643be1b3ee040867abc34c1d5b5d7da76c266f8',2281873,'2018-06-19 16:31:57.621221','2018-06-19 16:32:14.582636','ACTUAL'),(38,'0xe5685925c1db5d42094a9eacfd5eee8307f4b8865e3c58e8a46f73d630162ab3',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb9c055e799daed48af1038dfab87f5ad89acfb614f45a71935d75ef8c287e44d',2282358,'2018-06-19 16:31:57.646120','2018-06-19 16:32:14.637530','ACTUAL'),(39,'0x1dfe150330348ed1009d89d6d560557932866cb19ee1a6bf63554f0b00c8ca2e',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb08d4b006efa5a6746ead8f4d1afaf01c6441c8c056721d824bd03da23cfb9cf',2282360,'2018-06-19 16:31:57.671579','2018-06-19 16:32:14.682928','ACTUAL'),(40,'0xce126a0e6263388a37e90f5d38abd89f16d1bb09224b38f0f98eb1c0cccb4c46',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xbbb83ba55bd5d6cd8194f6e07c223a57538fdf34448061b605e95de10b1989f2',2282761,'2018-06-19 16:31:57.696993','2018-06-19 16:32:14.737561','ACTUAL'),(41,'0x2b243767be9c2bf77bc41055f41c7e11ddbac8325229e574a2c72bf63b7d65d6',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x31b087e9af239d622f4005f4a6a87142fa2724a23ee701c14389649e75f396ff',2283399,'2018-06-19 16:31:57.722505','2018-06-19 16:32:14.802705','ACTUAL'),(42,'0xc2b4eea84963f6edcf20d2d698b63b4081b195f8acb721c983c6a0d1d3cf6238',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x5b5edddcbca86f3be775adef9b6a4b0a106080bf5d360813bc41c84803a940ea',2283417,'2018-06-19 16:31:57.748076','2018-06-19 16:32:14.856457','ACTUAL'),(43,'0x44f97ae54771cb9e7e8b0f4524f7466deb02c7d1df0ece5cbd9ad3aaf8f607f4',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x5e6021c4083fb36fecf851b160a222ce3a9a23934512e7cca1a81a5344c6451a',2288100,'2018-06-19 16:31:57.773725','2018-06-19 16:32:14.905233','ACTUAL'),(44,'0xe643d82d8474d7d49b75902250b5073edea69d8c20cf82db51d3780638eef374',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xa32850e460284013370d08879e2a07c49e614083abd2e18b4eeb679fda21a2fe',2288108,'2018-06-19 16:31:57.798739','2018-06-19 16:32:14.959749','ACTUAL'),(45,'0x5e0f0ca1f2d9f73b82227fb9afd1730c667186cc84c9b2944fbd5e61673edbd2',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xee737e01330e1c370408d729af536cb3af122cb7b3bb5ef77070aa88bc67d7e4',2288166,'2018-06-19 16:31:57.824371','2018-06-19 16:32:15.011784','ACTUAL'),(46,'0xc1a2247eb744b416718cf903a077fe2494d0de325be6457919798b811d011539',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xa7b6135598bffd3c6aaa66e484e3023a3b485ee0d058b02007252b6e8701c72e',2288242,'2018-06-19 16:31:57.849921','2018-06-19 16:32:15.064432','ACTUAL'),(47,'0xae7a302071204b220befd5a4f342c867025e324b6d87f058d3e210ddffdc3169',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x0c96bffdadc83dcf80ea23a8fe3aee854909af25ac72071bc703e71bad6a998e',2288252,'2018-06-19 16:31:57.875218','2018-06-19 16:32:15.117356','ACTUAL'),(48,'0x46fbe0c196573a74254104b97d7dfbe236956db0fbc047085bafa86e12f86c0d',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x603fb0fd7b1f9b2249c2c8408e3337a5e7f82ad32cc5908449f139d0c0c217ab',2288261,'2018-06-19 16:31:57.900318','2018-06-19 16:32:15.163683','ACTUAL'),(49,'0xe903ca30b213ac3fda28b63052e93d7bc2d6a1dbc12d813cb91fe71e6fc49ca8',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x137045f483cb812ba8e89d4573d83295784bd7c53dfcaf76b972339de4775512',2288332,'2018-06-19 16:31:57.926095','2018-06-19 16:32:15.201616','ACTUAL'),(50,'0x8069aa902b7721852c348790940fe6e8af5f6836071e9a73c6f1116de54e2d8f',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xafe6e6e225a09043c2f600abc723ba80361f19bdee6ca7b0852e7610bded7d4d',2288339,'2018-06-19 16:31:57.951527','2018-06-19 16:32:15.251715','ACTUAL'),(51,'0x61549626fa593127d515f0769976697035d370fdd1f286298c58a7c9f1cb56f4',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x478d56dd71bae5243298e2d605bcccfc9fa4a0d9c4bbe6817f5c5426e6ae4df1',2288357,'2018-06-19 16:31:57.976720','2018-06-19 16:32:15.294308','ACTUAL'),(52,'0xb93ab482b4f849823f87b9663ce5947874875218fe43f8b68c1efc3736d2e59d',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x5f75c62c5a6dc1d72e1704014ff8e75fb8e4dc8417062afd8cadf7fbfef357a9',2288560,'2018-06-19 16:31:58.013294','2018-06-19 16:32:15.347435','ACTUAL'),(53,'0x5dee98003d0ff92163625a02429b6ea5d2ee3938c0275fe6f5ee44f5a584b900',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xc2800ee780ab6f0ba177bbaf067a01ddd607ab56b94a63326d7bb38a349edddd',2288808,'2018-06-19 16:31:58.049904','2018-06-19 16:32:15.393974','ACTUAL'),(54,'0x16daf240de564c2693057dfeca4c6fc992b7754e2f391cf8ba15766a87d936a6',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb3e3062fa7b65fcad81b7c6e54afdcbddcf11df7a9bcbc5c4250f1ac190642c4',2289118,'2018-06-19 16:31:58.080277','2018-06-19 16:32:15.448599','ACTUAL'),(55,'0x03059d2153218d04f15963d1875af3aeeab4d54e4eea317428916555f0f13f72',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',7702,'0x78783b8c7280c388384da06c96e447bf322ea69e2c07c5d4c9f92cc6e3d9689a',2305929,'2018-06-19 16:31:58.108827','2018-06-19 16:32:15.487385','ACTUAL'),(56,'0x7137e18890be5985475dc7a86182c7747be62c4e647cf48092c635d1fb3f34fc',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',7702,'0xe3da00fbf69577b8d255b6e6acba57652298ca20fdfd172d6f3abde9bb6b42d6',2305937,'2018-06-19 16:31:58.134259','2018-06-19 16:32:15.539584','ACTUAL'),(57,'0x6638e6f4a63154a41bf8ca79d8fcab6cbd291744f5db8fa8eca4dd81a1e31fce',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',38510,'0x2e4bc2fb070171903f4f2849d84252a570380f01ee00c9f4f3b5889afdc7644c',2322909,'2018-06-19 16:31:58.159791','2018-06-19 16:32:15.584548','ACTUAL'),(58,'0x1c14226c21b16aca553378cd254fa41076cad29a46b56daa78fa53446fe67ae7',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',38510,'0xa24b3ac70fd1b12873cd231856666810c4cf34a60394eeb86e77c1399ecd44c6',2322918,'2018-06-19 16:31:58.185464','2018-06-19 16:32:15.629432','ACTUAL'),(59,'0x675a4aa4003b2b3ceedcc7c3e0ecedfbd58f24f326592ee023222addb0dc68ad',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0x4ef40afb1e9832f4e5479468e317fe7519c3972dd93a2ca64120005099c6876e',2323173,'2018-06-19 16:31:58.210862','2018-06-19 16:32:15.684769','ACTUAL'),(60,'0x619465296d66c51c1a99e72f59594746d06960b408bd8e7d663a4e10af94406e',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x327bc2bcb0fec79c4cac1f903c4fae9b0206ce2d534d92790e091c3da6eaad60',2323219,'2018-06-19 16:31:58.236345','2018-06-19 16:32:15.740693','ACTUAL'),(61,'0x9e274aafe6f512bafd1df03b2e2ecf6cd30df489a75506f21431c08f348cc3c0',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xfbebc83aeaddf52fee10e720783783e47be7ff3a7821d0d795ea6815938ed74b',2323221,'2018-06-19 16:31:58.261344','2018-06-19 16:32:15.785180','ACTUAL'),(62,'0xe260a7ba1730f394c98409904c95ff98d1082355c3d70b64b5e221caf4dae124',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xfe809ec855f8b87b4210a043e2668478d112e334c375ad2fa4735f8760e2a698',2323235,'2018-06-19 16:31:58.286775','2018-06-19 16:32:15.843142','ACTUAL'),(63,'0x4c89de3eae668b815ad9c67363a46d5f22fd54529deb70ce635d0df3b585119a',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x6df65f0a136b9b9864aa83eaa56349fa8351a1cff1da6c5925cfeb84a600d25a',2323277,'2018-06-19 16:31:58.312314','2018-06-19 16:32:15.887817','ACTUAL'),(64,'0x04dd0eebb212dcdb2f28c87bb1476a596763254e6773603c172b68bdb5ff4f9f',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb0f4137de41fb672de76f4f04cb0f625a9e501d9173dcb3aeb4667c282959275',2323285,'2018-06-19 16:31:58.337602','2018-06-19 16:32:15.946892','ACTUAL'),(65,'0x9a46b3843315cc999c54a7f531d5827af64c187269a7b9359030611092dc257b',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0x7fb72dc9fb9395398919925f112fc2b7bebd49ea7a0711676b431c6ebb2db53a',2323294,'2018-06-19 16:31:58.362942','2018-06-19 16:32:15.985093','ACTUAL'),(66,'0xa0e0698217afde2378420f1b2fd2b96e0bdbf69b1397269edc27c0a3a2beac94',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x9013b3c5c51b455e29a78c09b2705830238d8d36a3975291ec05c302720d53f4',2323536,'2018-06-19 16:31:58.388550','2018-06-19 16:32:16.027865','ACTUAL'),(67,'0x65e3c3b68ddf053cd5dcfc7504f98a4b946673822f3e05340af7c11857ff41b3',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x84586179240ac8b0c4960ab6943678faf5272ef9f6f0dc9e98d9b71542a72018',2328995,'2018-06-19 16:31:58.413933','2018-06-19 16:32:16.064643','ACTUAL'),(68,'0xc4f90b11ea2338b26044db839c075fc10cf78d1db354dcd0066fcf92dd144bfd',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x184daa63738b474523ff02d23f49cf19d5896e7316a62287f1080c5732000272',2329011,'2018-06-19 16:31:58.439457','2018-06-19 16:32:16.103286','ACTUAL'),(69,'0xef8603832c2ed2f98b9c82cfa5c7f547d22cab8c7216cab008491402373de7b3',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xe4ce6527173261b99897a201318aeef980a1f3fb875f38ea50f073a980009240',2329246,'2018-06-19 16:31:58.464861','2018-06-19 16:32:16.166800','ACTUAL'),(70,'0xd721443308c3deb645a28134e0b6f28b32670b97741071a8e90cd501b0940794',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x0a3ea693a9e33b085bb30b80a171efda06aafaf11ea0672b5b77171eb6b4d18d',2334177,'2018-06-19 16:31:58.490340','2018-06-19 16:32:16.217063','ACTUAL'),(71,'0xce8309e24de4b92307f6f846e4312d6a6aca937b7b3ec00ef9820d9dff857a72',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x6f392ad515251de8c0a05cf25b59702ea9f3f48bee5df19a2379ee7d8934f11b',2334648,'2018-06-19 16:31:58.525891','2018-06-19 16:32:16.261407','ACTUAL'),(72,'0x6767e4fb75807c3c078b0ceb40f297acad69b44552f4f361da4830abb4de3b83',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x6e08fb561f63f377f41299a2f069af98d4ce5b18758a94eb2bd079a231824efa',2334676,'2018-06-19 16:31:58.557235','2018-06-19 16:32:16.314030','ACTUAL'),(73,'0xe71933631eda7096dd450a317f5028424a4351c31ca3af7473e1eaeea4680452',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1703,'0xd284a65c2b970284db94bfba7719fee498fc389e13595064bcf1d2ea3dec8b61',2340356,'2018-06-19 16:31:58.583854','2018-06-19 16:32:16.354726','ACTUAL'),(74,'0x5032828080e661140920c96c393f800230089bc2a352e0c9c922837e8efffa6f',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1703,'0xcb3f57420e28e081f0ffc941c9f47d324b6defcf3ff4933419a87d126464d47b',2340372,'2018-06-19 16:31:58.609179','2018-06-19 16:32:16.404544','ACTUAL'),(75,'0x5a5a2ccf9939e63a1ac018ae263299c53301fa3ac5eed6965f877713a89f3d46',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1703,'0x91159fdd9437f3a7c86c35e4918656061e03bdc7ee9daa795a758c72ec8cf855',2340384,'2018-06-19 16:31:58.635563','2018-06-19 16:32:16.451930','ACTUAL'),(76,'0xab42e326ab096b1691db6bb4378d41c92a2560e8f0adb6db5e0d6db86fe127a4',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1703,'0xad0426b9abfa2c5b11e7bbf7f3f4e3ffbac5be872dee8cc3ab22b9ba19e0da9a',2340400,'2018-06-19 16:31:58.661164','2018-06-19 16:32:16.549543','ACTUAL'),(77,'0xdc2c14a5b2b342a9f86984db7fd150422e742734cc557bada0ceda0a0b284884',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',170,'0xf492bb1e97f2c5fe8dea8d37906759c904b76a269d6b53c1bab751d7be23e73a',2340416,'2018-06-19 16:31:58.685944','2018-06-19 16:32:16.558765','ACTUAL'),(78,'0x86eb9fea5fe6b117711398184eceddf0dbacd9616e358b6bfb3881c36080ab2d',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',478,'0x741cd4f293b1a0068714cfe81eea3e9c9319fdb6f5512b8b16000abb8fb3f50c',2340556,'2018-06-19 16:31:58.720055','2018-06-19 16:32:16.587444','ACTUAL'),(79,'0x83642da93fe064ccbde86dc83f1e7871fbc57cf07a03e33e11e1171f2a520190',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',138637,'0xd4ea118e6d8e940e94e84d123fab87683342c2fb177eb82804403a1bf92127f2',2340572,'2018-06-19 16:31:58.749592','2018-06-19 16:32:16.625764','ACTUAL'),(80,'0xc6cd39ddf323e5b1cb55303c3d9235ec0cbf03a52c5987961686db10d5795ce9',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',479,'0xafff3596751faef62c259cc80eac84231048685cd63c04e799f695b081f2faf5',2340633,'2018-06-19 16:31:58.775371','2018-06-19 16:32:16.665844','ACTUAL'),(81,'0xade409064b9a90191054f108d17aba9daf3cce316ee8b3ff92393af02a8da223',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1693,'0xa4b4833980c82baceb6386fbdd2df73e0d16df13fd3d2c9f36b524e75e5a6e09',2340901,'2018-06-19 16:31:58.800641','2018-06-19 16:32:16.717095','ACTUAL'),(82,'0x74740fbfaf394dd4b4f8bde90f23734249780728e24a44ec94c2156071e04d62',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0xB0a3f48478d84a497f930d8455711d9981B66a70',100000,'0xb5ce0ab2c15108d9188833cab965eb481c379ad3c818833fb7dbee40c993db80',2340915,'2018-06-19 16:31:58.826347','2018-06-19 16:32:16.760358','ACTUAL'),(83,'0xa9c681656ede6d39217852199da26d1823af8f1f4b5f5fc897d020c7c1299141',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x2fb93f059f9718c00dc56742d1d93c7da9d4b6eb12175792177702984f0d8b10',2346044,'2018-06-19 16:31:58.851339','2018-06-19 16:32:16.821174','ACTUAL'),(84,'0xf34d8fc83f694d38c5708791b2dd215749c4a6e5629d72ce7f3b5ec78755e926',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x36cca52bd8e997aa2449ae883205a5458530797c9ce47d245afe6ef111c1bbc4',2362680,'2018-06-19 16:31:58.876642','2018-06-19 16:32:16.873841','ACTUAL'),(85,'0x87d625e834b8f397ec49644ef88577267a2532bce45c8f8eea999a772f038717',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x6812013358b4f6ee9538e4bce9ca9ee4a547cc9319a76814c0d7ffc8b6cf6937',2369608,'2018-06-19 16:31:58.901804','2018-06-19 16:32:16.931332','ACTUAL'),(86,'0x9d99987f93554f85b030e79c31f330e1c83d7b0eee5ea52fc3d10fe3ebff65ea',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xdec4dcd60353b41bf4ced85b846ce544cad776dc05be53d62f2cbca11078a3a0',2369662,'2018-06-19 16:31:58.927718','2018-06-19 16:32:16.937948','ACTUAL'),(87,'0x80190b0adee3ccfeb1a4415337e504c9cd482e65cde4882fb492062adc39f716',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xe67b239f5831654a857b2eb3213aba516fb7378fffe79c146f6f50fcde51997f',2374448,'2018-06-19 16:31:58.953413','2018-06-19 16:32:16.992118','ACTUAL'),(88,'0x3e5b23e814dcb624c1968681506069cc6a2ce5d95aa1a3ef02e2b0767e96e727',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xdcf1ee5731cd8d575ec33993365b8413bef8033155f82ebaa506b1c51f39818e',2374464,'2018-06-19 16:31:58.978696','2018-06-19 16:32:17.045773','ACTUAL'),(89,'0x41357301ec0f1e039b551c11df6f114d24ccf34372375bae864bcf6fc4afbabc',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x080d2c93ab3eac36df29c53375dc7058584dc5d6bfa7f876abac69be89a08a70',2374480,'2018-06-19 16:31:59.005120','2018-06-19 16:32:17.094698','ACTUAL'),(90,'0x688a1c5c6b45934a411dcaa4ce93dcc126063edaff8a7c3ce8fff80db11743ad',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x7b1c5a07f954be8b95e1db2b828a7aa4b53ef49acdfdb8a0b710025454cf13ca',2374518,'2018-06-19 16:31:59.039321','2018-06-19 16:32:17.141319','ACTUAL'),(91,'0x00d15863c544f1d1c4faffb4af2c21259556b47e714a417425486722c15ee5ff',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x85ecda3cefe2f6b2de7021865fe9d84f518222ca29dcb1695d3aa01b37241f1b',2374522,'2018-06-19 16:31:59.074946','2018-06-19 16:32:17.191200','ACTUAL'),(92,'0x363e8327db14ff7dbea3a89ee5c37e90c6230de247efc1dc7726e012db92236b',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x7b7d972ea385341b0551a5c8b10b02b20fc488a12f9aad860fb5512344fce7dc',2374532,'2018-06-19 16:31:59.104783','2018-06-19 16:32:17.242950','ACTUAL'),(93,'0xa5e29ed471345e88e319aaba0812fb8dcc8f9af9e90b61de795d92b266780c0f',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x518b28ea56d1477e819943f5cdb79fbb5ec7946d4f07b57845005355c398abf7',2375131,'2018-06-19 16:31:59.130832','2018-06-19 16:32:17.296509','ACTUAL'),(94,'0xd807c617e69e65ca72822b9eb2dd63b9117705e9174c4eb34fb2972504b956bc',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xc888b4a3453cf425d999f24bfcd0fcc1b3045d0befaf8706a4aad8909ca7ab48',2404106,'2018-06-19 16:31:59.155790','2018-06-19 16:32:17.351843','ACTUAL'),(95,'0x96f9d7cbc23d3fb9a87fca2a9baf1720fb999fdecdbcd3668b907c073577bda3',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x9f6a05e0c6c91cddf943ae8b3466b585633115fcef89195e9b133a5eea43b81e',2404135,'2018-06-19 16:31:59.181159','2018-06-19 16:32:17.402344','ACTUAL'),(96,'0xc11f338168d3ce232d3a875351b446f8802be4f0a020958fff43ab0617bbe68e',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb24d668eb725abce6041ed0d69bab75a08e74624410a41e99c69b8de6f57e248',2404207,'2018-06-19 16:31:59.206459','2018-06-19 16:32:17.456643','ACTUAL'),(97,'0xc8f7a6364a7748e2b96e18ed30a47fa7a84433c50ae56fe8db6f685bf01eb642',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x8720964f94318cd105e95ef861b3b7873f241552b98616e58a682a6c203c7cb9',2404212,'2018-06-19 16:31:59.232187','2018-06-19 16:32:17.506649','ACTUAL'),(98,'0x8e495cf906610e17ba7c6f8cc4bfe0b5cda9bde8a2cdccadcb47ea4cc745a4ad',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x3674999b768cb491baf01e0a029b3117c64cca243b972eae5710dfdcc3a36260',2404216,'2018-06-19 16:31:59.257647','2018-06-19 16:32:17.554916','ACTUAL'),(99,'0x15b5d7fa1f9112347119e24b99b4bf869e786b5ed22fec4e65bd89ff99778c2f',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x9ef9a628aa383c1bba789ae90675f604974422602f5e519f851cc71fc36715a1',2404267,'2018-06-19 16:31:59.283253','2018-06-19 16:32:17.604674','ACTUAL'),(100,'0xd436519b95162f2d0f7f1cc9a7f9ef00c9659faf0d0e93502acff5beeda79df3',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x5ca04c4853ca832677d9e339b23b4bfb9b92411c2b81ce74b15f580a40e9c8e5',2404298,'2018-06-19 16:31:59.308683','2018-06-19 16:32:17.650543','ACTUAL'),(101,'0x1295ffb62696ddfb4b3c3383b9ce193d7d52d6d262286409b6980e246bc5e0af',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xf28f08c7128235540afc8c16286aae76f2a1b51de59f8e710ad020ff666da465',2404303,'2018-06-19 16:31:59.334180','2018-06-19 16:32:17.703160','ACTUAL'),(102,'0xba6c2a3ef1f81cbe2037842adbe5c6c98b4b1aaa7ddcbe1104958bea2c5e4bc5',NULL,'0x73015966604928A312F79F7E69291a656Cb88602','0x0000000000000000000000000000000000000000',10000,'0xc86fdec9a37cabc299bec07ba5b8831f3ab002c22e0d4bce52c08aa8a0c910d5',2409471,'2018-06-19 16:31:59.359405','2018-06-19 16:32:17.757364','ACTUAL'),(103,'0x89be1c3ab0f057ba373f4d7229ede00c9f7c7169bc834c1fb66cdc0c2f10d4f4',NULL,'0x73015966604928A312F79F7E69291a656Cb88602','0x0000000000000000000000000000000000000000',10000,'0x7da0d7109330708a6ab3d9730d2c0e01bca0f29d282102f376dc65cccada704c',2409490,'2018-06-19 16:31:59.384461','2018-06-19 16:32:17.809722','ACTUAL'),(104,'0x6522b59161779c8a87706e11095af7649bbf588a7088f30c9a9c3f40440281d5',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0x0000000000000000000000000000000000000000',77021,'0x1f8b79c3bbb6851c1214c1d6309aabd3815ab6cdd33cab7165d3d22ec758883d',2414962,'2018-06-19 16:31:59.410113','2018-06-19 16:32:17.818877','ACTUAL'),(105,'0x88e51ab163411db0e737b6fb68a4af4d073d87af8aca697f33efd0136322387e',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0x0000000000000000000000000000000000000000',170,'0x0b1ce692d598ba55b1ba07b193f5305b91c6896674664d1b83ba09f3151ab1fb',2415087,'2018-06-19 16:31:59.435572','2018-06-19 16:32:17.852931','ACTUAL'),(106,'0x07d69732220cbb3c0bc2e6786eb36f5f216d71cb195ae45f335af0e908f4d9f2',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0x0000000000000000000000000000000000000000',77021,'0x8c583aa76afe732484d2387911f9645157f59e57ecf169d6eec5bbaa6d9c32a3',2415234,'2018-06-19 16:31:59.461718','2018-06-19 16:32:17.863877','ACTUAL'),(107,'0xaa20f77803726a7b41b87f5319ad8bfa2f9a10bbe9efc7f0c6e51292012e6d71',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0x0000000000000000000000000000000000000000',170,'0x88a04d57c31e092b0fdca69cc86be610f515211df312f8928dfc0e660c6f7d19',2415276,'2018-06-19 16:31:59.486646','2018-06-19 16:32:17.884850','ACTUAL'),(108,'0xb806323772cc21ffe4000ca338038b058d73b975fb6594fc800e8fc863a2f5d7',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0x0000000000000000000000000000000000000000',77021,'0xa77b55a343a2c62e41b725629b306065e21b4cbc6c3446083b41b1b14403c131',2415376,'2018-06-19 16:31:59.509852','2018-06-19 16:32:17.894076','ACTUAL'),(109,'0xc5820603ab479c8bfdbd57dc4585cdacbbffdd061b6ed0efebfdf5c2783a6612',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0x0000000000000000000000000000000000000000',77021,'0xafce73549241c97a43b55ff85c8a13602a35b8bd52e3b8738f7cc6d21920f04d',2419462,'2018-06-19 16:31:59.532611','2018-06-19 16:32:17.909942','ACTUAL'),(110,'0xc1ad3bf990668a3c90ed2758084081cbb23505d56b6635fbb26b3e40588d8fb5',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0x0000000000000000000000000000000000000000',77021,'0x18246a53284708bef925f8361489f6a1250b81550ebb709893f7df23bb377637',2419544,'2018-06-19 16:31:59.555169','2018-06-19 16:32:17.925811','ACTUAL'),(111,'0x91f5b9c69cc04266319cb80ff797e04c2a6f99e05e491acef108f948470837af',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0x0000000000000000000000000000000000000000',170,'0x958de35e6a905694ba1b6cdeca2ec8fbe46911ca47e66cf8a7bd78be9a7b7b01',2419595,'2018-06-19 16:31:59.578302','2018-06-19 16:32:17.946000','ACTUAL'),(112,'0x03b356bf3d111d3dde7e5e05938fe07a21703cd2c82a570064110d7b9538c9b5',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x9179513b9b336055e81d3814edcbd0753825e8d10770cf1134fa77a731db98b9',2455358,'2018-06-19 16:31:59.602016','2018-06-19 16:32:17.962784','ACTUAL'),(113,'0xd7afdc04ef2e34e6721ae5f3ff97ce982e7be89358a8313dbab4ab06bbd8d049',NULL,'0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0xf4d66eef7d31ed0fb58daac9ccd461e909ffc09770cc8c194ef2362dd98d7111',2490472,'2018-06-19 16:52:56.336226','2018-06-19 16:52:56.377421','ACTUAL');
/*!40000 ALTER TABLE `transfers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-19 17:13:11
