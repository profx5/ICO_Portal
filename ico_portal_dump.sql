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
  CONSTRAINT `accounts_investor_id_15648101_fk` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'ETH','D257294276a423397499a11b590B9414886A8051',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add milestone',7,'add_milestone'),(20,'Can change milestone',7,'change_milestone'),(21,'Can delete milestone',7,'delete_milestone'),(22,'Can add account',8,'add_account'),(23,'Can change account',8,'change_account'),(24,'Can delete account',8,'delete_account'),(25,'Can add deposit',9,'add_deposit'),(26,'Can change deposit',9,'change_deposit'),(27,'Can delete deposit',9,'delete_deposit'),(28,'Can add investor',10,'add_investor'),(29,'Can change investor',10,'change_investor'),(30,'Can delete investor',10,'delete_investor'),(31,'Can add mint',11,'add_mint'),(32,'Can change mint',11,'change_mint'),(33,'Can delete mint',11,'delete_mint'),(34,'Can add phase',12,'add_phase'),(35,'Can change phase',12,'change_phase'),(36,'Can delete phase',12,'delete_phase'),(37,'Can add kyc',13,'add_kyc'),(38,'Can change kyc',13,'change_kyc'),(39,'Can delete kyc',13,'delete_kyc'),(40,'Can add association',14,'add_association'),(41,'Can change association',14,'change_association'),(42,'Can delete association',14,'delete_association'),(43,'Can add code',15,'add_code'),(44,'Can change code',15,'change_code'),(45,'Can delete code',15,'delete_code'),(46,'Can add nonce',16,'add_nonce'),(47,'Can change nonce',16,'change_nonce'),(48,'Can delete nonce',16,'delete_nonce'),(49,'Can add user social auth',17,'add_usersocialauth'),(50,'Can change user social auth',17,'change_usersocialauth'),(51,'Can delete user social auth',17,'delete_usersocialauth'),(52,'Can add partial',18,'add_partial'),(53,'Can change partial',18,'change_partial'),(54,'Can delete partial',18,'delete_partial');
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
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$100000$XMGY5IFZkKMI$dDTOtcb464oIczKiy4yL4Hd/cfP0FihkIMv8N/vtmAg=','2018-04-02 15:16:18.229968',1,'admin','','','',1,1,'2018-02-27 15:48:35.387168');
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
  `charged_at` datetime(6) DEFAULT NULL,
  `investor_id` int(11) NOT NULL,
  `mint_id` int(11) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mint_id` (`mint_id`),
  KEY `deposits_investor_id_d7cc7080_fk_investors_id` (`investor_id`),
  CONSTRAINT `deposits_investor_id_d7cc7080_fk` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`),
  CONSTRAINT `deposits_mint_id_19248720_fk_mint_log_id` FOREIGN KEY (`mint_id`) REFERENCES `mint_log` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposits`
--

LOCK TABLES `deposits` WRITE;
/*!40000 ALTER TABLE `deposits` DISABLE KEYS */;
INSERT INTO `deposits` VALUES (38,120.84100000,86.31500000,'2018-03-27 12:13:52.209043',1,56,'2018-03-27 12:13:02.734317','CONFIRMED'),(39,1208.41000000,863.15000000,'2018-03-27 12:15:22.171329',1,57,'2018-03-27 12:14:42.311709','CONFIRMED'),(40,0.00012084,0.00008632,'2018-03-27 12:16:22.163143',1,58,'2018-03-27 12:16:22.162997','CONFIRMED'),(41,362.52300000,258.94500000,NULL,1,59,'2018-03-27 13:20:01.003496','PREPARED'),(42,48.33640000,34.52600000,'2018-03-27 13:43:22.800065',1,60,'2018-03-27 13:42:35.115167','CONFIRMED'),(43,1208.41000000,863.15000000,'2018-03-27 17:44:58.610615',13,61,'2018-03-27 17:44:04.750022','CONFIRMED'),(46,241.68200000,172.63000000,NULL,1,62,'2018-03-30 11:34:23.859026','PREPARED'),(47,2416.82000000,1726.30000000,NULL,1,63,'2018-04-01 20:08:17.764554','PREPARED');
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2018-02-27 15:49:24.010251','1','Milestone object (1)',1,'[{\"added\": {}}]',7,1),(2,'2018-02-27 15:49:57.996076','2','Milestone object (2)',1,'[{\"added\": {}}]',7,1),(3,'2018-02-27 15:50:26.869981','3','Milestone object (3)',1,'[{\"added\": {}}]',7,1),(4,'2018-02-27 15:52:29.188581','1','First phase',1,'[{\"added\": {}}]',12,1),(5,'2018-02-27 15:53:44.867249','2','Second phase',1,'[{\"added\": {}}]',12,1),(6,'2018-02-27 15:54:10.396732','3','Third phase',1,'[{\"added\": {}}]',12,1),(7,'2018-03-13 18:58:14.695680','6','KYC object (6)',2,'[{\"changed\": {\"fields\": [\"state\"]}}]',13,1),(8,'2018-03-13 19:43:22.355769','8','KYC object (8)',2,'[{\"changed\": {\"fields\": [\"state\"]}}]',13,1),(9,'2018-03-13 19:45:49.470132','9','KYC object (9)',2,'[{\"changed\": {\"fields\": [\"state\"]}}]',13,1),(10,'2018-03-13 19:48:21.355093','10','KYC object (10)',2,'[{\"changed\": {\"fields\": [\"state\"]}}]',13,1),(11,'2018-03-13 20:27:40.379056','11','KYC object (11)',2,'[{\"changed\": {\"fields\": [\"state\"]}}]',13,1),(12,'2018-03-21 20:42:19.216882','2','KYC for user 0x73015966604928A312F79F7E69291a656Cb88602',3,'',13,1),(13,'2018-03-28 19:36:16.213667','1','gordon',2,'[{\"changed\": {\"fields\": [\"password\"]}}]',10,1),(14,'2018-03-28 19:36:41.454042','1','gordon',2,'[{\"changed\": {\"fields\": [\"password\"]}}]',10,1),(15,'2018-03-28 19:37:08.684841','1','gordon',2,'[{\"changed\": {\"fields\": [\"password\"]}}]',10,1),(16,'2018-03-28 19:37:34.077211','1','gordon',2,'[{\"changed\": {\"fields\": [\"password\"]}}]',10,1),(17,'2018-03-28 19:38:14.991028','1','gordon',2,'[{\"changed\": {\"fields\": [\"password\"]}}]',10,1),(18,'2018-03-28 19:38:29.445327','1','gordon',2,'[{\"changed\": {\"fields\": [\"password\"]}}]',10,1),(19,'2018-03-28 20:29:49.132045','13','_pel_men',2,'[{\"changed\": {\"fields\": [\"password\"]}}]',10,1),(20,'2018-03-28 21:26:16.942104','13','_pel_men',2,'[{\"changed\": {\"fields\": [\"password\"]}}]',10,1),(21,'2018-03-29 17:14:41.632658','44','Deposit 44',1,'[{\"added\": {}}]',9,1),(22,'2018-03-29 17:15:24.630150','61','Mint 0x6ea312b0b21fb1d524146a398639a7c3667658472db7c4186d6103186bc569e3 by ETH',2,'[]',11,1),(23,'2018-03-29 17:21:05.005166','44','Deposit 44',3,'',9,1),(24,'2018-03-29 17:23:15.353609','45','Deposit 45',1,'[{\"added\": {}}]',9,1),(25,'2018-03-29 17:24:29.570528','45','Deposit 45',3,'',9,1),(26,'2018-03-30 20:27:40.590577','21','KYC for Roman None Nesytov',1,'[{\"added\": {}}]',13,1),(27,'2018-03-30 20:56:36.245599','21','KYC for Roman None Nesytov',3,'',13,1),(28,'2018-03-30 20:59:12.077122','22','KYC for Roman None Nesytov',1,'[{\"added\": {}}]',13,1),(29,'2018-03-30 20:59:29.748508','20','KYC for Roman  Nesytov',3,'',13,1),(30,'2018-03-30 21:00:55.160135','22','KYC for Roman None Nesytov',3,'',13,1),(31,'2018-03-30 21:01:12.027506','23','KYC for Roman None Nesytov',1,'[{\"added\": {}}]',13,1),(32,'2018-03-30 21:02:48.824682','23','KYC for Roman None Nesytov',2,'[{\"changed\": {\"fields\": [\"approve_txn_hash\"]}}]',13,1),(33,'2018-04-02 15:34:14.168317','23','KYC for Roman None Nesytov',2,'[{\"changed\": {\"fields\": [\"approve_txn_hash\"]}}]',13,1),(34,'2018-04-02 15:35:21.227958','1','gordon',2,'[{\"changed\": {\"fields\": [\"eth_account\"]}}]',10,1),(35,'2018-04-02 15:44:36.272375','23','KYC for Roman None Nesytov',2,'[{\"changed\": {\"fields\": [\"decline_reason\"]}}]',13,1),(36,'2018-04-02 15:54:04.796560','24','KYC for Roman None Nesytov',1,'[{\"added\": {}}]',13,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'landing','milestone'),(6,'sessions','session'),(14,'social_django','association'),(15,'social_django','code'),(16,'social_django','nonce'),(18,'social_django','partial'),(17,'social_django','usersocialauth'),(8,'user_office','account'),(9,'user_office','deposit'),(10,'user_office','investor'),(13,'user_office','kyc'),(11,'user_office','mint'),(12,'user_office','phase');
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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2018-02-27 15:45:19.767581'),(2,'auth','0001_initial','2018-02-27 15:45:20.255389'),(3,'admin','0001_initial','2018-02-27 15:45:20.387968'),(4,'admin','0002_logentry_remove_auto_add','2018-02-27 15:45:20.401627'),(5,'contenttypes','0002_remove_content_type_name','2018-02-27 15:45:20.502532'),(6,'auth','0002_alter_permission_name_max_length','2018-02-27 15:45:20.551892'),(7,'auth','0003_alter_user_email_max_length','2018-02-27 15:45:20.606034'),(8,'auth','0004_alter_user_username_opts','2018-02-27 15:45:20.624096'),(9,'auth','0005_alter_user_last_login_null','2018-02-27 15:45:20.666071'),(10,'auth','0006_require_contenttypes_0002','2018-02-27 15:45:20.668516'),(11,'auth','0007_alter_validators_add_error_messages','2018-02-27 15:45:20.687233'),(12,'auth','0008_alter_user_username_max_length','2018-02-27 15:45:20.778187'),(13,'auth','0009_alter_user_last_name_max_length','2018-02-27 15:45:20.825343'),(14,'landing','0001_initial','2018-02-27 15:45:20.858536'),(15,'sessions','0001_initial','2018-02-27 15:45:20.905860'),(16,'user_office','0001_initial','2018-02-27 15:45:21.207528'),(17,'user_office','0002_auto_20180301_2120','2018-03-01 21:20:12.003398'),(18,'user_office','0003_auto_20180301_2205','2018-03-01 22:05:46.798793'),(19,'user_office','0004_auto_20180312_1920','2018-03-12 19:20:26.109187'),(20,'user_office','0005_auto_20180312_1929','2018-03-12 19:29:18.332064'),(21,'user_office','0006_auto_20180312_2105','2018-03-12 21:05:31.064030'),(22,'user_office','0007_kyc','2018-03-13 14:44:35.978810'),(23,'user_office','0008_auto_20180315_1520','2018-03-15 15:20:46.045488'),(24,'user_office','0009_mint_confirmation_date','2018-03-15 20:09:31.867174'),(42,'default','0001_initial','2018-03-19 17:58:54.748115'),(43,'social_auth','0001_initial','2018-03-19 17:58:54.750487'),(44,'default','0002_add_related_name','2018-03-19 17:58:54.809778'),(45,'social_auth','0002_add_related_name','2018-03-19 17:58:54.813068'),(46,'default','0003_alter_email_max_length','2018-03-19 17:58:54.839991'),(47,'social_auth','0003_alter_email_max_length','2018-03-19 17:58:54.845917'),(48,'default','0004_auto_20160423_0400','2018-03-19 17:58:54.855324'),(49,'social_auth','0004_auto_20160423_0400','2018-03-19 17:58:54.857516'),(50,'social_auth','0005_auto_20160727_2333','2018-03-19 17:58:54.882302'),(51,'social_django','0006_partial','2018-03-19 17:58:54.930634'),(52,'social_django','0007_code_timestamp','2018-03-19 17:58:54.998585'),(53,'social_django','0008_partial_timestamp','2018-03-19 17:58:55.067789'),(54,'social_django','0003_alter_email_max_length','2018-03-19 17:58:55.077074'),(55,'social_django','0002_add_related_name','2018-03-19 17:58:55.079594'),(56,'social_django','0005_auto_20160727_2333','2018-03-19 17:58:55.081687'),(57,'social_django','0004_auto_20160423_0400','2018-03-19 17:58:55.083763'),(58,'social_django','0001_initial','2018-03-19 17:58:55.085850'),(59,'user_office','0010_auto_20180326_1816','2018-03-26 18:16:29.259144'),(60,'user_office','0011_auto_20180326_1923','2018-03-26 19:23:04.140321'),(61,'user_office','0012_auto_20180326_1941','2018-03-26 19:41:18.972164'),(62,'user_office','0013_auto_20180327_1904','2018-03-27 19:04:37.044084'),(63,'user_office','0014_investor_date_joined','2018-03-28 16:56:11.533899'),(64,'user_office','0015_auto_20180329_2135','2018-03-29 21:36:01.649354'),(65,'user_office','0016_auto_20180330_1426','2018-03-30 14:26:56.020345'),(66,'user_office','0017_auto_20180330_2056','2018-03-30 20:56:07.124486'),(67,'user_office','0018_auto_20180402_1533','2018-04-02 15:33:39.525604'),(68,'user_office','0019_auto_20180402_1538','2018-04-02 15:38:49.404510');
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
INSERT INTO `django_session` VALUES ('028g6wiuqdcfukpvsthqhfp4htq3htkx','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-04-10 20:38:23.430161'),('0724uipeqfbatki17ahlyp9t8jsxs13f','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-04-04 20:41:48.907439'),('0fvef1cs2zozt6xvf633nig77lx2icgm','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-03-27 19:43:49.504513'),('0uj2me7ifdvo5psaoc9ujg6so57der8z','ZTcwNmRjMDdjOWJlOTAyNTRlZDcwMjQ1NTgyODVlYTM5ZjcxOGE5MDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLlVzZXJPZmZpY2VBdXRoQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjlkN2MzNzJiYTNlYjgyMDMyOTQxYTU5ZDNhNWE3ZTIzYjc3MzUwY2EifQ==','2018-04-02 00:57:28.365215'),('3cyir4q7ucerp9r23n7hoddjzcaem4y7','N2IzY2FlYjExNmU1NTdjNDUwNDFjZTI5OGVhYTE5OGY3ZWM3ZGM3YTp7InR3aXR0ZXJfc3RhdGUiOiJRQjRLcUc2b1UyamFEdElhU2lwZDZjSTBrbWk0aTEwQSIsInR3aXR0ZXJ1bmF1dGhvcml6ZWRfdG9rZW5fbmFtZSI6W119','2018-04-02 17:57:51.131760'),('4plplwwi9z4fm10zhlcfp2p4bz3ft10u','ZTcwNmRjMDdjOWJlOTAyNTRlZDcwMjQ1NTgyODVlYTM5ZjcxOGE5MDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLlVzZXJPZmZpY2VBdXRoQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjlkN2MzNzJiYTNlYjgyMDMyOTQxYTU5ZDNhNWE3ZTIzYjc3MzUwY2EifQ==','2018-04-09 15:55:14.393283'),('92ni9sffibtpoq6syk59rpsj3cgx46lq','OTk1MGRiYTNhMjgwYWVmNzdlMWQyZDRhY2MyM2IyNTE3ZGQyOTE3ZDp7InR3aXR0ZXJfc3RhdGUiOiIzOWxkTEc5djNiNEZmT0plZkp4M05ENjBWMXJZcEl0UCIsInR3aXR0ZXJ1bmF1dGhvcml6ZWRfdG9rZW5fbmFtZSI6WyJvYXV0aF90b2tlbj1CRUZsd3dBQUFBQUE1QjJjQUFBQllqNnZsUzAmb2F1dGhfdG9rZW5fc2VjcmV0PXFHZzByVkxMdEJTUjhlZk8wTzgwc3QyVmx6WHBnZURHJm9hdXRoX2NhbGxiYWNrX2NvbmZpcm1lZD10cnVlIiwib2F1dGhfdG9rZW49Zm9QeDFRQUFBQUFBNUIyY0FBQUJZajZ6WXM0Jm9hdXRoX3Rva2VuX3NlY3JldD1wbnh5VHBrMTVJRE95dlpVczJEQ2dyWUlsTndQaHlaNSZvYXV0aF9jYWxsYmFja19jb25maXJtZWQ9dHJ1ZSIsIm9hdXRoX3Rva2VuPTg3b3NWQUFBQUFBQTVCMmNBQUFCWWo2dF9CMCZvYXV0aF90b2tlbl9zZWNyZXQ9Z2hhWnZhcUFxMFViS0pXRGR4eHFwazlYRW5yT3hSeGcmb2F1dGhfY2FsbGJhY2tfY29uZmlybWVkPXRydWUiLCJvYXV0aF90b2tlbj1VNDRib3dBQUFBQUE1QjJjQUFBQllqNndkTW8mb2F1dGhfdG9rZW5fc2VjcmV0PWl0UFdpWjBVSlVmNWEyTG1TOGNOclU2bmpDamVHZ1NRJm9hdXRoX2NhbGxiYWNrX2NvbmZpcm1lZD10cnVlIl19','2018-04-02 17:41:51.141816'),('9t1l1w1r9hmkbrbfa8xgtku2x3mlggdc','YmZlYTQxZGVjZWI1MmY1NDQ3NjE2NTMyMTUyYjA3YzRmZjk0YWE3ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIiwiX21lc3NhZ2VzIjoiW1tcIl9fanNvbl9tZXNzYWdlXCIsMSwyNSxcIlRoZSBLWUMgXFxcIjxhIGhyZWY9XFxcIi9hZG1pbi91c2VyX29mZmljZS9reWMvMjMvY2hhbmdlL1xcXCI+S1lDIGZvciBSb21hbiBOb25lIE5lc3l0b3Y8L2E+XFxcIiB3YXMgY2hhbmdlZCBzdWNjZXNzZnVsbHkuXCJdLFtcIl9fanNvbl9tZXNzYWdlXCIsMSwyNSxcIlRoZSBLWUMgXFxcIjxhIGhyZWY9XFxcIi9hZG1pbi91c2VyX29mZmljZS9reWMvMjMvY2hhbmdlL1xcXCI+S1lDIGZvciBSb21hbiBOb25lIE5lc3l0b3Y8L2E+XFxcIiB3YXMgY2hhbmdlZCBzdWNjZXNzZnVsbHkuXCJdLFtcIl9fanNvbl9tZXNzYWdlXCIsMSwyNSxcIlRoZSBLWUMgXFxcIjxhIGhyZWY9XFxcIi9hZG1pbi91c2VyX29mZmljZS9reWMvMjQvY2hhbmdlL1xcXCI+S1lDIGZvciBSb21hbiBOb25lIE5lc3l0b3Y8L2E+XFxcIiB3YXMgYWRkZWQgc3VjY2Vzc2Z1bGx5LlwiXV0ifQ==','2018-04-16 15:54:04.815585'),('c41ty63kvza1z7i03zqmykbybodow1tw','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-04-11 19:38:14.993543'),('fvkgfn31mnb6k7q89t95tuzwudjjt9wg','NzUyZjdjMTFlMGNjNzU5ZDc1ZGVhODI3NjNlYWFiMTE5YzJhODUwYTp7InR3aXR0ZXJfc3RhdGUiOiJUZFJoUkVyYmY0Rkg3M1NXQmlxa2RVSzVlNnU3NGNJQSIsInR3aXR0ZXJ1bmF1dGhvcml6ZWRfdG9rZW5fbmFtZSI6W119','2018-04-02 17:48:27.545890'),('j2oswshgr8st857yckojexw2qpr70k9o','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-04-03 15:36:05.457753'),('jihkd58tn0hb4e7y71v3646b41n24ts0','ZjA2NjMwNzcyZTRiOTkzMmFiZGQ2MjNhMDhlNzI2MmIwOWI1MzQ5ZTp7InR3aXR0ZXJfc3RhdGUiOiJaYU9GTEpOdEVHa3VMbWJCaldIdjkzQXl1dWZkZTN3YSIsInR3aXR0ZXJ1bmF1dGhvcml6ZWRfdG9rZW5fbmFtZSI6WyJvYXV0aF90b2tlbj1OMkl6YkFBQUFBQUE1QjJjQUFBQllqNjRCLTQmb2F1dGhfdG9rZW5fc2VjcmV0PUxjemRKQnk2Y0Fhc2M5a1hDcnFDZW5CaE1wUFNzM2RNJm9hdXRoX2NhbGxiYWNrX2NvbmZpcm1lZD10cnVlIl19','2018-04-02 17:46:03.980613'),('kuxzkzd65sp79fq0u1e787z5rgejag2c','MzhiNmEzOWY4NTIzMGQ0YjBkMzNiYzcxODI5MzcxZDgxZjI4Njc0Njp7InR3aXR0ZXJfc3RhdGUiOiJXSFN1UDJ4UE45WnFpV0pZUEo3dTVQN21KMTdUOVM4eiIsInR3aXR0ZXJ1bmF1dGhvcml6ZWRfdG9rZW5fbmFtZSI6W10sIl9hdXRoX3VzZXJfaWQiOiIxMyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6InNvY2lhbF9jb3JlLmJhY2tlbmRzLnR3aXR0ZXIuVHdpdHRlck9BdXRoIiwiX2F1dGhfdXNlcl9oYXNoIjoiZWU3ZTRkZmM0YmIyNTlkMzUwOTI5ODBjNWZmNjBmNTE3YjAxOTIzZCIsInNvY2lhbF9hdXRoX2xhc3RfbG9naW5fYmFja2VuZCI6InR3aXR0ZXIifQ==','2018-04-10 16:33:46.635747'),('lb8qjutleefsfaq3qrmfpcxqwszy5ubk','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-04-02 18:54:51.987582'),('lk2p3gpsqk5u62frf43mvr7ez0gvree3','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-03-29 16:21:20.856312'),('piujixadh21764fhnzvdkx5o621793tn','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-04-06 13:27:57.823495'),('says1zx4556d01d9yt5xsaf3zyijob0p','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-04-13 14:13:54.688313'),('sh4a6q65oq5lldz69c0u5moyqbbkww3e','NGUwMjNiZWY3Mjc1NjUwZGZhYjVmMjQyOTdmNGMzYjE5NjA0ZGVmZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5YjA3ZjhiYWRmYWJhMmE5MWYyYzUzZTA0NTQ5ZWE2NWRjMzU1ODkwIn0=','2018-04-11 19:37:34.082183');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `eth_account` (`eth_account`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investors`
--

LOCK TABLES `investors` WRITE;
/*!40000 ALTER TABLE `investors` DISABLE KEYS */;
INSERT INTO `investors` VALUES ('pbkdf2_sha256$100000$ZSblhiF8GWsT$pTf+Zr/FvzSpRl1xabOnsyclEFz1di3uNh/vUOQmI9Q=','2018-04-01 23:09:46.667787',1,'gordon','0x73015966604928A312F79F7E69291a656Cb88602',1377.58752084,'2018-03-28 13:56:11.327310'),('pbkdf2_sha256$100000$XhzO3ymcL4Oa$t0jN31kTwJeUJLxppfQzoNQSUS4bsWNqqtX49GV2zC8=','2018-03-30 14:35:30.840645',13,'_pel_men','0xB0a3f48478d84a497f930d8455711d9981B66a70',1208.41000000,'2018-03-28 13:56:11.327310');
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
  `birthdate` date NOT NULL,
  `document_no` varchar(50) COLLATE utf8_bin NOT NULL,
  `photo` varchar(100) COLLATE utf8_bin NOT NULL,
  `investor_id` int(11) NOT NULL,
  `country` varchar(30) COLLATE utf8_bin NOT NULL,
  `decline_reason` longtext COLLATE utf8_bin,
  `selfie` varchar(100) COLLATE utf8_bin NOT NULL,
  `approve_txn_hash` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `investor_id` (`investor_id`),
  CONSTRAINT `kyc_investor_id_1910e4d7_fk_investors_id` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kyc`
--

LOCK TABLES `kyc` WRITE;
/*!40000 ALTER TABLE `kyc` DISABLE KEYS */;
INSERT INTO `kyc` VALUES (24,'APPROVED','Roman',NULL,'Nesytov','2018-04-02','12312312','kyc/1/photo/2018-03-16_14.02.58.jpg',1,'Russia','','kyc/1/selfie/2018-03-16_14.02.58.jpg','0x49a67cdb2f9da4b5fcf31968b548e2ab71dea0283c3cffc07a577c5715403024');
/*!40000 ALTER TABLE `kyc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestones`
--

DROP TABLE IF EXISTS `milestones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `milestones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `line_no` int(10) unsigned NOT NULL,
  `label` varchar(100) COLLATE utf8_bin NOT NULL,
  `description` varchar(1000) COLLATE utf8_bin NOT NULL,
  `current` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `line_no` (`line_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestones`
--

LOCK TABLES `milestones` WRITE;
/*!40000 ALTER TABLE `milestones` DISABLE KEYS */;
INSERT INTO `milestones` VALUES (1,1,'December','Close round',0),(2,2,'April','ICO',1),(3,3,'May','Tokens tokens tokens tokens',0);
/*!40000 ALTER TABLE `milestones` ENABLE KEYS */;
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
  `block_hash` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `account_to` varchar(100) COLLATE utf8_bin NOT NULL,
  `account_from` varchar(100) COLLATE utf8_bin NOT NULL,
  `value` varchar(100) COLLATE utf8_bin NOT NULL,
  `txn_date` datetime(6) DEFAULT NULL,
  `state` varchar(10) COLLATE utf8_bin NOT NULL,
  `block_number` int(10) unsigned DEFAULT NULL,
  `txn_hash` varchar(100) COLLATE utf8_bin NOT NULL,
  `confirmation_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mint_log_currency_txn_hash_8dcafacb_uniq` (`currency`,`txn_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mint_log`
--

LOCK TABLES `mint_log` WRITE;
/*!40000 ALTER TABLE `mint_log` DISABLE KEYS */;
INSERT INTO `mint_log` VALUES (56,'ETH','0xdfa6ba345359233c984de6f34bf2977f0110f1749876b7ffb0701da5f8867a1d','0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152','0x73015966604928A312F79F7E69291a656Cb88602','100000000000000000','2018-03-27 12:13:52.133116','CONFIRMED',2005519,'0x460d31bf031c10c4505397238fe93c6303ada6f9e528345a8d1833a24d98efd3','2018-03-27 12:13:52.200591'),(57,'ETH','0xd2a99e5172e6002f1959a1d8bc789494a6404aa66a7618712d74364aeca057f5','0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152','0x73015966604928A312F79F7E69291a656Cb88602','1000000000000000000','2018-03-27 12:15:22.125794','CONFIRMED',2005525,'0x2e3f1050db82ecaaf6716be31103614d6ae524378301a0e3b7b41eae95104506','2018-03-27 12:15:22.161265'),(58,'ETH','0x20a1b57a495e212f82de11a9205b55c1da7d8cde9839d95fcf6b393fe270b994','0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152','0x73015966604928A312F79F7E69291a656Cb88602','100000000000','2018-03-27 12:16:22.148165','CONFIRMED',2005529,'0x121f8389b1e7646116cabd4f539ffc7ec93619113965a90ef2ed4d003b51469d','2018-03-27 12:16:22.155638'),(59,'ETH',NULL,'0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152','0x73015966604928A312F79F7E69291a656Cb88602','300000000000000000',NULL,'WAIT',NULL,'0xf99f3ac9a12d26b736e02d32af4f4ef7fde487be13e020e4399e263f2309ce21',NULL),(60,'ETH','0x9f9178484eac84676e69e9f02f3f289a22e09e5200f3640f87324b6440587918','0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152','0x73015966604928A312F79F7E69291a656Cb88602','40000000000000000','2018-03-27 13:43:22.743612','CONFIRMED',2005876,'0x9496849ff00c5e9cd7a42c06d3c60fd07925da7d4fd08b428f3219616976f6a8','2018-03-27 13:43:22.789220'),(61,'ETH','0x1b691a2e3a1f9a2f74d50ab8d76d450bf8a9be4fa6e7f5896138e26b34417124','0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152','0xB0a3f48478d84a497f930d8455711d9981B66a70','1000000000000000000','2018-03-27 17:44:58.503092','CONFIRMED',2006842,'0x6ea312b0b21fb1d524146a398639a7c3667658472db7c4186d6103186bc569e3','2018-03-27 17:44:58.602236'),(62,'ETH',NULL,'0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152','0x73015966604928A312F79F7E69291a656Cb88602','200000000000000000',NULL,'WAIT',NULL,'0xc4336911fd9dbbc5574d1a52af119e72325c5ea7260c81258873139f46bf510a',NULL),(63,'ETH',NULL,'0xD0EDB4aa92d03Efbdbf0978Cc17023BEa1574152','0x73015966604928A312F79F7E69291a656Cb88602','2000000000000000000',NULL,'WAIT',NULL,'0x5c45a05df395b041ea4823a728eab70691035c65b7bd198df383095bed34fcd7',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phases`
--

LOCK TABLES `phases` WRITE;
/*!40000 ALTER TABLE `phases` DISABLE KEYS */;
INSERT INTO `phases` VALUES (1,'First phase','2018-02-01 00:00:00.000000','2018-03-03 23:59:59.000000',50),(2,'Second phase','2018-03-04 00:00:00.000000','2018-03-22 23:59:59.000000',33),(3,'Third phase','2018-03-23 00:00:00.000000','2018-05-03 23:59:59.000000',20);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_usersocialauth`
--

LOCK TABLES `social_auth_usersocialauth` WRITE;
/*!40000 ALTER TABLE `social_auth_usersocialauth` DISABLE KEYS */;
INSERT INTO `social_auth_usersocialauth` VALUES (4,'twitter','1240887655','{\"auth_time\": 1522409730, \"id\": 1240887655, \"access_token\": {\"oauth_token\": \"1240887655-5OWWv4P8yePCG3u8D7uYuV5aCZV6ZhPGJcp78s3\", \"oauth_token_secret\": \"4uIEEoIvvwB95HDlNFcXDhxfcyNxIa83Q3wPq4KEB2c3U\", \"user_id\": \"1240887655\", \"screen_name\": \"_pel_men\", \"x_auth_expires\": \"0\"}}',13);
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

-- Dump completed on 2018-04-02 16:00:29
