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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2018-05-04 18:35:11.228812'),(2,'auth','0001_initial','2018-05-04 18:35:11.657595'),(3,'admin','0001_initial','2018-05-04 18:35:11.746545'),(4,'admin','0002_logentry_remove_auto_add','2018-05-04 18:35:11.754991'),(5,'contenttypes','0002_remove_content_type_name','2018-05-04 18:35:11.825597'),(6,'auth','0002_alter_permission_name_max_length','2018-05-04 18:35:11.853800'),(7,'auth','0003_alter_user_email_max_length','2018-05-04 18:35:11.888480'),(8,'auth','0004_alter_user_username_opts','2018-05-04 18:35:11.900704'),(9,'auth','0005_alter_user_last_login_null','2018-05-04 18:35:11.930613'),(10,'auth','0006_require_contenttypes_0002','2018-05-04 18:35:11.932256'),(11,'auth','0007_alter_validators_add_error_messages','2018-05-04 18:35:11.939903'),(12,'auth','0008_alter_user_username_max_length','2018-05-04 18:35:12.021559'),(13,'auth','0009_alter_user_last_name_max_length','2018-05-04 18:35:12.051059'),(14,'sessions','0001_initial','2018-05-04 18:35:12.094966'),(15,'user_office','0001_initial','2018-05-04 18:35:12.546869'),(16,'default','0001_initial','2018-05-04 18:35:12.750183'),(17,'social_auth','0001_initial','2018-05-04 18:35:12.752382'),(18,'default','0002_add_related_name','2018-05-04 18:35:12.809591'),(19,'social_auth','0002_add_related_name','2018-05-04 18:35:12.811980'),(20,'default','0003_alter_email_max_length','2018-05-04 18:35:12.840888'),(21,'social_auth','0003_alter_email_max_length','2018-05-04 18:35:12.843284'),(22,'default','0004_auto_20160423_0400','2018-05-04 18:35:12.856018'),(23,'social_auth','0004_auto_20160423_0400','2018-05-04 18:35:12.858738'),(24,'social_auth','0005_auto_20160727_2333','2018-05-04 18:35:12.880006'),(25,'social_django','0006_partial','2018-05-04 18:35:12.920013'),(26,'social_django','0007_code_timestamp','2018-05-04 18:35:12.980153'),(27,'social_django','0008_partial_timestamp','2018-05-04 18:35:13.040114'),(28,'social_django','0004_auto_20160423_0400','2018-05-04 18:35:13.044494'),(29,'social_django','0001_initial','2018-05-04 18:35:13.049576'),(30,'social_django','0002_add_related_name','2018-05-04 18:35:13.051934'),(31,'social_django','0005_auto_20160727_2333','2018-05-04 18:35:13.053967'),(32,'social_django','0003_alter_email_max_length','2018-05-04 18:35:13.055849'),(33,'user_office','0002_auto_20180504_2015','2018-05-04 20:16:02.164926'),(34,'user_office','0003_auto_20180507_1931','2018-05-07 19:31:21.675462'),(35,'user_office','0004_auto_20180508_1954','2018-05-08 19:54:14.964156'),(36,'user_office','0005_auto_20180515_1738','2018-05-15 17:39:56.412354'),(37,'user_office','0006_auto_20180517_1439','2018-05-17 19:41:17.837609'),(38,'user_office','0007_auto_20180517_1906','2018-05-17 19:41:17.930276'),(39,'user_office','0008_auto_20180517_1941','2018-05-17 19:41:17.963712'),(40,'user_office','0009_auto_20180521_1536','2018-05-21 15:37:00.601771'),(41,'user_office','0010_auto_20180521_2017','2018-05-21 20:17:14.788257'),(42,'user_office','0011_auto_20180521_2057','2018-05-21 20:58:09.311112');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_processing`
--

LOCK TABLES `events_processing` WRITE;
/*!40000 ALTER TABLE `events_processing` DISABLE KEYS */;
INSERT INTO `events_processing` VALUES (22,'2018-05-22 16:42:33.694517','0xfd4e1b4d331f3299bffbd5eaa5ce8041',2329011,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange_rates`
--

LOCK TABLES `exchange_rates` WRITE;
/*!40000 ALTER TABLE `exchange_rates` DISABLE KEYS */;
INSERT INTO `exchange_rates` VALUES (1,'ETH','2018-05-07 17:02:45.866853',730.54485,1525712521),(2,'ETH','2018-05-07 17:24:10.744245',742.52028,1525713781),(3,'LTC','2018-05-07 17:24:11.117633',164.54383,1525713841),(4,'ETH','2018-05-07 17:53:36.511519',737.15328,1525715581),(5,'ETH','2018-05-07 17:53:50.162408',737.15328,1525715581),(6,'ETH','2018-05-07 17:55:00.133024',736.65440,1525715642),(7,'LTC','2018-05-07 17:55:00.517197',163.55917,1525715642),(8,'LTC','2018-05-07 17:55:31.143242',163.55917,1525715642),(9,'LTC','2018-05-07 17:55:34.951108',163.48817,1525715701),(10,'LTC','2018-05-07 17:56:01.896189',163.48817,1525715701),(11,'LTC','2018-05-07 17:56:13.205703',163.48817,1525715701),(12,'ETH','2018-05-07 17:56:19.016014',733.25434,1525715761),(13,'ETH','2018-05-07 17:56:38.926465',733.49247,1525715701),(14,'ETH','2018-05-07 17:56:54.422479',733.25434,1525715761),(15,'ETH','2018-05-07 17:56:57.288658',733.25434,1525715761),(16,'LTC','2018-05-07 17:57:00.095398',163.48817,1525715701),(17,'LTC','2018-05-07 17:57:02.230685',163.49676,1525715761),(18,'ETH','2018-05-07 17:57:38.693018',733.25434,1525715761),(19,'ETH','2018-05-07 17:57:49.826265',734.29366,1525715822),(20,'ETH','2018-05-07 17:57:52.068299',733.25434,1525715761),(21,'ETH','2018-05-07 17:58:43.009222',734.29366,1525715822),(22,'LTC','2018-05-07 17:58:43.388572',163.36261,1525715881),(23,'ETH','2018-05-07 17:58:54.780214',734.37634,1525715881),(24,'ETH','2018-05-07 17:59:29.273716',735.01436,1525715941),(25,'ETH','2018-05-07 17:59:37.908012',734.37634,1525715881),(26,'LTC','2018-05-07 17:59:40.511102',163.39105,1525715941),(27,'LTC','2018-05-07 17:59:46.128226',163.39105,1525715941),(28,'ETH','2018-05-14 10:43:37.797960',706.41828,1526294581),(29,'ETH','2018-05-14 10:48:37.675286',707.36440,1526294881),(30,'LTC','2018-05-14 10:48:38.322975',137.35149,1526294881),(31,'ETH','2018-05-14 10:53:38.341466',706.66587,1526295181),(32,'ETH','2018-05-14 11:32:25.799155',714.98659,1526297522),(33,'LTC','2018-05-14 11:32:26.115503',138.28368,1526297462),(34,'ETH','2018-05-14 11:37:25.642079',713.49897,1526297821),(35,'LTC','2018-05-14 11:37:25.954635',138.90532,1526297821),(36,'ETH','2018-05-14 11:42:25.656085',711.09545,1526298121),(37,'LTC','2018-05-14 11:42:26.245834',138.43177,1526298121),(38,'ETH','2018-05-14 11:47:25.699220',711.15631,1526298421),(39,'LTC','2018-05-14 11:47:26.088485',138.69794,1526298421),(40,'ETH','2018-05-14 12:00:12.058534',713.20092,1526299141),(41,'LTC','2018-05-14 12:00:12.507179',139.04274,1526299141),(42,'ETH','2018-05-14 12:05:12.092233',711.40177,1526299441),(43,'ETH','2018-05-14 12:10:12.065290',709.97375,1526299741),(44,'LTC','2018-05-14 12:10:12.422957',138.08965,1526299741),(45,'ETH','2018-05-14 12:15:11.973283',708.63882,1526300041),(46,'LTC','2018-05-14 12:15:12.548849',138.13881,1526300101),(47,'ETH','2018-05-14 12:20:12.019746',704.49318,1526300401),(48,'LTC','2018-05-14 12:20:12.378538',138.10513,1526300341),(49,'ETH','2018-05-14 12:25:12.293378',706.85525,1526300641),(50,'LTC','2018-05-14 12:25:12.765321',138.20317,1526300702),(51,'ETH','2018-05-14 12:30:12.283904',706.30416,1526301002),(52,'LTC','2018-05-14 12:30:12.714548',138.01398,1526301002),(53,'ETH','2018-05-14 12:39:37.101225',704.37304,1526301541),(54,'LTC','2018-05-14 12:39:43.396142',137.87829,1526301541),(55,'ETH','2018-05-14 12:40:14.595799',704.61200,1526301601),(56,'LTC','2018-05-14 12:40:15.514980',137.90309,1526301601),(57,'ETH','2018-05-14 13:35:50.886818',688.77244,1526304902),(58,'LTC','2018-05-14 13:35:51.394642',135.78651,1526304902),(59,'ETH','2018-05-14 13:40:46.569842',695.26424,1526305201),(60,'LTC','2018-05-14 13:40:46.946455',136.33988,1526305141),(61,'ETH','2018-05-14 13:45:46.872036',694.06829,1526305501),(62,'LTC','2018-05-14 13:45:47.406885',136.33832,1526305501),(63,'ETH','2018-05-14 13:50:46.693433',701.98421,1526305801),(64,'LTC','2018-05-14 13:50:47.097871',137.89675,1526305801),(65,'ETH','2018-05-21 15:00:06.282877',699.97351,1526914802),(66,'LTC','2018-05-21 15:00:06.606932',135.24565,1526914802),(67,'ETH','2018-05-21 15:05:06.300230',697.14653,1526915101),(68,'LTC','2018-05-21 15:20:06.881047',135.54224,1526916001),(69,'ETH','2018-05-21 15:25:05.955999',699.73545,1526916242),(70,'LTC','2018-05-21 15:25:06.912117',135.55571,1526916242),(71,'ETH','2018-05-21 15:30:06.557893',698.34422,1526916602),(72,'LTC','2018-05-21 15:30:06.926004',135.39959,1526916602),(73,'ETH','2018-05-21 15:40:06.267852',699.25128,1526917201),(74,'LTC','2018-05-21 15:40:06.589819',135.44647,1526917201),(75,'ETH','2018-05-21 15:45:06.027144',699.42960,1526917501),(76,'LTC','2018-05-21 15:45:06.389442',135.47742,1526917501),(77,'ETH','2018-05-21 15:55:06.105836',701.26013,1526918102),(78,'LTC','2018-05-21 15:55:06.483828',135.61968,1526918102),(79,'ETH','2018-05-21 15:56:29.863170',700.72385,1526918162),(80,'LTC','2018-05-21 15:56:30.184209',135.71011,1526918162),(81,'ETH','2018-05-21 15:56:34.664084',700.72385,1526918162),(82,'LTC','2018-05-21 15:56:34.982822',135.71011,1526918162),(83,'ETH','2018-05-21 16:21:28.642199',696.87431,1526919662),(84,'LTC','2018-05-21 16:21:29.021806',135.52437,1526919662),(85,'ETH','2018-05-21 16:26:28.305512',695.96035,1526919961),(86,'LTC','2018-05-21 16:26:28.613889',135.39583,1526919961),(87,'ETH','2018-05-21 16:31:28.362710',695.88826,1526920262),(88,'LTC','2018-05-21 16:31:28.733023',135.29744,1526920262),(89,'ETH','2018-05-21 16:48:33.107498',698.11431,1526921281),(90,'LTC','2018-05-21 16:48:33.421626',135.37319,1526921281),(91,'LTC','2018-05-21 16:53:33.749239',135.20863,1526921521),(92,'ETH','2018-05-21 16:58:34.201479',697.72549,1526921881),(93,'LTC','2018-05-21 16:58:34.588536',135.28957,1526921881),(94,'ETH','2018-05-21 17:03:33.034553',697.64198,1526922121),(95,'LTC','2018-05-21 17:03:33.388050',135.26977,1526922181),(96,'ETH','2018-05-21 17:08:33.069712',697.23083,1526922481),(97,'ETH','2018-05-21 17:13:32.853939',696.98847,1526922721),(98,'LTC','2018-05-21 17:13:33.234945',135.14360,1526922781);
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ico_info`
--

LOCK TABLES `ico_info` WRITE;
/*!40000 ALTER TABLE `ico_info` DISABLE KEYS */;
INSERT INTO `ico_info` VALUES (1,'2018-05-07 17:02:45.350204',7000500000000002635),(2,'2018-05-14 10:48:37.275493',326775),(3,'2018-05-14 10:53:37.826855',326775),(4,'2018-05-14 11:32:25.345912',330621),(5,'2018-05-14 11:37:25.256305',330621),(6,'2018-05-14 11:42:25.272567',330621),(7,'2018-05-14 11:47:26.287022',407642),(8,'2018-05-14 11:59:41.879913',407642),(9,'2018-05-14 12:04:42.531795',407642),(10,'2018-05-14 12:09:41.789103',407642),(11,'2018-05-14 12:14:42.171143',407642),(12,'2018-05-14 12:19:42.037648',407642),(13,'2018-05-14 12:24:41.902509',407642),(14,'2018-05-14 12:29:41.942251',407642),(15,'2018-05-14 13:45:47.621833',411630),(16,'2018-05-14 13:50:47.297321',411630),(17,'2018-05-21 15:00:05.852948',533964),(18,'2018-05-21 15:05:05.790816',533964),(19,'2018-05-21 15:10:07.361777',533964),(20,'2018-05-21 15:15:07.222247',533964),(21,'2018-05-21 15:20:05.831268',533964),(22,'2018-05-21 15:25:07.120520',533964),(23,'2018-05-21 15:30:05.829948',533964),(24,'2018-05-21 15:35:07.122726',533964),(25,'2018-05-21 15:40:05.845481',533964),(26,'2018-05-21 15:45:06.588430',533964),(27,'2018-05-21 16:21:28.248310',697976),(28,'2018-05-21 16:26:27.920191',697976),(29,'2018-05-21 16:31:27.988469',697976),(30,'2018-05-21 16:48:32.765207',697976),(31,'2018-05-21 16:53:32.708509',697976),(32,'2018-05-21 16:58:33.191109',697976),(33,'2018-05-21 17:03:32.726803',697976),(34,'2018-05-21 17:08:32.733918',697976),(35,'2018-05-21 17:13:33.426049',697976),(36,'2018-05-21 17:18:32.740874',699970);
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
INSERT INTO `investors` VALUES ('pbkdf2_sha256$100000$5UkOyNb50hXL$rCnfh7YYLWeneE9Z4OelYN8Md5dMziHIxL7C9mSKy28=','2018-05-15 17:59:13.924841',1,'gordon@ongrid.pro','0xB0a3f48478d84a497f930d8455711d9981B66a70',605958.00,'2018-05-07 12:54:26.040096','zDRWykOg0iH6LKz8',1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kyc`
--

LOCK TABLES `kyc` WRITE;
/*!40000 ALTER TABLE `kyc` DISABLE KEYS */;
INSERT INTO `kyc` VALUES (1,'APPROVED','OuLRbKgliq','uYYjRfgYdL','KeYoCJLuzY','jKhALnNdnV','2003-12-17','0','Passport','kyc/1/photo/example.jpg','kyc/1/selfie/example.jpg',NULL,'0x9603f815f3f49b064634625c3afa19e1e11a84ae43897424c134cd7a77fbe999425c',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (40,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.230000000000000000,1230000000000000000,NULL,'0x3528ca76a93a02edd1f0b4aace3e45e63cd3d3ff277870e8d661a798a71f85e8','2018-05-22 16:42:36.033967',234),(41,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x4a20c3d5445fec65d5cbf1bdcf82f3aa54838ad1cf7e3019229d0980bceee0f4','2018-05-22 16:42:36.296725',242),(42,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x3893af392eeefa2cb606cd4ef00eccf86bfde80856ed27396770586cef3d7541','2018-05-22 16:42:40.835220',272),(43,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',0.100000000000000000,100000000000000000,NULL,'0x03059d2153218d04f15963d1875af3aeeab4d54e4eea317428916555f0f13f72','2018-05-22 16:42:42.972007',290),(44,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',0.100000000000000000,100000000000000000,NULL,'0x7137e18890be5985475dc7a86182c7747be62c4e647cf48092c635d1fb3f34fc','2018-05-22 16:42:43.082382',291),(45,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',0.500000000000000000,500000000000000000,NULL,'0x6638e6f4a63154a41bf8ca79d8fcab6cbd291744f5db8fa8eca4dd81a1e31fce','2018-05-22 16:42:43.260258',292),(46,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',0.500000000000000000,500000000000000000,NULL,'0x1c14226c21b16aca553378cd254fa41076cad29a46b56daa78fa53446fe67ae7','2018-05-22 16:42:43.371130',293),(47,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x675a4aa4003b2b3ceedcc7c3e0ecedfbd58f24f326592ee023222addb0dc68ad','2018-05-22 16:42:43.492499',294),(48,'ETH','0xB0a3f48478d84a497f930d8455711d9981B66a70',1.000000000000000000,1000000000000000000,NULL,'0x9a46b3843315cc999c54a7f531d5827af64c187269a7b9359030611092dc257b','2018-05-22 16:42:44.209786',300);
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
  `investor_account` varchar(42) COLLATE utf8_bin NOT NULL,
  `transfer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `toknes_moves_investor_id_4a76f033_fk_investors_id` (`investor_account`),
  KEY `toknes_moves_transfer_id_75f22b77_fk_transfers_id` (`transfer_id`),
  CONSTRAINT `toknes_moves_transfer_id_75f22b77_fk_transfers_id` FOREIGN KEY (`transfer_id`) REFERENCES `transfers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=304 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `toknes_moves`
--

LOCK TABLES `toknes_moves` WRITE;
/*!40000 ALTER TABLE `toknes_moves` DISABLE KEYS */;
INSERT INTO `toknes_moves` VALUES (233,0.00,'2018-05-22 16:42:35.643928','2018-05-22 16:42:35.644120','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',240),(234,94735.00,'2018-05-22 16:42:35.675090','2018-05-22 16:42:35.675300','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',242),(235,90000.00,'2018-05-22 16:42:35.674789','2018-05-22 16:42:35.675221','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',241),(236,4000.00,'2018-05-22 16:42:35.682209','2018-05-22 16:42:35.682386','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',243),(237,90000.00,'2018-05-22 16:42:35.686321','2018-05-22 16:42:35.686391','ACTUAL','OUT','0xB0a3f48478d84a497f930d8455711d9981B66a70',241),(238,4000.00,'2018-05-22 16:42:35.697909','2018-05-22 16:42:35.697958','ACTUAL','OUT','0xB0a3f48478d84a497f930d8455711d9981B66a70',243),(239,100000.00,'2018-05-22 16:42:35.816053','2018-05-22 16:42:35.816103','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',244),(240,4000.00,'2018-05-22 16:42:36.051348','2018-05-22 16:42:36.051403','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',245),(241,4000.00,'2018-05-22 16:42:36.055860','2018-05-22 16:42:36.055911','ACTUAL','OUT','0xB0a3f48478d84a497f930d8455711d9981B66a70',245),(242,77021.00,'2018-05-22 16:42:36.061801','2018-05-22 16:42:36.061851','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',246),(243,1995.00,'2018-05-22 16:42:36.068533','2018-05-22 16:42:36.068571','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',247),(244,1995.00,'2018-05-22 16:42:36.177965','2018-05-22 16:42:36.178022','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',248),(245,1995.00,'2018-05-22 16:42:36.184115','2018-05-22 16:42:36.184164','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',249),(246,1995.00,'2018-05-22 16:42:36.314413','2018-05-22 16:42:36.314474','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',250),(247,1995.00,'2018-05-22 16:42:36.547982','2018-05-22 16:42:36.548037','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',251),(248,1995.00,'2018-05-22 16:42:36.659295','2018-05-22 16:42:36.659380','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',252),(249,1995.00,'2018-05-22 16:42:36.854400','2018-05-22 16:42:36.854485','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',253),(250,1995.00,'2018-05-22 16:42:36.964397','2018-05-22 16:42:36.964477','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',254),(251,1995.00,'2018-05-22 16:42:37.200011','2018-05-22 16:42:37.200076','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',255),(252,1994.00,'2018-05-22 16:42:37.239375','2018-05-22 16:42:37.239425','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',256),(253,1994.00,'2018-05-22 16:42:37.351583','2018-05-22 16:42:37.351817','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',257),(254,1994.00,'2018-05-22 16:42:37.461834','2018-05-22 16:42:37.461878','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',258),(255,1994.00,'2018-05-22 16:42:37.564985','2018-05-22 16:42:37.565049','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',259),(256,1994.00,'2018-05-22 16:42:37.743378','2018-05-22 16:42:37.743417','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',260),(257,1994.00,'2018-05-22 16:42:37.859090','2018-05-22 16:42:37.859194','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',261),(258,1994.00,'2018-05-22 16:42:37.959555','2018-05-22 16:42:37.959626','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',262),(259,1994.00,'2018-05-22 16:42:38.075547','2018-05-22 16:42:38.075587','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',263),(260,1994.00,'2018-05-22 16:42:38.193953','2018-05-22 16:42:38.194023','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',264),(261,1994.00,'2018-05-22 16:42:38.351861','2018-05-22 16:42:38.351934','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',265),(262,1994.00,'2018-05-22 16:42:38.587217','2018-05-22 16:42:38.587287','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',266),(263,1994.00,'2018-05-22 16:42:38.790885','2018-05-22 16:42:38.790931','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',267),(264,1994.00,'2018-05-22 16:42:38.863945','2018-05-22 16:42:38.864010','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',268),(265,1994.00,'2018-05-22 16:42:39.127636','2018-05-22 16:42:39.127693','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',269),(266,2287.00,'2018-05-22 16:42:39.336418','2018-05-22 16:42:39.336491','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',270),(267,2287.00,'2018-05-22 16:42:39.529365','2018-05-22 16:42:39.529416','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',271),(268,2287.00,'2018-05-22 16:42:39.785150','2018-05-22 16:42:39.785223','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',272),(269,2287.00,'2018-05-22 16:42:39.908767','2018-05-22 16:42:39.908851','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',273),(270,1923.00,'2018-05-22 16:42:40.010166','2018-05-22 16:42:40.010224','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',274),(271,1923.00,'2018-05-22 16:42:40.224203','2018-05-22 16:42:40.224266','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',275),(272,77021.00,'2018-05-22 16:42:40.372417','2018-05-22 16:42:40.372491','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',276),(273,1994.00,'2018-05-22 16:42:40.452607','2018-05-22 16:42:40.452718','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',277),(274,1994.00,'2018-05-22 16:42:40.622426','2018-05-22 16:42:40.622486','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',278),(275,1994.00,'2018-05-22 16:42:40.730274','2018-05-22 16:42:40.730344','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',279),(276,1994.00,'2018-05-22 16:42:40.844792','2018-05-22 16:42:40.844856','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',280),(277,1994.00,'2018-05-22 16:42:41.007017','2018-05-22 16:42:41.007105','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',281),(278,1994.00,'2018-05-22 16:42:41.118341','2018-05-22 16:42:41.118396','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',282),(279,1994.00,'2018-05-22 16:42:41.275692','2018-05-22 16:42:41.275742','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',283),(280,1994.00,'2018-05-22 16:42:41.387678','2018-05-22 16:42:41.387722','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',284),(281,1994.00,'2018-05-22 16:42:41.541285','2018-05-22 16:42:41.541350','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',285),(282,1994.00,'2018-05-22 16:42:41.626217','2018-05-22 16:42:41.626304','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',286),(283,1994.00,'2018-05-22 16:42:41.742114','2018-05-22 16:42:41.742185','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',287),(284,1994.00,'2018-05-22 16:42:41.845360','2018-05-22 16:42:41.845429','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',288),(285,1994.00,'2018-05-22 16:42:41.954543','2018-05-22 16:42:41.954626','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',289),(286,1994.00,'2018-05-22 16:42:42.061001','2018-05-22 16:42:42.061046','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',290),(287,1994.00,'2018-05-22 16:42:42.201994','2018-05-22 16:42:42.202053','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',291),(288,1994.00,'2018-05-22 16:42:42.310320','2018-05-22 16:42:42.310375','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',292),(289,1994.00,'2018-05-22 16:42:42.409451','2018-05-22 16:42:42.409490','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',293),(290,7702.00,'2018-05-22 16:42:42.525144','2018-05-22 16:42:42.525187','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',294),(291,7702.00,'2018-05-22 16:42:42.642132','2018-05-22 16:42:42.642201','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',295),(292,38510.00,'2018-05-22 16:42:42.757021','2018-05-22 16:42:42.757097','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',296),(293,38510.00,'2018-05-22 16:42:42.874544','2018-05-22 16:42:42.874594','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',297),(294,77021.00,'2018-05-22 16:42:42.983214','2018-05-22 16:42:42.983269','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',298),(295,1994.00,'2018-05-22 16:42:43.138824','2018-05-22 16:42:43.138868','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',299),(296,1994.00,'2018-05-22 16:42:43.270878','2018-05-22 16:42:43.270924','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',300),(297,1994.00,'2018-05-22 16:42:43.385029','2018-05-22 16:42:43.385084','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',301),(298,1994.00,'2018-05-22 16:42:43.512677','2018-05-22 16:42:43.512759','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',302),(299,1994.00,'2018-05-22 16:42:43.610986','2018-05-22 16:42:43.611050','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',303),(300,77021.00,'2018-05-22 16:42:43.723715','2018-05-22 16:42:43.723785','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',304),(301,1994.00,'2018-05-22 16:42:43.904647','2018-05-22 16:42:43.904719','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',305),(302,1994.00,'2018-05-22 16:42:44.011092','2018-05-22 16:42:44.011158','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',306),(303,1994.00,'2018-05-22 16:42:44.117095','2018-05-22 16:42:44.117141','ACTUAL','IN','0xB0a3f48478d84a497f930d8455711d9981B66a70',307);
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
) ENGINE=InnoDB AUTO_INCREMENT=308 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfers`
--

LOCK TABLES `transfers` WRITE;
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` VALUES (240,'0x0ec78427e0fdb5d5fe9fb24f907ea9b3704775b720f1fee3c447ad28e276293f','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',0,'0x075bbabeb4998df622dfe199957483e334e4a33e4501efcc966b1882f4bfb8d2',2224277,'2018-05-22 16:42:35.502002','2018-05-22 16:42:35.636758','ACTUAL'),(241,'0xd04dff3daa89a5898793cd426e95e2ed39d1cccc19e1213e815aca97a0d9c0f0','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0xB0a3f48478d84a497f930d8455711d9981B66a70',90000,'0x59e0d99753a0c4e40aa5374dadf1ea8dbab7be5c34b626e82d749167b21419c4',2241352,'2018-05-22 16:42:35.502768','2018-05-22 16:42:35.636732','ACTUAL'),(242,'0x3528ca76a93a02edd1f0b4aace3e45e63cd3d3ff277870e8d661a798a71f85e8','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',94735,'0x6d7cff1b792eb4089ed30c87064c1bcb11b0608c94734727f9ff6bfa828d75b8',2224221,'2018-05-22 16:42:35.501215','2018-05-22 16:42:35.636798','ACTUAL'),(243,'0x85fb8ddffaa8d21cb1b013b0538ed56b551ca4acea4d34181da8b93723615791','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0xB0a3f48478d84a497f930d8455711d9981B66a70',4000,'0xfba4b4590aa6e629a1e2b6bfaae11bb302ca454edf572980cac8451e481ec45a',2242827,'2018-05-22 16:42:35.503523','2018-05-22 16:42:35.647702','ACTUAL'),(244,'0x2236ad2c059aeaf9ddb78025cfbba33e0f80328f6d18365f025b97434268568c','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',100000,'0x454b20ea2a6cd17d0634c33895c7c0523a621b44aa0148f3ebd147ab3898a013',2242885,'2018-05-22 16:42:35.504283','2018-05-22 16:42:35.813827','ACTUAL'),(245,'0xf56b1b1e1c6ae0caf95a137b974fc5ee9c46d94d52e80705ce0f18f1e8e879dd','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0xB0a3f48478d84a497f930d8455711d9981B66a70',4000,'0x84184ce55d94f1d1872c1f64ba17f2d2dc6327c7dbe8637dc88b8a43f867ba8d',2242901,'2018-05-22 16:42:35.505032','2018-05-22 16:42:36.048754','ACTUAL'),(246,'0x4a20c3d5445fec65d5cbf1bdcf82f3aa54838ad1cf7e3019229d0980bceee0f4','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0xb0e2b6dfa3a035e3e57929a0ae0634500ff6a9e22ea6ed676d1a024adf7a9f6c',2242910,'2018-05-22 16:42:35.505886','2018-05-22 16:42:36.059282','ACTUAL'),(247,'0xdb9665f9000f6c77d625247f57a049f5bd4c6c26fb5215a45007ebd960f20f43','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0xe1941976829752883c285496e612c5f7d884cf5a26fa54dd2a4879e4bad8b8f9',2264448,'2018-05-22 16:42:35.506785','2018-05-22 16:42:36.066205','ACTUAL'),(248,'0xeefe6b7f74a36f60c4b01e75916e264ad718650af6aadcb57ff2c78e7c85c5b1','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x71558467adb084d8e6e4b2802aa36776724a3b78580e0c1ee55c79993d7681bb',2264450,'2018-05-22 16:42:35.507588','2018-05-22 16:42:36.174111','ACTUAL'),(249,'0x82bc30876e579e533313d178f43372cbc4da56e7368451d893fde30f99a988e8','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0xd4c8a638d7eb189c3cb15efa34b0e4febbf86eafe7053ed472f10ba3a58c73e9',2264482,'2018-05-22 16:42:35.508347','2018-05-22 16:42:36.181829','ACTUAL'),(250,'0x3364020c0003903baf23bfda273841c4461799a4ee3ae3ecad788b1f9f72b65a','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x3d5d8cec2a2bad0041de81c78f57bc93735b9c340c8fd9ce8caf4f4111ba78a2',2265112,'2018-05-22 16:42:35.509105','2018-05-22 16:42:36.311041','ACTUAL'),(251,'0xb414b9abff5af21be476db70a525845d236fa76b813328a00b51a6888caf0e42','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x92fe347ea9cba65f362c0fdb0b1c3ce4870f15bce219d74329cac6e601e70dd1',2265115,'2018-05-22 16:42:35.509892','2018-05-22 16:42:36.545537','ACTUAL'),(252,'0x70a76d8ff4a38bced47602d230acfb4b402a24d178eb34ef6cc663a9f8b3a6ac','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x42cff750c4c702aee7bbb2241370f84ccfae9212e38f0bf5ffb7b3845b9ac61b',2265129,'2018-05-22 16:42:35.510663','2018-05-22 16:42:36.656134','ACTUAL'),(253,'0xb92eca6c9d2c82ee197cc05faea34fc10156b06da4bc7d763ec85b6077c087d8','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x5ee570c0aa2dee662c772888e9a6a054763dbb29de8b62e2c6bdb911793cecd8',2265133,'2018-05-22 16:42:35.511517','2018-05-22 16:42:36.851336','ACTUAL'),(254,'0x0a4c4dff2a49e96049e2a3f04f51e6887f1ed3f5278d702cef2fc443e6d1b7f0','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x34ed00dffe25fd4f8a6c591517881573c64e362a7777221c5ba78af52151f023',2265140,'2018-05-22 16:42:35.512283','2018-05-22 16:42:36.960670','ACTUAL'),(255,'0x1ec4d9b84ae4dd7c85b5af2d617faf5c9ce8a7840efdafadcdfa24472d83c1c4','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1995,'0x6cda24e04c00afa7cf2b7ce77814d559ff122f666f139dceb9ce8ec0322f2af8',2265152,'2018-05-22 16:42:35.513054','2018-05-22 16:42:37.161439','ACTUAL'),(256,'0xf4e1e7aa65f9533d8f046c59dcf6d58e91dae52820a0a2bd37974c673f7b2bb1','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xcce8436762bbd60927c61a05cf9aa685260ee74362bfa42cabb4934682d3bb12',2265166,'2018-05-22 16:42:35.513812','2018-05-22 16:42:37.235971','ACTUAL'),(257,'0x93b6bc80a0a67cbfcd69ee4017ff563dd68c3b8bd179eb0a5375eb5a65c966d8','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x9da2526e14630b1abc64da73d495ccbe91ca07477ef5ed0402a2c45223117dcf',2265177,'2018-05-22 16:42:35.514576','2018-05-22 16:42:37.348853','ACTUAL'),(258,'0x877f764a853483512ff05860b9f4bd4d165ce8924ef808afdfd25fe33c77af6a','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x7e0e8d1f45f6a2b6db3b2d0e541cfd88bd5ea629ecfed425779d1c1c43679487',2265189,'2018-05-22 16:42:35.515330','2018-05-22 16:42:37.459223','ACTUAL'),(259,'0x7da4275b5a96b4e7b2892a51d873769164ab4073dd00958f936e4a39fc773539','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x2ff0e00f53098f9f662c0c56a3156cdbd7a3e67e6293d9acc7b508b9955bb5f1',2265194,'2018-05-22 16:42:35.516087','2018-05-22 16:42:37.561885','ACTUAL'),(260,'0x76f387407c5ffdd8263e8cee85047f14790534eb24c02d0acc37930fd28f99df','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x451c5ce5023d74e9fc23d8b840a748545a310c96d1a0d7e5b2bb3ff19e5ff151',2265257,'2018-05-22 16:42:35.516851','2018-05-22 16:42:37.740637','ACTUAL'),(261,'0x93a414d25ebcdea3817f0d0b1e95a469d70116c4f48587a6bad5a447d185493e','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x75e650fc6d0126a9df4931105dc128a1c422133dc197a582830a5cdabd1bdee6',2265292,'2018-05-22 16:42:35.517604','2018-05-22 16:42:37.856336','ACTUAL'),(262,'0x6e669f1ff8a7c613ed91b19a8c5b49d01628aee47b00b8f7c21a30a5b1e8140f','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xe69ab1712c2f7f1f5120e45bb834fb8baf3a3a5674325d12282f3185c53b73e7',2265295,'2018-05-22 16:42:35.518354','2018-05-22 16:42:37.956800','ACTUAL'),(263,'0xbb2794adc43cb289efc54f9052d03d97e06ecde07af577bc63489b4bb91b3654','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x3eef92f066d72bd7fe065ba7f3214350195040ec449c97b5019f1bfd189c8e28',2265299,'2018-05-22 16:42:35.519104','2018-05-22 16:42:38.071671','ACTUAL'),(264,'0x78eddd75cdef5aadd6b1af6ef2572ee82031c4699d1f689614e52cfb000bddd0','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xe819bc747c70e6923de3a38a083e8bd1133de488f3e7b121b508fe8fadfbebb5',2265301,'2018-05-22 16:42:35.519849','2018-05-22 16:42:38.190904','ACTUAL'),(265,'0xa819b32d4a1945e5f1c30c5403914e51db16d13eb6418789ef202c8b422ac90e','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xcd6435185cc0e78870a8561361afee90785ddb4ad856bda6bc48f9049a4b984c',2265409,'2018-05-22 16:42:35.520595','2018-05-22 16:42:38.349459','ACTUAL'),(266,'0xf716c26e9644f2d894f7c7a77b3232041535b6948818b9389b4f74a671545dbc','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x038e2cc04af067a6ab039913e30ae201e1ff3900855add8ee4d36120894ea7b9',2265439,'2018-05-22 16:42:35.521368','2018-05-22 16:42:38.584587','ACTUAL'),(267,'0x68330d9cac8e5129694f99c7b9128603140e4e3b573fc310c3a73b7db63bfae4','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb6e502cc77656ce5b3c96425814884166aafd5685db74d2e232db3d09c6150a9',2265441,'2018-05-22 16:42:35.522126','2018-05-22 16:42:38.788352','ACTUAL'),(268,'0xaa306d4151e982d0fd11da355ec43a2779e80010a5f9f1c2e42a0c0f9489dcfc','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xbe0ed265b004d17e8b80be5fd9f3073c975d2beb1d061dd220cdc37f3ed758bf',2265483,'2018-05-22 16:42:35.523059','2018-05-22 16:42:38.861794','ACTUAL'),(269,'0x91e784a8c9c9432dffe02d72a8d455a95401f72f9d6a35173d5526c52312cfcb','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x485c0ed99e7744241675a7bd6cec74592bb5c25379df9266cd18bd4fb0527b2c',2265486,'2018-05-22 16:42:35.523858','2018-05-22 16:42:39.125049','ACTUAL'),(270,'0x5d8c2c73fec323b59bf42487e923757a294c1b5b43ee84bf68ba9384161c443b','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',2287,'0x613791fba81b5383e9536dab788578c8e787d2fd46769f880b076decd393ccd3',2281606,'2018-05-22 16:42:35.524639','2018-05-22 16:42:39.333450','ACTUAL'),(271,'0xd2fa437a108dd4c23c3a7f9463922f9aa8dfd59dae1bd6d5328cfef8dc4e89bc','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',2287,'0x57428734512c62ed614526376cafd37bb5a4117d192e8a3c4d782b818f9a3d42',2281626,'2018-05-22 16:42:35.525399','2018-05-22 16:42:39.526937','ACTUAL'),(272,'0x79978d1c347a6b466540a88dcf84f71fcd8f8b356ea66f7fd073a39c7e29e79d','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',2287,'0x857ffbd09ccbe4088c1b9ba8217a4a2cb129dca01a408195b37ffa0b0746ec58',2281639,'2018-05-22 16:42:35.526156','2018-05-22 16:42:39.782577','ACTUAL'),(273,'0x13b855f27e297f679f0cb018f0ab1f324622fa3203d7f4018dae9a8ae0a03e08','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',2287,'0x80be7d9b7b211639b3265931c1aa2603eb67ab6e2bd2f03c57990ce9c77c7211',2281655,'2018-05-22 16:42:35.526909','2018-05-22 16:42:39.905674','ACTUAL'),(274,'0x4f5b8a0373e9aa9fc54be0e8a742e72b6e7bc5b85a3fb125c8b9f0497d363908','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1923,'0xf65bd40a001ff7318be0f9b47653fb033ffefa88294b803d66a960a6a73b75c9',2281812,'2018-05-22 16:42:35.527698','2018-05-22 16:42:40.007267','ACTUAL'),(275,'0x5b89564130fe4b6c988ed4f97cc3ddba5bdc7a49797477cfc1a5bb23436b2f99','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1923,'0x032ab5b5077407dd8dbe75bcd750ca8f7ec792e675793f397f3a7110bb7e6d65',2281816,'2018-05-22 16:42:35.528581','2018-05-22 16:42:40.220903','ACTUAL'),(276,'0x3893af392eeefa2cb606cd4ef00eccf86bfde80856ed27396770586cef3d7541','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0x004ef6f3be8bbec9c099a357a643be1b3ee040867abc34c1d5b5d7da76c266f8',2281873,'2018-05-22 16:42:35.529452','2018-05-22 16:42:40.369550','ACTUAL'),(277,'0xe5685925c1db5d42094a9eacfd5eee8307f4b8865e3c58e8a46f73d630162ab3','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb9c055e799daed48af1038dfab87f5ad89acfb614f45a71935d75ef8c287e44d',2282358,'2018-05-22 16:42:35.530211','2018-05-22 16:42:40.448135','ACTUAL'),(278,'0x1dfe150330348ed1009d89d6d560557932866cb19ee1a6bf63554f0b00c8ca2e','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb08d4b006efa5a6746ead8f4d1afaf01c6441c8c056721d824bd03da23cfb9cf',2282360,'2018-05-22 16:42:35.530973','2018-05-22 16:42:40.619940','ACTUAL'),(279,'0xce126a0e6263388a37e90f5d38abd89f16d1bb09224b38f0f98eb1c0cccb4c46','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xbbb83ba55bd5d6cd8194f6e07c223a57538fdf34448061b605e95de10b1989f2',2282761,'2018-05-22 16:42:35.531723','2018-05-22 16:42:40.727771','ACTUAL'),(280,'0x2b243767be9c2bf77bc41055f41c7e11ddbac8325229e574a2c72bf63b7d65d6','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x31b087e9af239d622f4005f4a6a87142fa2724a23ee701c14389649e75f396ff',2283399,'2018-05-22 16:42:35.532476','2018-05-22 16:42:40.842323','ACTUAL'),(281,'0xc2b4eea84963f6edcf20d2d698b63b4081b195f8acb721c983c6a0d1d3cf6238','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x5b5edddcbca86f3be775adef9b6a4b0a106080bf5d360813bc41c84803a940ea',2283417,'2018-05-22 16:42:35.533251','2018-05-22 16:42:41.004728','ACTUAL'),(282,'0x44f97ae54771cb9e7e8b0f4524f7466deb02c7d1df0ece5cbd9ad3aaf8f607f4','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x5e6021c4083fb36fecf851b160a222ce3a9a23934512e7cca1a81a5344c6451a',2288100,'2018-05-22 16:42:35.534011','2018-05-22 16:42:41.115039','ACTUAL'),(283,'0xe643d82d8474d7d49b75902250b5073edea69d8c20cf82db51d3780638eef374','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xa32850e460284013370d08879e2a07c49e614083abd2e18b4eeb679fda21a2fe',2288108,'2018-05-22 16:42:35.534851','2018-05-22 16:42:41.273381','ACTUAL'),(284,'0x5e0f0ca1f2d9f73b82227fb9afd1730c667186cc84c9b2944fbd5e61673edbd2','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xee737e01330e1c370408d729af536cb3af122cb7b3bb5ef77070aa88bc67d7e4',2288166,'2018-05-22 16:42:35.535630','2018-05-22 16:42:41.384680','ACTUAL'),(285,'0xc1a2247eb744b416718cf903a077fe2494d0de325be6457919798b811d011539','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xa7b6135598bffd3c6aaa66e484e3023a3b485ee0d058b02007252b6e8701c72e',2288242,'2018-05-22 16:42:35.536392','2018-05-22 16:42:41.538594','ACTUAL'),(286,'0xae7a302071204b220befd5a4f342c867025e324b6d87f058d3e210ddffdc3169','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x0c96bffdadc83dcf80ea23a8fe3aee854909af25ac72071bc703e71bad6a998e',2288252,'2018-05-22 16:42:35.537145','2018-05-22 16:42:41.621061','ACTUAL'),(287,'0x46fbe0c196573a74254104b97d7dfbe236956db0fbc047085bafa86e12f86c0d','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x603fb0fd7b1f9b2249c2c8408e3337a5e7f82ad32cc5908449f139d0c0c217ab',2288261,'2018-05-22 16:42:35.537895','2018-05-22 16:42:41.740003','ACTUAL'),(288,'0xe903ca30b213ac3fda28b63052e93d7bc2d6a1dbc12d813cb91fe71e6fc49ca8','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x137045f483cb812ba8e89d4573d83295784bd7c53dfcaf76b972339de4775512',2288332,'2018-05-22 16:42:35.538647','2018-05-22 16:42:41.842553','ACTUAL'),(289,'0x8069aa902b7721852c348790940fe6e8af5f6836071e9a73c6f1116de54e2d8f','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xafe6e6e225a09043c2f600abc723ba80361f19bdee6ca7b0852e7610bded7d4d',2288339,'2018-05-22 16:42:35.539571','2018-05-22 16:42:41.950175','ACTUAL'),(290,'0x61549626fa593127d515f0769976697035d370fdd1f286298c58a7c9f1cb56f4','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x478d56dd71bae5243298e2d605bcccfc9fa4a0d9c4bbe6817f5c5426e6ae4df1',2288357,'2018-05-22 16:42:35.540328','2018-05-22 16:42:42.058462','ACTUAL'),(291,'0xb93ab482b4f849823f87b9663ce5947874875218fe43f8b68c1efc3736d2e59d','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x5f75c62c5a6dc1d72e1704014ff8e75fb8e4dc8417062afd8cadf7fbfef357a9',2288560,'2018-05-22 16:42:35.541076','2018-05-22 16:42:42.199387','ACTUAL'),(292,'0x5dee98003d0ff92163625a02429b6ea5d2ee3938c0275fe6f5ee44f5a584b900','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xc2800ee780ab6f0ba177bbaf067a01ddd607ab56b94a63326d7bb38a349edddd',2288808,'2018-05-22 16:42:35.541828','2018-05-22 16:42:42.307630','ACTUAL'),(293,'0x16daf240de564c2693057dfeca4c6fc992b7754e2f391cf8ba15766a87d936a6','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb3e3062fa7b65fcad81b7c6e54afdcbddcf11df7a9bcbc5c4250f1ac190642c4',2289118,'2018-05-22 16:42:35.542595','2018-05-22 16:42:42.407224','ACTUAL'),(294,'0x03059d2153218d04f15963d1875af3aeeab4d54e4eea317428916555f0f13f72','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',7702,'0x78783b8c7280c388384da06c96e447bf322ea69e2c07c5d4c9f92cc6e3d9689a',2305929,'2018-05-22 16:42:35.543358','2018-05-22 16:42:42.522426','ACTUAL'),(295,'0x7137e18890be5985475dc7a86182c7747be62c4e647cf48092c635d1fb3f34fc','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',7702,'0xe3da00fbf69577b8d255b6e6acba57652298ca20fdfd172d6f3abde9bb6b42d6',2305937,'2018-05-22 16:42:35.544114','2018-05-22 16:42:42.639598','ACTUAL'),(296,'0x6638e6f4a63154a41bf8ca79d8fcab6cbd291744f5db8fa8eca4dd81a1e31fce','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',38510,'0x2e4bc2fb070171903f4f2849d84252a570380f01ee00c9f4f3b5889afdc7644c',2322909,'2018-05-22 16:42:35.544873','2018-05-22 16:42:42.751992','ACTUAL'),(297,'0x1c14226c21b16aca553378cd254fa41076cad29a46b56daa78fa53446fe67ae7','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',38510,'0xa24b3ac70fd1b12873cd231856666810c4cf34a60394eeb86e77c1399ecd44c6',2322918,'2018-05-22 16:42:35.545748','2018-05-22 16:42:42.871859','ACTUAL'),(298,'0x675a4aa4003b2b3ceedcc7c3e0ecedfbd58f24f326592ee023222addb0dc68ad','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0x4ef40afb1e9832f4e5479468e317fe7519c3972dd93a2ca64120005099c6876e',2323173,'2018-05-22 16:42:35.546533','2018-05-22 16:42:42.980240','ACTUAL'),(299,'0x619465296d66c51c1a99e72f59594746d06960b408bd8e7d663a4e10af94406e','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x327bc2bcb0fec79c4cac1f903c4fae9b0206ce2d534d92790e091c3da6eaad60',2323219,'2018-05-22 16:42:35.547306','2018-05-22 16:42:43.099115','ACTUAL'),(300,'0x9e274aafe6f512bafd1df03b2e2ecf6cd30df489a75506f21431c08f348cc3c0','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xfbebc83aeaddf52fee10e720783783e47be7ff3a7821d0d795ea6815938ed74b',2323221,'2018-05-22 16:42:35.548066','2018-05-22 16:42:43.268369','ACTUAL'),(301,'0xe260a7ba1730f394c98409904c95ff98d1082355c3d70b64b5e221caf4dae124','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xfe809ec855f8b87b4210a043e2668478d112e334c375ad2fa4735f8760e2a698',2323235,'2018-05-22 16:42:35.548819','2018-05-22 16:42:43.382414','ACTUAL'),(302,'0x4c89de3eae668b815ad9c67363a46d5f22fd54529deb70ce635d0df3b585119a','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x6df65f0a136b9b9864aa83eaa56349fa8351a1cff1da6c5925cfeb84a600d25a',2323277,'2018-05-22 16:42:35.549572','2018-05-22 16:42:43.510314','ACTUAL'),(303,'0x04dd0eebb212dcdb2f28c87bb1476a596763254e6773603c172b68bdb5ff4f9f','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0xb0f4137de41fb672de76f4f04cb0f625a9e501d9173dcb3aeb4667c282959275',2323285,'2018-05-22 16:42:35.550323','2018-05-22 16:42:43.608990','ACTUAL'),(304,'0x9a46b3843315cc999c54a7f531d5827af64c187269a7b9359030611092dc257b','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',77021,'0x7fb72dc9fb9395398919925f112fc2b7bebd49ea7a0711676b431c6ebb2db53a',2323294,'2018-05-22 16:42:35.551074','2018-05-22 16:42:43.721109','ACTUAL'),(305,'0xa0e0698217afde2378420f1b2fd2b96e0bdbf69b1397269edc27c0a3a2beac94','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x9013b3c5c51b455e29a78c09b2705830238d8d36a3975291ec05c302720d53f4',2323536,'2018-05-22 16:42:35.551928','2018-05-22 16:42:43.902108','ACTUAL'),(306,'0x65e3c3b68ddf053cd5dcfc7504f98a4b946673822f3e05340af7c11857ff41b3','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x84586179240ac8b0c4960ab6943678faf5272ef9f6f0dc9e98d9b71542a72018',2328995,'2018-05-22 16:42:35.553156','2018-05-22 16:42:44.008658','ACTUAL'),(307,'0xc4f90b11ea2338b26044db839c075fc10cf78d1db354dcd0066fcf92dd144bfd','0xB0a3f48478d84a497f930d8455711d9981B66a70','0x0000000000000000000000000000000000000000',1994,'0x184daa63738b474523ff02d23f49cf19d5896e7316a62287f1080c5732000272',2329011,'2018-05-22 16:42:35.554524','2018-05-22 16:42:44.114791','ACTUAL');
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

-- Dump completed on 2018-05-23 14:30:01
