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
INSERT INTO `django_session` VALUES ('2dgtoh0eyclidizwffq0671zt7xoezzl','YTFmZmI1YjNkNzY0ZWZiYjNhN2UwMDU4NzM1M2U4NDdiM2YwYjAwOTp7InBhcnRpYWxfcGlwZWxpbmVfdG9rZW4iOiIwMDM2NTRiYWZiNWY0ZDJhYjg3ZmY4N2EzMDJkYjM5MiIsIl9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoic29jaWFsX2NvcmUuYmFja2VuZHMuZW1haWwuRW1haWxBdXRoIiwiX2F1dGhfdXNlcl9oYXNoIjoiMWUzODVkYTIzYWQxZDE4ZWUxODU5MzE1OWE0MGE2NDc4YjM5OTgyNiIsInNvY2lhbF9hdXRoX2xhc3RfbG9naW5fYmFja2VuZCI6ImVtYWlsIn0=','2018-07-02 19:45:31.229756'),('4hukfa5kqakva8n1uidqmjmqz1rftsqe','MjIzYTlhOWZiZjBjYmMzMDEyMGJmZmFhOGYwNWRlYmIyNDI0OTFlODp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYzQyMWMxZTc2MTkwNjRhNWM0ZDYyZThmZGEwZmUwYzYyMDQyY2QwIn0=','2018-07-02 19:44:45.999218'),('hbnwpensyqdsgg8w25xuv6jw7v49kw7b','MTdhMjhjYzc1NzM4NGM1ZTYxMjJlZTAyMGI0ZWJhYTk3ZGJmY2MwYzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkVtYWlsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjFlMzg1ZGEyM2FkMWQxOGVlMTg1OTMxNTlhNDBhNjQ3OGIzOTk4MjYifQ==','2018-07-02 19:56:31.968684');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_processing`
--

LOCK TABLES `events_processing` WRITE;
/*!40000 ALTER TABLE `events_processing` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange_rates`
--

LOCK TABLES `exchange_rates` WRITE;
/*!40000 ALTER TABLE `exchange_rates` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ico_info`
--

LOCK TABLES `ico_info` WRITE;
/*!40000 ALTER TABLE `ico_info` DISABLE KEYS */;
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
INSERT INTO `investors` VALUES ('pbkdf2_sha256$100000$Nr1iz2AYgKV8$i/bJL2ad0JePdMpT74OOsEYfOWqKjaSb0dkEBU+HHUo=','2018-06-18 19:56:31.966460',1,'r.nesytov@ongrid.pro','0xB0a3f48478d84a497f930d8455711d9981B66a70',0,'2018-06-18 16:45:30.993391','p67gIuN5SW4Wgl6G',1,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens_moves`
--

LOCK TABLES `tokens_moves` WRITE;
/*!40000 ALTER TABLE `tokens_moves` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,'0xeb931024000000000000000000000000b0a3f48478d84a497f930d8455711d9981b66a70',NULL,0,NULL,'0x703941C626999Ede2F1630ea95AFCcB6b96a3857',50000,NULL,NULL,NULL,'PREPARED',NULL,'2018-06-18 16:47:11.345055','73c0485724f54f3db00563e5426783cf');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfers`
--

LOCK TABLES `transfers` WRITE;
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
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

-- Dump completed on 2018-06-18 20:06:52
