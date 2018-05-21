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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'LTC','mqZutf2dbv2oW9KzTM9NpiimhpqWAYLuoG',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add association',7,'add_association'),(20,'Can change association',7,'change_association'),(21,'Can delete association',7,'delete_association'),(22,'Can add code',8,'add_code'),(23,'Can change code',8,'change_code'),(24,'Can delete code',8,'delete_code'),(25,'Can add nonce',9,'add_nonce'),(26,'Can change nonce',9,'change_nonce'),(27,'Can delete nonce',9,'delete_nonce'),(28,'Can add user social auth',10,'add_usersocialauth'),(29,'Can change user social auth',10,'change_usersocialauth'),(30,'Can delete user social auth',10,'delete_usersocialauth'),(31,'Can add partial',11,'add_partial'),(32,'Can change partial',11,'change_partial'),(33,'Can delete partial',11,'delete_partial'),(34,'Can add account',12,'add_account'),(35,'Can change account',12,'change_account'),(36,'Can delete account',12,'delete_account'),(37,'Can add exchange rate',13,'add_exchangerate'),(38,'Can change exchange rate',13,'change_exchangerate'),(39,'Can delete exchange rate',13,'delete_exchangerate'),(40,'Can add ic o_ info',14,'add_ico_info'),(41,'Can change ic o_ info',14,'change_ico_info'),(42,'Can delete ic o_ info',14,'delete_ico_info'),(43,'Can add investor',15,'add_investor'),(44,'Can change investor',15,'change_investor'),(45,'Can delete investor',15,'delete_investor'),(46,'Can add KYC',16,'add_kyc'),(47,'Can change KYC',16,'change_kyc'),(48,'Can delete KYC',16,'delete_kyc'),(49,'Can add payment',17,'add_payment'),(50,'Can change payment',17,'change_payment'),(51,'Can delete payment',17,'delete_payment'),(52,'Can add phase',18,'add_phase'),(53,'Can change phase',18,'change_phase'),(54,'Can delete phase',18,'delete_phase'),(55,'Can add tokens move',19,'add_tokensmove'),(56,'Can change tokens move',19,'change_tokensmove'),(57,'Can delete tokens move',19,'delete_tokensmove'),(58,'Can add transfer',20,'add_transfer'),(59,'Can change transfer',20,'change_transfer'),(60,'Can delete transfer',20,'delete_transfer'),(61,'Can add events processing',21,'add_eventsprocessing'),(62,'Can change events processing',21,'change_eventsprocessing'),(63,'Can delete events processing',21,'delete_eventsprocessing');
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
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$100000$N8lcboj6kr2f$xVXw14cbOG00uapZ8EdZr8BlJCelLQ0Ysc/OQxBsZg0=','2018-05-15 17:18:03.908343',1,'admin','','','',1,1,'2018-05-15 16:41:44.042051');
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
  KEY `django_admin_log_user_id_c564eba6_fk` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(7,'social_django','association'),(8,'social_django','code'),(9,'social_django','nonce'),(11,'social_django','partial'),(10,'social_django','usersocialauth'),(12,'user_office','account'),(21,'user_office','eventsprocessing'),(13,'user_office','exchangerate'),(14,'user_office','ico_info'),(15,'user_office','investor'),(16,'user_office','kyc'),(17,'user_office','payment'),(18,'user_office','phase'),(19,'user_office','tokensmove'),(20,'user_office','transfer');
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2018-05-04 18:35:11.228812'),(2,'auth','0001_initial','2018-05-04 18:35:11.657595'),(3,'admin','0001_initial','2018-05-04 18:35:11.746545'),(4,'admin','0002_logentry_remove_auto_add','2018-05-04 18:35:11.754991'),(5,'contenttypes','0002_remove_content_type_name','2018-05-04 18:35:11.825597'),(6,'auth','0002_alter_permission_name_max_length','2018-05-04 18:35:11.853800'),(7,'auth','0003_alter_user_email_max_length','2018-05-04 18:35:11.888480'),(8,'auth','0004_alter_user_username_opts','2018-05-04 18:35:11.900704'),(9,'auth','0005_alter_user_last_login_null','2018-05-04 18:35:11.930613'),(10,'auth','0006_require_contenttypes_0002','2018-05-04 18:35:11.932256'),(11,'auth','0007_alter_validators_add_error_messages','2018-05-04 18:35:11.939903'),(12,'auth','0008_alter_user_username_max_length','2018-05-04 18:35:12.021559'),(13,'auth','0009_alter_user_last_name_max_length','2018-05-04 18:35:12.051059'),(14,'sessions','0001_initial','2018-05-04 18:35:12.094966'),(15,'user_office','0001_initial','2018-05-04 18:35:12.546869'),(16,'default','0001_initial','2018-05-04 18:35:12.750183'),(17,'social_auth','0001_initial','2018-05-04 18:35:12.752382'),(18,'default','0002_add_related_name','2018-05-04 18:35:12.809591'),(19,'social_auth','0002_add_related_name','2018-05-04 18:35:12.811980'),(20,'default','0003_alter_email_max_length','2018-05-04 18:35:12.840888'),(21,'social_auth','0003_alter_email_max_length','2018-05-04 18:35:12.843284'),(22,'default','0004_auto_20160423_0400','2018-05-04 18:35:12.856018'),(23,'social_auth','0004_auto_20160423_0400','2018-05-04 18:35:12.858738'),(24,'social_auth','0005_auto_20160727_2333','2018-05-04 18:35:12.880006'),(25,'social_django','0006_partial','2018-05-04 18:35:12.920013'),(26,'social_django','0007_code_timestamp','2018-05-04 18:35:12.980153'),(27,'social_django','0008_partial_timestamp','2018-05-04 18:35:13.040114'),(28,'social_django','0004_auto_20160423_0400','2018-05-04 18:35:13.044494'),(29,'social_django','0001_initial','2018-05-04 18:35:13.049576'),(30,'social_django','0002_add_related_name','2018-05-04 18:35:13.051934'),(31,'social_django','0005_auto_20160727_2333','2018-05-04 18:35:13.053967'),(32,'social_django','0003_alter_email_max_length','2018-05-04 18:35:13.055849'),(33,'user_office','0002_auto_20180504_2015','2018-05-04 20:16:02.164926'),(34,'user_office','0003_auto_20180507_1931','2018-05-07 19:31:21.675462'),(35,'user_office','0004_auto_20180508_1954','2018-05-08 19:54:14.964156'),(36,'user_office','0005_auto_20180515_1738','2018-05-15 17:39:56.412354'),(37,'user_office','0006_auto_20180517_1439','2018-05-17 19:41:17.837609'),(38,'user_office','0007_auto_20180517_1906','2018-05-17 19:41:17.930276'),(39,'user_office','0008_auto_20180517_1941','2018-05-17 19:41:17.963712'),(40,'user_office','0009_auto_20180521_1536','2018-05-21 15:37:00.601771');
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
INSERT INTO `django_session` VALUES ('l0dkiyp6t9qcp5z8sdh919rkge1lwyij','ZTcxMDNjZDIzMWE0M2NmODJjMTcyNzQ4ZmJiMTIxZmUzZmEyMTE4Njp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkVtYWlsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImRjMjIyZmE4YTc4Y2EzMzhmMmMyNmZlYTNiMDYxZDgyNzRmYjJhZjgifQ==','2018-05-29 17:59:13.928043');
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
  `last_update_at` datetime(6) NOT NULL,
  `filter_id` varchar(100) COLLATE utf8_bin NOT NULL,
  `last_processed_block` int(11) DEFAULT NULL,
  `from_block` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_processing`
--

LOCK TABLES `events_processing` WRITE;
/*!40000 ALTER TABLE `events_processing` DISABLE KEYS */;
INSERT INTO `events_processing` VALUES (9,'2018-05-21 14:30:47.554363','0xf13dfcd1ac912e09ee4e35e3374993ef',2305937,0),(10,'2018-05-21 14:42:10.432280','0x2e9e11b55373cfdc70601f9ae9e308c6',2322918,2305938),(11,'2018-05-21 14:55:35.904188','0xc09b9ae91cddfcb99f3c178cc9ae330c',2323173,2322919);
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
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange_rates`
--

LOCK TABLES `exchange_rates` WRITE;
/*!40000 ALTER TABLE `exchange_rates` DISABLE KEYS */;
INSERT INTO `exchange_rates` VALUES (1,'ETH','2018-05-07 17:02:45.866853',730.54485,1525712521),(2,'ETH','2018-05-07 17:24:10.744245',742.52028,1525713781),(3,'LTC','2018-05-07 17:24:11.117633',164.54383,1525713841),(4,'ETH','2018-05-07 17:53:36.511519',737.15328,1525715581),(5,'ETH','2018-05-07 17:53:50.162408',737.15328,1525715581),(6,'ETH','2018-05-07 17:55:00.133024',736.65440,1525715642),(7,'LTC','2018-05-07 17:55:00.517197',163.55917,1525715642),(8,'LTC','2018-05-07 17:55:31.143242',163.55917,1525715642),(9,'LTC','2018-05-07 17:55:34.951108',163.48817,1525715701),(10,'LTC','2018-05-07 17:56:01.896189',163.48817,1525715701),(11,'LTC','2018-05-07 17:56:13.205703',163.48817,1525715701),(12,'ETH','2018-05-07 17:56:19.016014',733.25434,1525715761),(13,'ETH','2018-05-07 17:56:38.926465',733.49247,1525715701),(14,'ETH','2018-05-07 17:56:54.422479',733.25434,1525715761),(15,'ETH','2018-05-07 17:56:57.288658',733.25434,1525715761),(16,'LTC','2018-05-07 17:57:00.095398',163.48817,1525715701),(17,'LTC','2018-05-07 17:57:02.230685',163.49676,1525715761),(18,'ETH','2018-05-07 17:57:38.693018',733.25434,1525715761),(19,'ETH','2018-05-07 17:57:49.826265',734.29366,1525715822),(20,'ETH','2018-05-07 17:57:52.068299',733.25434,1525715761),(21,'ETH','2018-05-07 17:58:43.009222',734.29366,1525715822),(22,'LTC','2018-05-07 17:58:43.388572',163.36261,1525715881),(23,'ETH','2018-05-07 17:58:54.780214',734.37634,1525715881),(24,'ETH','2018-05-07 17:59:29.273716',735.01436,1525715941),(25,'ETH','2018-05-07 17:59:37.908012',734.37634,1525715881),(26,'LTC','2018-05-07 17:59:40.511102',163.39105,1525715941),(27,'LTC','2018-05-07 17:59:46.128226',163.39105,1525715941),(28,'ETH','2018-05-14 10:43:37.797960',706.41828,1526294581),(29,'ETH','2018-05-14 10:48:37.675286',707.36440,1526294881),(30,'LTC','2018-05-14 10:48:38.322975',137.35149,1526294881),(31,'ETH','2018-05-14 10:53:38.341466',706.66587,1526295181),(32,'ETH','2018-05-14 11:32:25.799155',714.98659,1526297522),(33,'LTC','2018-05-14 11:32:26.115503',138.28368,1526297462),(34,'ETH','2018-05-14 11:37:25.642079',713.49897,1526297821),(35,'LTC','2018-05-14 11:37:25.954635',138.90532,1526297821),(36,'ETH','2018-05-14 11:42:25.656085',711.09545,1526298121),(37,'LTC','2018-05-14 11:42:26.245834',138.43177,1526298121),(38,'ETH','2018-05-14 11:47:25.699220',711.15631,1526298421),(39,'LTC','2018-05-14 11:47:26.088485',138.69794,1526298421),(40,'ETH','2018-05-14 12:00:12.058534',713.20092,1526299141),(41,'LTC','2018-05-14 12:00:12.507179',139.04274,1526299141),(42,'ETH','2018-05-14 12:05:12.092233',711.40177,1526299441),(43,'ETH','2018-05-14 12:10:12.065290',709.97375,1526299741),(44,'LTC','2018-05-14 12:10:12.422957',138.08965,1526299741),(45,'ETH','2018-05-14 12:15:11.973283',708.63882,1526300041),(46,'LTC','2018-05-14 12:15:12.548849',138.13881,1526300101),(47,'ETH','2018-05-14 12:20:12.019746',704.49318,1526300401),(48,'LTC','2018-05-14 12:20:12.378538',138.10513,1526300341),(49,'ETH','2018-05-14 12:25:12.293378',706.85525,1526300641),(50,'LTC','2018-05-14 12:25:12.765321',138.20317,1526300702),(51,'ETH','2018-05-14 12:30:12.283904',706.30416,1526301002),(52,'LTC','2018-05-14 12:30:12.714548',138.01398,1526301002),(53,'ETH','2018-05-14 12:39:37.101225',704.37304,1526301541),(54,'LTC','2018-05-14 12:39:43.396142',137.87829,1526301541),(55,'ETH','2018-05-14 12:40:14.595799',704.61200,1526301601),(56,'LTC','2018-05-14 12:40:15.514980',137.90309,1526301601),(57,'ETH','2018-05-14 13:35:50.886818',688.77244,1526304902),(58,'LTC','2018-05-14 13:35:51.394642',135.78651,1526304902),(59,'ETH','2018-05-14 13:40:46.569842',695.26424,1526305201),(60,'LTC','2018-05-14 13:40:46.946455',136.33988,1526305141),(61,'ETH','2018-05-14 13:45:46.872036',694.06829,1526305501),(62,'LTC','2018-05-14 13:45:47.406885',136.33832,1526305501),(63,'ETH','2018-05-14 13:50:46.693433',701.98421,1526305801),(64,'LTC','2018-05-14 13:50:47.097871',137.89675,1526305801),(65,'ETH','2018-05-21 15:00:06.282877',699.97351,1526914802),(66,'LTC','2018-05-21 15:00:06.606932',135.24565,1526914802),(67,'ETH','2018-05-21 15:05:06.300230',697.14653,1526915101),(68,'LTC','2018-05-21 15:20:06.881047',135.54224,1526916001),(69,'ETH','2018-05-21 15:25:05.955999',699.73545,1526916242),(70,'LTC','2018-05-21 15:25:06.912117',135.55571,1526916242),(71,'ETH','2018-05-21 15:30:06.557893',698.34422,1526916602),(72,'LTC','2018-05-21 15:30:06.926004',135.39959,1526916602),(73,'ETH','2018-05-21 15:40:06.267852',699.25128,1526917201),(74,'LTC','2018-05-21 15:40:06.589819',135.44647,1526917201),(75,'ETH','2018-05-21 15:45:06.027144',699.42960,1526917501),(76,'LTC','2018-05-21 15:45:06.389442',135.47742,1526917501),(77,'ETH','2018-05-21 15:55:06.105836',701.26013,1526918102),(78,'LTC','2018-05-21 15:55:06.483828',135.61968,1526918102),(79,'ETH','2018-05-21 15:56:29.863170',700.72385,1526918162),(80,'LTC','2018-05-21 15:56:30.184209',135.71011,1526918162),(81,'ETH','2018-05-21 15:56:34.664084',700.72385,1526918162),(82,'LTC','2018-05-21 15:56:34.982822',135.71011,1526918162);
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ico_info`
--

LOCK TABLES `ico_info` WRITE;
/*!40000 ALTER TABLE `ico_info` DISABLE KEYS */;
INSERT INTO `ico_info` VALUES (1,'2018-05-07 17:02:45.350204',7000500000000002635),(2,'2018-05-14 10:48:37.275493',326775),(3,'2018-05-14 10:53:37.826855',326775),(4,'2018-05-14 11:32:25.345912',330621),(5,'2018-05-14 11:37:25.256305',330621),(6,'2018-05-14 11:42:25.272567',330621),(7,'2018-05-14 11:47:26.287022',407642),(8,'2018-05-14 11:59:41.879913',407642),(9,'2018-05-14 12:04:42.531795',407642),(10,'2018-05-14 12:09:41.789103',407642),(11,'2018-05-14 12:14:42.171143',407642),(12,'2018-05-14 12:19:42.037648',407642),(13,'2018-05-14 12:24:41.902509',407642),(14,'2018-05-14 12:29:41.942251',407642),(15,'2018-05-14 13:45:47.621833',411630),(16,'2018-05-14 13:50:47.297321',411630),(17,'2018-05-21 15:00:05.852948',533964),(18,'2018-05-21 15:05:05.790816',533964),(19,'2018-05-21 15:10:07.361777',533964),(20,'2018-05-21 15:15:07.222247',533964),(21,'2018-05-21 15:20:05.831268',533964),(22,'2018-05-21 15:25:07.120520',533964),(23,'2018-05-21 15:30:05.829948',533964),(24,'2018-05-21 15:35:07.122726',533964),(25,'2018-05-21 15:40:05.845481',533964),(26,'2018-05-21 15:45:06.588430',533964);
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
  `tokens_amount` decimal(65,2) NOT NULL,
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
INSERT INTO `investors` VALUES ('pbkdf2_sha256$100000$5UkOyNb50hXL$rCnfh7YYLWeneE9Z4OelYN8Md5dMziHIxL7C9mSKy28=','2018-05-15 17:59:13.924841',1,'gordon@ongrid.pro','0xB0a3f48478d84a497f930d8455711d9981B66a70',155965.00,'2018-05-07 12:54:26.040096','zDRWykOg0iH6LKz8',1,NULL);
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
  `document_type` varchar(50) COLLATE utf8_bin NOT NULL,
  `photo` varchar(100) COLLATE utf8_bin NOT NULL,
  `selfie` varchar(100) COLLATE utf8_bin NOT NULL,
  `decline_reason` longtext COLLATE utf8_bin,
  `approve_txn_hash` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `investor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `investor_id` (`investor_id`),
  CONSTRAINT `kyc_investor_id_1910e4d7_fk_investors_id` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kyc`
--

LOCK TABLES `kyc` WRITE;
/*!40000 ALTER TABLE `kyc` DISABLE KEYS */;
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
  KEY `payments_tokens_move_id_8d316d9f_fk_toknes_moves_id` (`tokens_move_id`),
  CONSTRAINT `payments_tokens_move_id_8d316d9f_fk_toknes_moves_id` FOREIGN KEY (`tokens_move_id`) REFERENCES `toknes_moves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (7,'LTC','mqZutf2dbv2oW9KzTM9NpiimhpqWAYLuoG',0.100000000000000000,10000000,'f790dc4cc3f0e5f565efe50593de8cc5','007b6fb10f7906ea2ae8e99c62434dfaf0b70c89c1e0e7b8c628dca329cfad03','2018-05-14 11:27:59.582605',9),(8,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x3893af392eeefa2cb606cd4ef00eccf86bfde80856ed27396770586cef3d7541','2018-05-14 11:42:55.597198',10),(9,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x675a4aa4003b2b3ceedcc7c3e0ecedfbd58f24f326592ee023222addb0dc68ad','2018-05-21 15:47:36.747004',11);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phases`
--

LOCK TABLES `phases` WRITE;
/*!40000 ALTER TABLE `phases` DISABLE KEYS */;
INSERT INTO `phases` VALUES (1,'Current Phase','2018-04-14 10:35:12.701000','2018-06-14 10:35:17.121000',40);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_usersocialauth`
--

LOCK TABLES `social_auth_usersocialauth` WRITE;
/*!40000 ALTER TABLE `social_auth_usersocialauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_auth_usersocialauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `toknes_moves`
--

DROP TABLE IF EXISTS `toknes_moves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `toknes_moves` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(65,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `actualized_at` datetime(6) DEFAULT NULL,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  `direction` varchar(3) COLLATE utf8_bin NOT NULL,
  `investor_id` int(11) NOT NULL,
  `transfer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `toknes_moves_investor_id_4a76f033_fk_investors_id` (`investor_id`),
  KEY `toknes_moves_transfer_id_75f22b77_fk_transfers_id` (`transfer_id`),
  CONSTRAINT `toknes_moves_investor_id_4a76f033_fk_investors_id` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`),
  CONSTRAINT `toknes_moves_transfer_id_75f22b77_fk_transfers_id` FOREIGN KEY (`transfer_id`) REFERENCES `transfers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `toknes_moves`
--

LOCK TABLES `toknes_moves` WRITE;
/*!40000 ALTER TABLE `toknes_moves` DISABLE KEYS */;
INSERT INTO `toknes_moves` VALUES (9,1923.00,'2018-05-14 11:27:59.581740','2018-05-14 11:28:25.211111','ACTUAL','IN',1,10),(10,77021.00,'2018-05-14 11:42:55.265664','2018-05-14 11:42:55.265730','ACTUAL','IN',1,11),(11,77021.00,'2018-05-21 15:47:36.451733','2018-05-21 15:47:36.451844','ACTUAL','IN',1,12);
/*!40000 ALTER TABLE `toknes_moves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfers`
--

DROP TABLE IF EXISTS `transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transfers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `txn_hash` varchar(100) COLLATE utf8_bin NOT NULL,
  `account_to` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `account_from` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `amount` decimal(65,0) DEFAULT NULL,
  `block_hash` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `block_number` int(10) unsigned DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `actualized_at` datetime(6) DEFAULT NULL,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `txn_hash` (`txn_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfers`
--

LOCK TABLES `transfers` WRITE;
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` VALUES (10,'0x5b89564130fe4b6c988ed4f97cc3ddba5bdc7a49797477cfc1a5bb23436b2f99','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1923,'0x032ab5b5077407dd8dbe75bcd750ca8f7ec792e675793f397f3a7110bb7e6d65',2281816,'2018-05-14 11:28:25.159705','2018-05-14 11:28:25.204549','ACTUAL'),(11,'0x3893af392eeefa2cb606cd4ef00eccf86bfde80856ed27396770586cef3d7541','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0x004ef6f3be8bbec9c099a357a643be1b3ee040867abc34c1d5b5d7da76c266f8',2281873,'2018-05-14 11:42:55.215043','2018-05-14 11:42:55.258846','ACTUAL'),(12,'0x675a4aa4003b2b3ceedcc7c3e0ecedfbd58f24f326592ee023222addb0dc68ad','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0x4ef40afb1e9832f4e5479468e317fe7519c3972dd93a2ca64120005099c6876e',2323173,'2018-05-21 15:47:35.974480','2018-05-21 15:47:36.383868','ACTUAL');
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

-- Dump completed on 2018-05-21 19:03:44
