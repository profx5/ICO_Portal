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
INSERT INTO `accounts` VALUES (1,'BTC','34iCkGwB1ED8YLuvGFSkhtVXQ9fzvZLuP2',2),(2,'BTC','383gwWR4yCBMVRcso5EgPewfk3pPsAsbbm',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add content type',4,'add_contenttype'),(11,'Can change content type',4,'change_contenttype'),(12,'Can delete content type',4,'delete_contenttype'),(13,'Can add session',5,'add_session'),(14,'Can change session',5,'change_session'),(15,'Can delete session',5,'delete_session'),(16,'Can add association',6,'add_association'),(17,'Can change association',6,'change_association'),(18,'Can delete association',6,'delete_association'),(19,'Can add code',7,'add_code'),(20,'Can change code',7,'change_code'),(21,'Can delete code',7,'delete_code'),(22,'Can add nonce',8,'add_nonce'),(23,'Can change nonce',8,'change_nonce'),(24,'Can delete nonce',8,'delete_nonce'),(25,'Can add user social auth',9,'add_usersocialauth'),(26,'Can change user social auth',9,'change_usersocialauth'),(27,'Can delete user social auth',9,'delete_usersocialauth'),(28,'Can add partial',10,'add_partial'),(29,'Can change partial',10,'change_partial'),(30,'Can delete partial',10,'delete_partial'),(31,'Can add news page content',11,'add_newspagecontent'),(32,'Can change news page content',11,'change_newspagecontent'),(33,'Can delete news page content',11,'delete_newspagecontent'),(34,'Can add page',12,'add_page'),(35,'Can change page',12,'change_page'),(36,'Can delete page',12,'delete_page'),(37,'Can add Attachment',13,'add_attachment'),(38,'Can change Attachment',13,'change_attachment'),(39,'Can delete Attachment',13,'delete_attachment'),(40,'Can add Custom field',14,'add_customfield'),(41,'Can change Custom field',14,'change_customfield'),(42,'Can delete Custom field',14,'delete_customfield'),(43,'Can add e-mail template',15,'add_emailtemplate'),(44,'Can change e-mail template',15,'change_emailtemplate'),(45,'Can delete e-mail template',15,'delete_emailtemplate'),(46,'Can add Escalation exclusion',16,'add_escalationexclusion'),(47,'Can change Escalation exclusion',16,'change_escalationexclusion'),(48,'Can delete Escalation exclusion',16,'delete_escalationexclusion'),(49,'Can add Follow-up',17,'add_followup'),(50,'Can change Follow-up',17,'change_followup'),(51,'Can delete Follow-up',17,'delete_followup'),(52,'Can add Ignored e-mail address',18,'add_ignoreemail'),(53,'Can change Ignored e-mail address',18,'change_ignoreemail'),(54,'Can delete Ignored e-mail address',18,'delete_ignoreemail'),(55,'Can add Knowledge base category',19,'add_kbcategory'),(56,'Can change Knowledge base category',19,'change_kbcategory'),(57,'Can delete Knowledge base category',19,'delete_kbcategory'),(58,'Can add Knowledge base item',20,'add_kbitem'),(59,'Can change Knowledge base item',20,'change_kbitem'),(60,'Can delete Knowledge base item',20,'delete_kbitem'),(61,'Can add Pre-set reply',21,'add_presetreply'),(62,'Can change Pre-set reply',21,'change_presetreply'),(63,'Can delete Pre-set reply',21,'delete_presetreply'),(64,'Can add Queue',22,'add_queue'),(65,'Can change Queue',22,'change_queue'),(66,'Can delete Queue',22,'delete_queue'),(67,'Can add Saved search',23,'add_savedsearch'),(68,'Can change Saved search',23,'change_savedsearch'),(69,'Can delete Saved search',23,'delete_savedsearch'),(70,'Can add Ticket',24,'add_ticket'),(71,'Can change Ticket',24,'change_ticket'),(72,'Can delete Ticket',24,'delete_ticket'),(73,'Can add ticket cc',25,'add_ticketcc'),(74,'Can change ticket cc',25,'change_ticketcc'),(75,'Can delete ticket cc',25,'delete_ticketcc'),(76,'Can add Ticket change',26,'add_ticketchange'),(77,'Can change Ticket change',26,'change_ticketchange'),(78,'Can delete Ticket change',26,'delete_ticketchange'),(79,'Can add Ticket custom field value',27,'add_ticketcustomfieldvalue'),(80,'Can change Ticket custom field value',27,'change_ticketcustomfieldvalue'),(81,'Can delete Ticket custom field value',27,'delete_ticketcustomfieldvalue'),(82,'Can add Ticket dependency',28,'add_ticketdependency'),(83,'Can change Ticket dependency',28,'change_ticketdependency'),(84,'Can delete Ticket dependency',28,'delete_ticketdependency'),(85,'Can add User Setting',29,'add_usersettings'),(86,'Can change User Setting',29,'change_usersettings'),(87,'Can delete User Setting',29,'delete_usersettings'),(88,'Can add News',30,'add_news'),(89,'Can change News',30,'change_news'),(90,'Can delete News',30,'delete_news'),(91,'Can add milestone',31,'add_milestone'),(92,'Can change milestone',31,'change_milestone'),(93,'Can delete milestone',31,'delete_milestone'),(94,'Can add document',32,'add_document'),(95,'Can change document',32,'change_document'),(96,'Can delete document',32,'delete_document'),(97,'Can add investor',33,'add_investor'),(98,'Can change investor',33,'change_investor'),(99,'Can delete investor',33,'delete_investor'),(100,'Can add account',34,'add_account'),(101,'Can change account',34,'change_account'),(102,'Can delete account',34,'delete_account'),(103,'Can add events processing',35,'add_eventsprocessing'),(104,'Can change events processing',35,'change_eventsprocessing'),(105,'Can delete events processing',35,'delete_eventsprocessing'),(106,'Can add exchange rate',36,'add_exchangerate'),(107,'Can change exchange rate',36,'change_exchangerate'),(108,'Can delete exchange rate',36,'delete_exchangerate'),(109,'Can add ic o_ info',37,'add_ico_info'),(110,'Can change ic o_ info',37,'change_ico_info'),(111,'Can delete ic o_ info',37,'delete_ico_info'),(112,'Can add KYC',38,'add_kyc'),(113,'Can change KYC',38,'change_kyc'),(114,'Can delete KYC',38,'delete_kyc'),(115,'Can add payment',39,'add_payment'),(116,'Can change payment',39,'change_payment'),(117,'Can delete payment',39,'delete_payment'),(118,'Can add phase',40,'add_phase'),(119,'Can change phase',40,'change_phase'),(120,'Can delete phase',40,'delete_phase'),(121,'Can add tokens move',41,'add_tokensmove'),(122,'Can change tokens move',41,'change_tokensmove'),(123,'Can delete tokens move',41,'delete_tokensmove'),(124,'Can add transaction',42,'add_transaction'),(125,'Can change transaction',42,'change_transaction'),(126,'Can delete transaction',42,'delete_transaction'),(127,'Can add transfer',43,'add_transfer'),(128,'Can change transfer',43,'change_transfer'),(129,'Can delete transfer',43,'delete_transfer'),(130,'Permission for queue: Support',22,'queue_access_support'),(131,'Can add po update',44,'add_poupdate'),(132,'Can change po update',44,'change_poupdate'),(133,'Can delete po update',44,'delete_poupdate');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
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
  KEY `django_admin_log_user_id_c564eba6_fk_investors_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_investors_id` FOREIGN KEY (`user_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2018-07-17 15:33:05.930348','1','First phase',1,'[{\"added\": {}}]',40,1),(2,'2018-07-17 15:40:27.031821','1','KYC for Roman None Nesytov',1,'[{\"added\": {}}]',38,1),(3,'2018-07-17 15:42:40.023935','2','gordon@ongrid.pro',2,'[{\"changed\": {\"fields\": [\"eth_account\"]}}]',33,1),(4,'2018-07-19 16:57:12.553975','5','Comment',3,'',17,1),(5,'2018-07-19 16:57:29.746793','6','Comment',3,'',17,1),(6,'2018-07-19 16:57:55.755313','4','Updated',2,'[{\"deleted\": {\"name\": \"Attachment\", \"object\": \"download.jpeg\"}}]',17,1),(7,'2018-07-19 16:58:12.096886','1','1 Test ticket',3,'',24,1),(8,'2018-07-19 16:58:12.099608','2','2 New',3,'',24,1),(9,'2018-07-20 11:37:32.198219','1','KYC of gordon@ongrid.pro',2,'[{\"changed\": {\"fields\": [\"state\"]}}]',38,1),(10,'2018-07-21 16:43:01.504262','1','KYC of gordon@ongrid.pro',1,'[{\"added\": {}}]',38,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(13,'helpdesk','attachment'),(14,'helpdesk','customfield'),(15,'helpdesk','emailtemplate'),(16,'helpdesk','escalationexclusion'),(17,'helpdesk','followup'),(18,'helpdesk','ignoreemail'),(19,'helpdesk','kbcategory'),(20,'helpdesk','kbitem'),(21,'helpdesk','presetreply'),(22,'helpdesk','queue'),(23,'helpdesk','savedsearch'),(24,'helpdesk','ticket'),(25,'helpdesk','ticketcc'),(26,'helpdesk','ticketchange'),(27,'helpdesk','ticketcustomfieldvalue'),(28,'helpdesk','ticketdependency'),(29,'helpdesk','usersettings'),(32,'landing','document'),(31,'landing','milestone'),(30,'landing','news'),(11,'page','newspagecontent'),(12,'page','page'),(5,'sessions','session'),(6,'social_django','association'),(7,'social_django','code'),(8,'social_django','nonce'),(10,'social_django','partial'),(9,'social_django','usersocialauth'),(34,'user_office','account'),(35,'user_office','eventsprocessing'),(36,'user_office','exchangerate'),(37,'user_office','ico_info'),(33,'user_office','investor'),(38,'user_office','kyc'),(39,'user_office','payment'),(40,'user_office','phase'),(44,'user_office','poupdate'),(41,'user_office','tokensmove'),(42,'user_office','transaction'),(43,'user_office','transfer');
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
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'user_office','0001_initial','2018-07-17 15:31:52.885216'),(2,'contenttypes','0001_initial','2018-07-17 15:31:52.941979'),(3,'admin','0001_initial','2018-07-17 15:31:53.054754'),(4,'admin','0002_logentry_remove_auto_add','2018-07-17 15:31:53.065833'),(5,'contenttypes','0002_remove_content_type_name','2018-07-17 15:31:53.142272'),(6,'auth','0001_initial','2018-07-17 15:31:53.369040'),(7,'auth','0002_alter_permission_name_max_length','2018-07-17 15:31:53.403203'),(8,'auth','0003_alter_user_email_max_length','2018-07-17 15:31:53.410509'),(9,'auth','0004_alter_user_username_opts','2018-07-17 15:31:53.417541'),(10,'auth','0005_alter_user_last_login_null','2018-07-17 15:31:53.427273'),(11,'auth','0006_require_contenttypes_0002','2018-07-17 15:31:53.429150'),(12,'auth','0007_alter_validators_add_error_messages','2018-07-17 15:31:53.441547'),(13,'auth','0008_alter_user_username_max_length','2018-07-17 15:31:53.454106'),(14,'auth','0009_alter_user_last_name_max_length','2018-07-17 15:31:53.512117'),(15,'helpdesk','0001_initial','2018-07-17 15:31:55.006508'),(16,'helpdesk','0002_populate_usersettings','2018-07-17 15:31:55.043587'),(17,'helpdesk','0003_initial_data_import','2018-07-17 15:31:55.229156'),(18,'helpdesk','0004_add_per_queue_staff_membership','2018-07-17 15:31:55.437089'),(19,'helpdesk','0005_queues_no_null','2018-07-17 15:31:55.794702'),(20,'helpdesk','0006_email_maxlength','2018-07-17 15:31:55.918326'),(21,'helpdesk','0007_max_length_by_integer','2018-07-17 15:31:55.927317'),(22,'helpdesk','0008_extra_for_permissions','2018-07-17 15:31:55.961585'),(23,'helpdesk','0009_migrate_queuemembership','2018-07-17 15:31:56.011256'),(24,'helpdesk','0010_remove_queuemembership','2018-07-17 15:31:56.080068'),(25,'helpdesk','0011_admin_related_improvements','2018-07-17 15:31:56.138914'),(26,'helpdesk','0012_queue_default_owner','2018-07-17 15:31:56.210511'),(27,'helpdesk','0013_email_box_local_dir_and_logging','2018-07-17 15:31:56.329582'),(28,'helpdesk','0014_usersettings_related_name','2018-07-17 15:31:56.402336'),(29,'helpdesk','0015_expand_permission_name_size','2018-07-17 15:31:56.434885'),(30,'helpdesk','0016_alter_model_options','2018-07-17 15:31:56.513039'),(31,'helpdesk','0017_default_owner_on_delete_null','2018-07-17 15:31:56.572013'),(32,'helpdesk','0018_ticket_reporter','2018-07-17 15:31:56.706999'),(33,'helpdesk','0019_auto_20180717_1522','2018-07-17 15:31:56.720748'),(34,'page','0001_initial','2018-07-17 15:31:56.976596'),(35,'sessions','0001_initial','2018-07-17 15:31:57.017320'),(36,'default','0001_initial','2018-07-17 15:31:57.258006'),(37,'social_auth','0001_initial','2018-07-17 15:31:57.261600'),(38,'default','0002_add_related_name','2018-07-17 15:31:57.320059'),(39,'social_auth','0002_add_related_name','2018-07-17 15:31:57.328005'),(40,'default','0003_alter_email_max_length','2018-07-17 15:31:57.356936'),(41,'social_auth','0003_alter_email_max_length','2018-07-17 15:31:57.364023'),(42,'default','0004_auto_20160423_0400','2018-07-17 15:31:57.382782'),(43,'social_auth','0004_auto_20160423_0400','2018-07-17 15:31:57.385619'),(44,'social_auth','0005_auto_20160727_2333','2018-07-17 15:31:57.409217'),(45,'social_django','0006_partial','2018-07-17 15:31:57.464154'),(46,'social_django','0007_code_timestamp','2018-07-17 15:31:57.549914'),(47,'social_django','0008_partial_timestamp','2018-07-17 15:31:57.617080'),(48,'social_django','0002_add_related_name','2018-07-17 15:31:57.622822'),(49,'social_django','0003_alter_email_max_length','2018-07-17 15:31:57.625647'),(50,'social_django','0001_initial','2018-07-17 15:31:57.628388'),(51,'social_django','0005_auto_20160727_2333','2018-07-17 15:31:57.631111'),(52,'social_django','0004_auto_20160423_0400','2018-07-17 15:31:57.633865'),(53,'user_office','0002_kyc_ticket','2018-07-17 15:32:10.188626'),(54,'helpdesk','0019_auto_20180709_1841','2018-07-17 15:56:23.485416'),(55,'helpdesk','0020_merge_20180717_1556','2018-07-17 15:56:23.490299'),(56,'user_office','0003_auto_20180718_1421','2018-07-18 14:22:49.435966'),(57,'user_office','0004_auto_20180718_1445','2018-07-18 14:45:08.074937'),(58,'user_office','0005_poupdate_new_rate','2018-07-18 15:04:51.666995'),(59,'user_office','0006_auto_20180720_1201','2018-07-19 19:17:04.289717'),(60,'user_office','0007_auto_20180721_1622','2018-07-21 13:30:31.441738');
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
INSERT INTO `django_session` VALUES ('0rnm5749nqeul5zvayacf7mzo8erd9sl','OTRmMzk1ZTczMGZkODA2YmE1ZjdkM2M5OTE0NGRlMTc3MGMwZTExOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3Mjk3MGIyNjQ2MjI1ODNkMDlhYzRmZGJkN2Y2MjBmZTU2NDE2ZTFkIn0=','2018-08-02 16:56:38.667155'),('2yrzp57ku8j4sj7n413x196rsvl6m4aj','OTRmMzk1ZTczMGZkODA2YmE1ZjdkM2M5OTE0NGRlMTc3MGMwZTExOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3Mjk3MGIyNjQ2MjI1ODNkMDlhYzRmZGJkN2Y2MjBmZTU2NDE2ZTFkIn0=','2018-08-03 20:51:14.835276'),('5kb1zyyh6j8ozagpd4wczqihafsq9zik','OTRmMzk1ZTczMGZkODA2YmE1ZjdkM2M5OTE0NGRlMTc3MGMwZTExOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3Mjk3MGIyNjQ2MjI1ODNkMDlhYzRmZGJkN2Y2MjBmZTU2NDE2ZTFkIn0=','2018-07-31 15:37:21.452494'),('daigadyv6nek1gaiysxpzfod9c02c9cn','OTRmMzk1ZTczMGZkODA2YmE1ZjdkM2M5OTE0NGRlMTc3MGMwZTExOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3Mjk3MGIyNjQ2MjI1ODNkMDlhYzRmZGJkN2Y2MjBmZTU2NDE2ZTFkIn0=','2018-08-03 11:31:58.488359'),('j7axhovks75httyj4noxvk01y46csfhz','OTRmMzk1ZTczMGZkODA2YmE1ZjdkM2M5OTE0NGRlMTc3MGMwZTExOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3Mjk3MGIyNjQ2MjI1ODNkMDlhYzRmZGJkN2Y2MjBmZTU2NDE2ZTFkIn0=','2018-07-31 17:53:46.429247'),('jjw5dpfrtmw413fcxxlaauvoht45oprc','Yjk4NGM0ZjZjOGE5NDA2NzM1YWFlN2YzZGFhYTViN2Y5MzEyYjIzYjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkVtYWlsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjcyOTcwYjI2NDYyMjU4M2QwOWFjNGZkYmQ3ZjYyMGZlNTY0MTZlMWQifQ==','2018-08-01 12:04:00.279447'),('mffigtucxwhn613p4o59z36wfeond7pn','OTRmMzk1ZTczMGZkODA2YmE1ZjdkM2M5OTE0NGRlMTc3MGMwZTExOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3Mjk3MGIyNjQ2MjI1ODNkMDlhYzRmZGJkN2Y2MjBmZTU2NDE2ZTFkIn0=','2018-08-02 19:38:07.943583'),('tlhyp7jzywrs0xv1gsjeflt5vtk3gpzz','OTRmMzk1ZTczMGZkODA2YmE1ZjdkM2M5OTE0NGRlMTc3MGMwZTExOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3Mjk3MGIyNjQ2MjI1ODNkMDlhYzRmZGJkN2Y2MjBmZTU2NDE2ZTFkIn0=','2018-08-04 15:54:33.591153'),('vea8z4ftdgoxka7bl7hf38qy69go5nm6','OTRmMzk1ZTczMGZkODA2YmE1ZjdkM2M5OTE0NGRlMTc3MGMwZTExOTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkFkbWluVXNlckJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI3Mjk3MGIyNjQ2MjI1ODNkMDlhYzRmZGJkN2Y2MjBmZTU2NDE2ZTFkIn0=','2018-08-03 11:56:15.775922'),('vo3iqb1n6d0x23e94hon0ctsyndv0cip','NGFiZGRiNDIxMjRiYWNjMWVjODE1ZTc2Mjk2Yzk2NjU3ZTYzMTUzNTp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoidXNlcl9vZmZpY2UuYXV0aF9iYWNrZW5kLkVtYWlsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjMxMDYxY2NiZGZmN2ZmNmUzNzA1ODc0YWM3OWZmNTY0ZGNiN2IxNTkifQ==','2018-08-04 15:54:12.692956');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_processing`
--

LOCK TABLES `events_processing` WRITE;
/*!40000 ALTER TABLE `events_processing` DISABLE KEYS */;
INSERT INTO `events_processing` VALUES (4,'0x24eacbf9595e8e6a8fc4e2555a323a9f',0,2674188,'2018-07-21 14:22:05.951287');
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
  `rate` decimal(32,2) NOT NULL,
  `timestamp` int(10) unsigned NOT NULL,
  `rate_cents` decimal(32,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange_rates`
--

LOCK TABLES `exchange_rates` WRITE;
/*!40000 ALTER TABLE `exchange_rates` DISABLE KEYS */;
INSERT INTO `exchange_rates` VALUES (1,'ETH','2018-07-17 12:44:46.744189',467.96,1531831441,46796),(2,'LTC','2018-07-17 12:44:47.064467',82.17,1531831441,8217),(3,'BTC','2018-07-17 12:44:47.440122',6702.38,1531831441,670238),(4,'DASH','2018-07-17 12:44:47.797577',245.59,1531831441,24559),(5,'ETH','2018-07-18 12:12:25.049770',497.89,1531915863,49789),(6,'ETH','2018-07-18 15:16:35.451436',492.10,1531926963,49210),(7,'LTC','2018-07-18 15:16:35.820222',90.26,1531926963,9026),(8,'ETH','2018-07-19 09:06:11.149060',476.37,1531991162,47637),(9,'LTC','2018-07-19 09:06:11.544365',86.24,1531991101,8624),(10,'BTC','2018-07-19 09:06:11.975861',7329.42,1531991162,732942),(11,'DASH','2018-07-19 09:06:13.030145',263.67,1531991101,26367),(12,'ETH','2018-07-19 09:11:09.146605',476.39,1531991402,47639),(13,'LTC','2018-07-19 09:11:09.506720',86.49,1531991402,8649),(14,'ETH','2018-07-19 09:11:10.811882',476.39,1531991402,47639),(15,'DASH','2018-07-19 09:11:13.263968',263.32,1531991462,26332),(16,'ETH','2018-07-19 09:11:13.385189',476.39,1531991402,47639),(17,'LTC','2018-07-19 09:11:13.674813',86.49,1531991402,8649),(18,'DASH','2018-07-19 09:11:15.649744',263.32,1531991462,26332),(19,'ETH','2018-07-19 09:16:10.894375',476.83,1531991763,47683),(20,'LTC','2018-07-19 09:16:11.191926',86.66,1531991701,8666),(21,'BTC','2018-07-19 09:16:11.577915',7343.78,1531991763,734378),(22,'DASH','2018-07-19 09:16:11.971030',263.03,1531991763,26303),(23,'ETH','2018-07-19 09:19:05.531738',476.85,1531991881,47685),(24,'LTC','2018-07-19 09:19:05.818541',86.64,1531991881,8664),(25,'BTC','2018-07-19 09:19:06.175691',7344.81,1531991941,734481),(26,'DASH','2018-07-19 09:19:11.771325',263.03,1531991941,26303),(27,'ETH','2018-07-19 14:01:31.928660',481.30,1532008861,48130),(28,'ETH','2018-07-19 14:01:32.092375',481.30,1532008861,48130),(29,'LTC','2018-07-19 14:01:32.407033',88.38,1532008861,8838),(30,'LTC','2018-07-19 14:01:32.511651',88.38,1532008861,8838),(31,'BTC','2018-07-19 14:01:32.738924',7481.49,1532008861,748149),(32,'BTC','2018-07-19 14:01:32.764568',7481.49,1532008861,748149),(33,'ETH','2018-07-19 14:01:32.770696',481.30,1532008861,48130),(34,'LTC','2018-07-19 14:01:32.865502',88.38,1532008861,8838),(35,'DASH','2018-07-19 14:01:32.889307',268.03,1532008861,26803),(36,'DASH','2018-07-19 14:01:32.933564',268.03,1532008861,26803),(37,'ETH','2018-07-19 14:01:33.208863',481.30,1532008861,48130),(38,'LTC','2018-07-19 14:01:33.325770',88.38,1532008861,8838),(39,'LTC','2018-07-19 14:01:33.389374',88.38,1532008861,8838),(40,'BTC','2018-07-19 14:01:33.434404',7481.49,1532008861,748149),(41,'BTC','2018-07-19 14:01:33.553201',7481.49,1532008861,748149),(42,'DASH','2018-07-19 14:01:33.773260',268.03,1532008861,26803),(43,'DASH','2018-07-19 14:01:34.387814',268.03,1532008861,26803),(44,'ETH','2018-07-19 14:01:34.558324',481.30,1532008861,48130),(45,'LTC','2018-07-19 14:01:34.651363',88.38,1532008861,8838),(46,'BTC','2018-07-19 14:01:34.772784',7481.49,1532008861,748149),(47,'DASH','2018-07-19 14:01:34.895369',268.03,1532008861,26803),(48,'ETH','2018-07-19 14:01:34.919381',481.30,1532008861,48130),(49,'LTC','2018-07-19 14:01:34.955265',88.38,1532008861,8838),(50,'LTC','2018-07-19 14:01:35.023901',88.38,1532008861,8838),(51,'BTC','2018-07-19 14:01:35.053526',7481.49,1532008861,748149),(52,'ETH','2018-07-19 14:01:35.058454',481.30,1532008861,48130),(53,'LTC','2018-07-19 14:01:35.189933',88.38,1532008861,8838),(54,'DASH','2018-07-19 14:01:35.283882',268.03,1532008861,26803),(55,'BTC','2018-07-19 14:01:35.368044',7481.49,1532008861,748149),(56,'ETH','2018-07-19 14:01:35.436462',481.30,1532008861,48130),(57,'DASH','2018-07-19 14:01:35.502695',268.03,1532008861,26803),(58,'LTC','2018-07-19 14:01:35.593432',88.38,1532008861,8838),(59,'BTC','2018-07-19 14:01:35.695144',7481.49,1532008861,748149),(60,'DASH','2018-07-19 14:01:35.822397',268.03,1532008861,26803),(61,'ETH','2018-07-19 14:06:25.188398',477.93,1532009161,47793),(62,'LTC','2018-07-19 14:06:25.382669',87.64,1532009161,8764),(63,'BTC','2018-07-19 14:06:25.743613',7456.80,1532009161,745680),(64,'DASH','2018-07-19 14:06:26.022200',266.83,1532009161,26683),(65,'ETH','2018-07-19 14:11:24.848275',476.64,1532009401,47664),(66,'LTC','2018-07-19 14:11:24.972784',87.33,1532009401,8733),(67,'BTC','2018-07-19 14:11:25.229543',7445.30,1532009462,744530),(68,'DASH','2018-07-19 14:11:25.392451',266.88,1532009462,26688),(69,'ETH','2018-07-19 14:16:25.016731',475.88,1532009761,47588),(70,'LTC','2018-07-19 14:16:25.166416',87.43,1532009761,8743),(71,'BTC','2018-07-19 14:16:25.363481',7451.54,1532009761,745154),(72,'DASH','2018-07-19 14:16:25.556396',266.91,1532009761,26691),(73,'ETH','2018-07-19 14:21:25.025488',474.72,1532010001,47472),(74,'ETH','2018-07-19 14:26:25.229371',473.40,1532010361,47340),(75,'LTC','2018-07-19 14:26:25.388144',87.12,1532010361,8712),(76,'BTC','2018-07-19 14:26:25.595105',7447.12,1532010361,744712),(77,'DASH','2018-07-19 14:26:25.794419',266.92,1532010361,26692),(78,'ETH','2018-07-19 14:31:25.340419',473.39,1532010661,47339),(79,'LTC','2018-07-19 14:31:25.473085',87.06,1532010661,8706),(80,'BTC','2018-07-19 14:31:25.678083',7446.69,1532010661,744669),(81,'DASH','2018-07-19 14:31:25.852744',266.93,1532010661,26693),(82,'ETH','2018-07-19 14:36:25.287115',474.59,1532010962,47459),(83,'LTC','2018-07-19 14:36:25.460166',87.18,1532010962,8718),(84,'BTC','2018-07-19 14:36:25.640118',7461.49,1532010962,746149),(85,'DASH','2018-07-19 14:36:25.800382',267.42,1532010962,26742),(86,'ETH','2018-07-19 14:41:25.659218',475.06,1532011261,47506),(87,'LTC','2018-07-19 14:41:25.833016',87.24,1532011261,8724),(88,'BTC','2018-07-19 14:41:25.977591',7456.60,1532011261,745660),(89,'DASH','2018-07-19 14:41:26.152795',267.94,1532011261,26794),(90,'ETH','2018-07-19 14:46:25.140812',475.12,1532011561,47512),(91,'BTC','2018-07-19 14:46:25.521171',7459.98,1532011561,745998),(92,'ETH','2018-07-19 14:51:25.232360',475.91,1532011861,47591),(93,'LTC','2018-07-19 14:51:25.454293',87.39,1532011861,8739),(94,'BTC','2018-07-19 14:51:25.565850',7480.95,1532011801,748095),(95,'DASH','2018-07-19 14:51:25.722636',268.84,1532011861,26884),(96,'ETH','2018-07-19 14:56:25.131942',475.53,1532012102,47553),(97,'LTC','2018-07-19 14:56:25.252347',87.18,1532012102,8718),(98,'BTC','2018-07-19 14:56:25.586156',7472.44,1532012161,747244),(99,'DASH','2018-07-19 14:56:25.906142',268.64,1532012161,26864),(100,'LTC','2018-07-19 15:01:25.376921',87.16,1532012461,8716),(101,'BTC','2018-07-19 15:01:25.746429',7460.12,1532012461,746012),(102,'DASH','2018-07-19 15:01:26.142271',267.87,1532012461,26787),(103,'ETH','2018-07-21 13:24:51.236030',460.23,1532179441,46023),(104,'LTC','2018-07-21 13:24:51.546366',83.09,1532179441,8309),(105,'BTC','2018-07-21 13:24:51.859789',7364.61,1532179441,736461),(106,'ETH','2018-07-21 13:36:06.231722',460.25,1532180161,46025),(107,'LTC','2018-07-21 13:36:06.910324',83.07,1532180161,8307),(108,'BTC','2018-07-21 13:36:07.382887',7365.25,1532180161,736525),(109,'DASH','2018-07-21 13:36:07.814529',238.99,1532180101,23899),(110,'ETH','2018-07-21 13:41:03.563661',460.42,1532180401,46042),(111,'BTC','2018-07-21 13:41:05.321863',7367.28,1532180462,736728),(112,'LTC','2018-07-21 13:46:05.435250',83.13,1532180761,8313),(113,'BTC','2018-07-21 13:46:05.809902',7367.10,1532180761,736710),(114,'ETH','2018-07-21 13:51:03.682419',460.41,1532181001,46041),(115,'BTC','2018-07-21 13:56:05.423911',7355.70,1532181361,735570),(116,'DASH','2018-07-21 13:56:05.700898',242.54,1532181361,24254),(117,'ETH','2018-07-21 14:01:04.016091',458.95,1532181601,45895),(118,'LTC','2018-07-21 14:01:04.498217',83.11,1532181661,8311),(119,'BTC','2018-07-21 14:01:05.119171',7358.01,1532181661,735801),(120,'DASH','2018-07-21 14:01:05.436171',244.17,1532181601,24417),(121,'ETH','2018-07-21 14:06:03.916134',460.48,1532181902,46048),(122,'BTC','2018-07-21 14:06:04.866816',7373.65,1532181961,737365),(123,'BTC','2018-07-21 14:16:06.066358',7375.10,1532182501,737510),(124,'BTC','2018-07-21 14:21:06.281085',7377.26,1532182862,737726);
/*!40000 ALTER TABLE `exchange_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_attachment`
--

DROP TABLE IF EXISTS `helpdesk_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(1000) COLLATE utf8_bin NOT NULL,
  `filename` varchar(1000) COLLATE utf8_bin NOT NULL,
  `mime_type` varchar(255) COLLATE utf8_bin NOT NULL,
  `size` int(11) NOT NULL,
  `followup_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `helpdesk_attachment_followup_id_bed12db9_fk_helpdesk_followup_id` (`followup_id`),
  CONSTRAINT `helpdesk_attachment_followup_id_bed12db9_fk_helpdesk_followup_id` FOREIGN KEY (`followup_id`) REFERENCES `helpdesk_followup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_attachment`
--

LOCK TABLES `helpdesk_attachment` WRITE;
/*!40000 ALTER TABLE `helpdesk_attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_attachment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_customfield`
--

DROP TABLE IF EXISTS `helpdesk_customfield`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_customfield` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `label` varchar(30) COLLATE utf8_bin NOT NULL,
  `help_text` longtext COLLATE utf8_bin,
  `data_type` varchar(100) COLLATE utf8_bin NOT NULL,
  `max_length` int(11) DEFAULT NULL,
  `decimal_places` int(11) DEFAULT NULL,
  `empty_selection_list` tinyint(1) NOT NULL,
  `list_values` longtext COLLATE utf8_bin,
  `ordering` int(11) DEFAULT NULL,
  `required` tinyint(1) NOT NULL,
  `staff_only` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_customfield`
--

LOCK TABLES `helpdesk_customfield` WRITE;
/*!40000 ALTER TABLE `helpdesk_customfield` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_customfield` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_emailtemplate`
--

DROP TABLE IF EXISTS `helpdesk_emailtemplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_emailtemplate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `subject` varchar(100) COLLATE utf8_bin NOT NULL,
  `heading` varchar(100) COLLATE utf8_bin NOT NULL,
  `plain_text` longtext COLLATE utf8_bin NOT NULL,
  `html` longtext COLLATE utf8_bin NOT NULL,
  `locale` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_emailtemplate`
--

LOCK TABLES `helpdesk_emailtemplate` WRITE;
/*!40000 ALTER TABLE `helpdesk_emailtemplate` DISABLE KEYS */;
INSERT INTO `helpdesk_emailtemplate` VALUES (1,'assigned_cc','(Assigned)','Ticket Assigned','Hello,\r\n\r\nThis is a courtesy e-mail to let you know that ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") for {{ ticket.submitter_email }} has been {% if ticket.assigned_to %}assigned to {{ ticket.assigned_to }}{% else %}unassigned{% endif %}.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: {{ ticket.get_assigned_to }}\r\nView Online: {{ ticket.staff_url }}\r\n\r\nThe original ticket description was:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">This is a courtesy e-mail to let you know that ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) for {{ ticket.submitter_email }} has been {% if ticket.assigned_to %}assigned to {{ ticket.assigned_to }}{% else %}unassigned{% endif %}.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','en'),(2,'assigned_owner','(Assigned To You)','Ticket Assigned To You','Hello,\r\n\r\nThis is a courtesy e-mail to let you know that ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") for {{ ticket.submitter_email }} has been assigned to you.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: YOU\r\nView Online: {{ ticket.staff_url }}\r\n\r\nThe original ticket description was:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">This is a courtesy e-mail to let you know that ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) for {{ ticket.submitter_email }} has been assigned to <b>you</b>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: YOU<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','en'),(3,'closed_cc','(Closed)','Ticket Closed','Hello,\r\n\r\nTicket {{ ticket.title }} (\"{{ ticket.title }}\"){% if ticket.assigned_to %}, assigned to {{ ticket.assigned_to }}{% endif %} has been closed.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: {{ ticket.get_assigned_to }}\r\nView Online: {{ ticket.staff_url }} (login required)\r\n\r\nThe original description was:\r\n\r\n{{ ticket.description }}\r\n\r\nThe resolution provided was:\r\n\r\n{{ resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ticket <i>{{ ticket.title }}</i> (\'{{ ticket.title }}\'){% if ticket.assigned_to %}, assigned to {{ ticket.get_assigned_to }}{% endif %} has been closed.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The resolution provided was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">If you wish to view this ticket online, you can visit <a href=\'{{ ticket.staff_url }}\'>{{ ticket.staff_url }}</a>.</p>','en'),(4,'closed_owner','(Closed)','Ticket Closed','Hello,\r\n\r\nThe following ticket, which is currently assigned to you, has been closed.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: {{ ticket.get_assigned_to }}\r\nView Online: {{ ticket.staff_url }} (login required)\r\n\r\nIf you wish to view this ticket online, you can visit {{ ticket.staff_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The following ticket, which is currently assigned to you, has been closed.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The resolution provided was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>','en'),(5,'closed_submitter','(Closed)','Ticket Closed','Hello,\r\n\r\nYou recently logged a ticket with a subject of \"{{ ticket.title }}\" with us. This e-mail is to confirm that this ticket has been closed.\r\n\r\nIf you believe that further work is required on this ticket, please let us know by replying to this e-mail and keeping the subject intact.\r\n\r\nIf you wish to view this ticket online, you can visit {{ ticket.ticket_url }}.\r\n\r\nThe resolution provided was:\r\n\r\n{{ ticket.resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">You recently logged a ticket with a subject of <i>{{ ticket.title }}</i> with us. This e-mail is to confirm that this ticket has been closed.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The resolution that has been provided is:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">If you wish to view this ticket online, you can visit <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>. If you believe that further work is required on this ticket, please let us know by replying to this e-mail and keeping the subject intact.</p>','en'),(6,'escalated_cc','(Escalated)','Ticket Escalated','Hello,\r\n\r\nThis is a courtesy e-mail to let you know that ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") has been escalated automatically.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: {{ ticket.get_assigned_to }}\r\nView Online: {{ ticket.staff_url }} (login required)\r\n\r\nThe original ticket description was:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">This is a courtesy e-mail to let you know that ticket <i>{{ ticket.ticket }}</i> (\'{{ ticket.title }}\') has been escalated automatically.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','en'),(7,'escalated_submitter','(Escalated)','Your Ticket Has Been Escalated','Hello,\r\n\r\nYou recently logged a ticket with a subject of \"{{ ticket.title }}\" with us. This e-mail is to advise you of an automated escalation of that ticket as it has been open for longer than expected.\r\n\r\nWe will review your ticket shortly and attempt to provide a resolution as soon as possible.\r\n\r\nIf you wish to view this ticket online, you can visit {{ ticket.ticket_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 11pt;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">You recently logged a ticket with a subject of <i>{{ ticket.title }}</i> with us. This e-mail is to advise you of an automated escalation of that ticket as it has been open for longer than expected.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">We will review your ticket shortly and attempt to provide a resolution as soon as possible.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">If you wish to view this ticket online, you can visit <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','en'),(8,'escalated_owner','(Escalated)','Ticket Assigned to You Has Been Escalated','Hello,\r\n\r\nA ticket currently assigned to you has been automatically escalated as it has been open for longer than expected.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: {{ ticket.get_assigned_to }}\r\nView Online: {{ ticket.staff_url }} (login required)\r\n\r\nThe original ticket description was:\r\n\r\n{{ ticket.description }}\r\n\r\nPlease review this ticket and attempt to provide a resolution as soon as possible.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">A ticket currently assigned to you has been automatically escalated as it has been open for longer than expected.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','en'),(9,'newticket_cc','(Opened)','New Ticket Opened','Hello,\r\n\r\nThis is a courtesy e-mail to let you know that a new ticket has been opened.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nView Online: {{ ticket.staff_url }} (login required)\r\n\r\nDescription:\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">This is a courtesy e-mail to let you know that a new ticket has been opened.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Description:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','en'),(10,'newticket_submitter','(Opened)','Your Ticket Has Been Opened','Hello,\r\n\r\nThis is a courtesy e-mail to let you know that we have received your helpdesk query with a subject of \"{{ ticket.title }}\". \r\n\r\nYou do not have to do anything further at this stage. Your ticket has been assigned a number of {{ ticket.ticket }} and will be responded to shortly.\r\n\r\nIf you wish to send us further details, or if you have any queries about this ticket, please include the ticket id of \'{{ ticket.ticket }}\' in the subject. The easiest way to do this is just press \"reply\" to this message.\r\n\r\nIf you wish to view this ticket online to provide further information, attach files or view recent updates, you can visit {{ ticket.ticket_url }}.\r\n\r\nWe will investigate your query and attempt to resolve it as soon as possible. You will receive further updates and a resolution via this e-mail address.\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">This is a courtesy e-mail to let you know that we have received your helpdesk query with a subject of <i>{{ ticket.title }}</i>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">You do not have to do anything further at this stage. Your ticket has been assigned a number of <b>{{ ticket.ticket }}</b> and will be responded to shortly.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">If you wish to send us further details, or if you have any queries about this ticket, please include the ticket id of <b>{{ ticket.ticket }}</b> in the subject. The easiest way to do this is just press \"reply\" to this message.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">If you wish to view this ticket online to provide further information, attach files or view recent updates, you can visit <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">We will investigate your query and attempt to resolve it as soon as possible. You will receive further updates and a resolution via this e-mail address.</p>','en'),(11,'resolved_cc','(Resolved)','Ticket Resolved','Hello,\r\n\r\nThe following ticket has been resolved:\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: {{ ticket.get_assigned_to }}\r\nView Online: {{ ticket.staff_url }} (login required)\r\n\r\nThe original ticket description was:\r\n\r\n{{ ticket.description }}\r\n\r\nThe resolution provided was:\r\n\r\n{{ ticket.resolution }}\r\n\r\nThis resolution has been e-mailed to the submitter, who will verify it before you can close this ticket.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The following ticket has been resolved.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The resolution that was added was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">This resolution has been e-mailed to the submitter, who will verify it before you can close this ticket.</p>','en'),(12,'resolved_owner','(Resolved)','Ticket Resolved','Hello,\r\n\r\nA ticket currently assigned to you has been resolved.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: {{ ticket.get_assigned_to }}\r\nView Online: {{ ticket.staff_url }} (login required)\r\n\r\nThe original ticket description was:\r\n\r\n{{ ticket.description }}\r\n\r\nThe resolution provided was:\r\n\r\n{{ ticket.resolution }}\r\n\r\nThis resolution has been e-mailed to the submitter, who will verify it before you can close this ticket.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">A ticket currently assigned to you has been resolved.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The resolution that was added was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">This resolution has been e-mailed to the submitter, who will verify it before you can close this ticket.</p>','en'),(13,'resolved_submitter','(Resolved)','Your Ticket Has Been Resolved','Hello,\r\n\r\nYou recently logged a ticket with a subject of \"{{ ticket.title }}\" with us. This e-mail is to advise you of a resolution to that ticket.\r\n\r\nThe following resolution was added to ticket {{ ticket.ticket }}:\r\n\r\n{{ resolution }}\r\n\r\nCan you please confirm that this resolution addresses your needs so we may close this ticket? If you have any further queries, or if you do not believe this resolution is adequate, please reply to this e-mail and keep the subject intact.\r\n\r\nIf you wish to view this ticket online, you can visit {{ ticket.ticket_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">You recently logged a ticket with a subject of <i>{{ ticket.title }}</i> with us. This e-mail is to advise you of a resolution to that ticket.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The following resolution was added to ticket <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Can you please confirm that this resolution addresses your needs so we may close this ticket? If you have any further queries, or if you do not believe this resolution is adequate, please reply to this e-mail and keep the subject intact.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">If you wish to view this ticket online, you can visit <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','en'),(14,'updated_cc','(Updated)','Ticket Updated','Hello,\r\n\r\nThis is a courtesy e-mail to let you know that ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") for {{ ticket.submitter_email }} has been updated.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: {{ ticket.get_assigned_to }}\r\nView Online: {{ ticket.staff_url }} (login required)\r\n\r\nOriginal description:\r\n\r\n{{ ticket.description }}\r\n\r\nThe following comment was added:\r\n\r\n{{ comment }}\r\n\r\nThis information has {% if private %}not {% endif %} been e-mailed to the submitter.\r\n\r\nIf you wish to view this ticket online, you can visit {{ ticket.staff_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">This is a courtesy e-mail to let you know that ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") for {{ ticket.submitter_email }} has been updated.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The following comment was added:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">This information has {% if private %}not {% endif %} been e-mailed to the submitter.</p>','en'),(15,'updated_owner','(Updated)','Ticket Updated','Hello,\r\n\r\nThis is a courtesy e-mail to let you know that ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") for {{ ticket.submitter_email }}, which is assigned to you, has been updated.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nQueue: {{ queue.title }}\r\nTitle: {{ ticket.title }}\r\nOpened: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSubmitter: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriority: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nAssigned to: {{ ticket.get_assigned_to }}\r\nView Online: {{ ticket.staff_url }} (login required)\r\n\r\nOriginal description:\r\n\r\n{{ ticket.description }}\r\n\r\nThe following comment was added:\r\n\r\n{{ comment }}\r\n\r\nThis information has {% if private %}not {% endif %} been e-mailed to the submitter.\r\n\r\nIf you wish to view this ticket online, you can visit {{ ticket.staff_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">This is a courtesy e-mail to let you know that ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") for {{ ticket.submitter_email }}, which is assigned to you, has been updated.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Queue</b>: {{ queue.title }}<br>\r\n<b>Title</b>: {{ ticket.title }}<br>\r\n<b>Opened</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Submitter</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priority</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Assigned to</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>View Online</a></b> to update this ticket (login required)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Just for reference, the original ticket description was:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The following comment was added:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">This information has {% if private %}not {% endif %} been e-mailed to the submitter.</p>','en'),(16,'updated_submitter','(Updated)','Your Ticket Has Been Updated','Hello,\r\n\r\nYou recently logged a ticket with a subject of \"{{ ticket.title }}\" with us. This e-mail is to advise you of an update to that ticket.\r\n\r\nThe following comment was added to ticket {{ ticket.ticket }}:\r\n\r\n{{ comment }}\r\n\r\nIf you need to provide us with further information, please reply to this e-mail and keep the subject intact. Alternatively, you can view and update this ticket online by visiting {{ ticket.ticket_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hello,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">You recently logged a ticket with a subject of <i>{{ ticket.title }}</i> with us. This e-mail is to advise you of an update to that ticket.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">The following comment was added to ticket <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">If you need to provide us with further information, please reply to this e-mail and keep the subject intact. Alternatively, you can view and update this ticket online by visiting <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','en'),(17,'assigned_cc',' ','Заявка','Здравствуйте,\r\n\r\nУведомляем Вас о том, что заявка, {{ ticket.ticket }} (\"{{ ticket.title }}\") от {{ ticket.submitter_email }}, была {% if ticket.assigned_to %} принята {{ ticket.assigned_to }}{% else %} отклонена {% endif %}.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПрисвоена: {{ ticket.get_assigned_to }}\r\nПерейти к заявке: {{ ticket.staff_url }}\r\n\r\nИзначальное описание:\r\n\r\n{{ ticket.description }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Уведомляем Вас о том, что заявка <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) от {{ ticket.submitter_email }} была {% if ticket.assigned_to %}принята {{ ticket.assigned_to }}{% else %}отклонена{% endif %}.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Изначальное описание :</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','ru'),(18,'assigned_owner',' ','Вам присвоенна заявка','Здравствуйте,\r\n\r\nУведомляем Вас о том, что заявка {{ ticket.ticket }} (\"{{ ticket.title }}\") от {{ ticket.submitter_email }} была присвоенна Вам.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПрисвоена: ВАМ\r\nПросмотреть онлайн: {{ ticket.staff_url }}\r\n\r\nИзначальное описание:\r\n\r\n{{ ticket.description }}','<p style=\"font-family: sans-serif; font-size: 1em\";>Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Уведомляем Вас о том, что заявка <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) от {{ ticket.submitter_email }} была присвоена  <b>Вам</b>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: ВАМ<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Изначальное описание заявки:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','ru'),(19,'closed_cc',' ','Заявка закрыта','Здравствуйте,\r\n\r\nЗаявка {{ ticket.title }} (\"{{ ticket.title }}\"){% if ticket.assigned_to %}, присвоенная {{ ticket.assigned_to }}{% endif %} была закрыта.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПрисвоена: {{ ticket.get_assigned_to }}\r\nПерейти к заявке: {{ ticket.staff_url }} (требуется авторизация)\r\n\r\nИзначальное описание:\r\n\r\n{{ ticket.description }}\r\n\r\nБыло предложено следующее решение:\r\n\r\n{{ resolution }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Заявка <i>{{ ticket.title }}</i> (\"{{ ticket.title }}\"){% if ticket.assigned_to %}, присвоенная {{ ticket.get_assigned_to }}{% endif %} была закрыта.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> to оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Изначальное описание:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;>{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=font-family: sans-serif; font-size: 1em;\">Было принято следующее решение:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Перейти к заявке <a href=\"{{ ticket.staff_url }}\">{{ ticket.staff_url }}</a>.</p>','ru'),(20,'closed_owner',' ','Заявка закрыта','Hello,\r\n\r\nСледующая заявка, которая на данный момент присвоена Вам, была закрыта.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПрисвоена: {{ ticket.get_assigned_to }}\r\nПерейти к заявке: {{ ticket.staff_url }} (требуется авторизаци)\r\n\r\nДля просмотра заявки перейдите по ссылке {{ ticket.staff_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Следующая заявка, которая на данный момент присвоена Вам, была закрыта.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> Оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif\"; font-size: 1em;>Изначальное описание:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Было предложено следующее решение:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>','ru'),(21,'closed_submitter',' ','Заявка закрыта','Здравствуйте,\r\n\r\nВами была оставлена заявка \"{{ ticket.title }}\"  Уведомляем Вас о том, что ваша заявка была закрыта\r\n\r\nЕсли вы считаете, что для решения проблемы требуется дальнейшая работа, пожалуйста, сообщите нам об этом, ответив на это письмо.\r\n\r\nДля просмотра заявки перейдите по ссылке {{ ticket.ticket_url }}.\r\n\r\nБыло предложено следующее решение:\r\n\r\n{{ ticket.resolution }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Вами была оставлена заявка<i>{{ ticket.title }}</i>  Уведомляем Вас о том, что ваша заявка была закрыта.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Было предложено следующее решение:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Для просмотра заявки перейдите по ссылке <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>. Если вы считаете, что для решения проблемы требуется дальнейшая работа, пожалуйста, сообщите нам об этом, ответив на это письмо.</p>','ru'),(22,'escalated_cc',' ','Приоритет заявки повышен','Здравствуйте,\r\n\r\nУведомляем Вас о том, что приоритет заявки {{ ticket.ticket }} (\"{{ ticket.title }}\") был автоматически повышен.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПрисвоена: {{ ticket.get_assigned_to }}\r\nПерейти к заявке: {{ ticket.staff_url }} (login required)\r\n\r\nИзначальное описание:\r\n\r\n{{ ticket.description }}','<p style=\"font-family: sans-serif; font-size: 1em\";>Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Уведомляем Вас о том, что приоритет заявки <i>{{ ticket.ticket }}</i> (\"{{ ticket.title }}\")был автоматически повышен.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Изначальное описание :</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','ru'),(23,'escalated_owner',' ','Приоритет присвоенной Вам заявки был повышен','Здравствуйте,\r\n\r\nПриоритет заявки, которая на данный момент присвоена Вам, был автоматически повышен, так как она оставалась открытой дольше, чем ожидалось.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nАдресованна: {{ ticket.get_assigned_to }}\r\nПерейти к заявке: {{ ticket.staff_url }} (необходима авторизация)\r\n\r\nИзначальное описание:\r\n\r\n{{ ticket.description }}\r\n\r\nПожалуйста, рассмотрите заявку и и попытайтесь найти решение проблемы как можно быстрее.','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Приоритет заявки, которая на данный момент присвоена Вам, был автоматически повышен, так как она оставалась открытой дольше, чем ожидалось.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\nПриоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b>оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Изначальное описание заявки:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','ru'),(24,'escalated_submitter',' ','Повышение приоритета Вашей заявки','Здравствуте,\r\n\r\nВами была оставлена заявка  \"{{ ticket.title }}\"  Советуем Вам воспользоваться автоматизированным повышением приоритета этой заявки, так как она оставалась открытой дольше, чем ожидалось.\r\n\r\nВскоре мы пересмотрим вашу заявку и попытаемся найти решение проблемы как можно быстрее.\r\n\r\nПерейти к заявке {{ ticket.ticket_url }}.','<p style=\"font-family: sans-serif; font-size: 11pt;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Вами была оставлена заявка <i>{{ ticket.title }}</i> Советуем Вам воспользоваться автоматизированным повышением приоритета этой заявки, так как она оставалась открытой дольше, чем ожидалось.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Вскоре мы пересмотрим вашу заявку и попытаемся найти решение проблемы как можно быстрее.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Перейти к заявке<a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','ru'),(25,'newticket_cc',' ','Подана новая заявка','Здравствуйте,\r\n\r\nУведомляем Вас о том, что была подана новая заявка.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПерейти к заявке: {{ ticket.staff_url }} (login required)\r\n\r\nОписание:\r\n{{ ticket.description }}\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Уведомляем Вас о том, что была подана новая заявка</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Описание:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','ru'),(26,'newticket_submitter',' ','Ваша заявка была успешно создана','Здравствуйте,\r\n\r\nУведомляем Вас о том, что мы получили Ваш запрос на тему \"{{ ticket.title }}\". \r\n\r\nНа данном этапе Вам не нужно ничего делать. Вашей заявке был присвоен номер {{ ticket.ticket }}и вскоре Ваш запрос будет обработан.\r\n\r\nЕсли Вы хотите сообщить нам какую-либо дополнительную информацию, или если у Вас есть вопросы относительно заявки, пожалуйста напишите id заявки \"{{ ticket.ticket }}\" в теме письма. Легче всего это сделать, просто нажав \"ответить\".\r\n\r\nЕсли Вы хотите просмотреть заявку онлайн, сообщить дополнительную информацию, прикрепить файлы или просмотреть последние комментарии, Вы можете перейти по следующей ссылке. {{ ticket.ticket_url }}.\r\n\r\nМы обработаем Ваш запрос и постараемся найти решение как можно быстрее. В дальнейшем, мы будем держать Вас в курсе дела, отправляя письма с этого электронного адреса.','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Уведомляем Вас о том, что мы получили Ваш запрос на тему <i>{{ ticket.title }}</i>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">На данном этапе Вам не нужно ничего делать. Вашей заявке был присвоен номер <b>{{ ticket.ticket }}</b> и вскоре Ваш запрос будет обработан.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Если Вы хотите сообщить нам какую-либо дополнительную информацию, или если у Вас есть вопросы относительно заявки, пoжалуйста напишите id заявки <b>{{ ticket.ticket }}</b> в теме письма. Легче всего это сделать, просто нажав \"ответить\".</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Вы хотите просмотреть заявку онлайн, сообщить дополнительную информацию, прикрепить файлы или просмотреть последние комментарии, Вы можете перейти по следующей ссылке. <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Мы обработаем Ваш запрос и постараемся найти решение как можно быстрее. В дальнейшем, мы будем держать Вас в курсе дела, отправляя письма с этого электронного адреса.</p>','ru'),(27,'resolved_cc',' ','Решение найдено','Здравствуйте,\r\n\r\nБыло найдено решение проблемы, указанной в следующей заявке:\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПрисвоена: {{ ticket.get_assigned_to }}\r\nПерейти к заявке: {{ ticket.staff_url }} (требуется авторизация)\r\n\r\nИзначальное описание:\r\n\r\n{{ ticket.description }}\r\n\r\nБыло предложено следующее решение:\r\n\r\n{{ ticket.resolution }}\r\n\r\nЭто решение было отправлено автору заявки, который должен будет подтвердить его, прежде чем Вы сможете закрыть эту заявку.','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Было найдено решение проблемы, указанной в следующей заявке.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Изначальное описание:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Было предложено следующее решение:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Это решение было отправлено автору заявки, который должен будет подтвердить его, прежде чем Вы сможете закрыть эту заявку.</p>','ru'),(28,'resolved_owner',' ','Решение найдено','Здравствуйте,\r\n\r\nБыло найдено решение проблемы, указанной в присвоенной Вам заявке.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПрисвоена: {{ ticket.get_assigned_to }}\r\nПерейти к заявке: {{ ticket.staff_url }} (требуется авторизация)\r\n\r\nИзначальное описание:\r\n\r\n{{ ticket.description }}\r\n\r\nБыло предложено следующее решение:\r\n\r\n{{ ticket.resolution }}\r\n\r\nЭто решение было отправлено автору заявки, который должен будет подтвердить его, прежде чем Вы сможете закрыть эту заявку.','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Было найдено решение проблемы, указанной в присвоенной Вам заявке.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Изначальное описание:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Было предложено следующее решение:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Это решение было отправлено автору заявки, который должен будет подтвердить его, прежде чем Вы сможете закрыть эту заявку.</p>','ru'),(29,'resolved_submitter',' ','Проблема, указанная в Вашей заявке была решена.','Здравствуйте,\r\n\r\nВами была оставлена заявка \"{{ ticket.title }}\" В этом письме содержится решение указанной Вами проблемы. \r\n\r\nСледующее решение было предложено к заявке {{ ticket.ticket }}:\r\n\r\n{{ resolution }}\r\n\r\nНе могли бы Вы сообщить, подходит ли Вам это решение, чтобы мы могли закрыть эту заявку? Если у Вас возникли какие-либо вопросы или сомнения в отношении адекватности этого решения, пожалуйста, ответьте на это письмо.\r\n\r\nДля просмотра заявки перейдите по ссылке {{ ticket.ticket_url }}.','<p style=\"font-family: sans-serif\"; font-size: 1em;>Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Вами была оставлена заявка <i>{{ ticket.title }}</i>  В этом письме содержится решение указанной Вами проблемы.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Следующий комментарий был добавлен к заявке <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Не могли бы Вы сообщить, подходит ли Вам это решение, чтобы мы могли закрыть эту заявку? Если у Вас возникли какие-либо вопросы или сомнения в отношении адекватности этого решения, пожалуйста, ответьте на это письмо.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Для просмотра заявки перейдите по ссылке<a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','ru'),(30,'updated_cc',' ','Заявка обновлена','Здравствуйте,\r\n\r\nУведомляем Вас о том, чтоо заявка {{ ticket.ticket }} (\"{{ ticket.title }}\") от {{ ticket.submitter_email }} была обновлена.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПрисвоена: {{ ticket.get_assigned_to }}\r\nПросмотреть онлайн: {{ ticket.staff_url }} (login required)\r\n\r\nИзначальное описание:\r\n\r\n{{ ticket.description }}\r\n\r\nБыл добавлен следующий комментарий:\r\n\r\n{{ comment }}\r\n\r\nЭта информация {% if private %}не {% endif %} была отправлена адресатуbeen e-mailed to the submitter.\r\n\r\nЕсли Вы хотите просмотреть заявку онлайн, перейдите по следующей ссылке{{ ticket.staff_url }}.','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Уведомляем Вас о том, что заявка{{ ticket.ticket }} (\"{{ ticket.title }}\") от {{ ticket.submitter_email }} была обновлена.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> Оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Изначальное описание :</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Был добавлен следующий комментарий:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Эта информация {% if private %}не{% endif %} была отправленна на электронный ящик автора заявки.</p>','ru'),(31,'updated_owner',' ','Заявка обновлена','Здравствуйте,\r\n\r\nУведомляем Вас о том, что к заявке {{ ticket.ticket }} (\"{{ ticket.title }}\") от {{ ticket.submitter_email }}, которая была присвоенна Вам, был добавлен новый комментарий.\r\n\r\nID заявки: {{ ticket.ticket }}\r\nОчередь: {{ queue.title }}\r\nЗаголовок: {{ ticket.title }}\r\nСоздана: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nАвтор заявки: {{ ticket.submitter_email|default:\"Unknown\" }}\r\nПриоритет: {{ ticket.get_priority_display }}\r\nСтатус: {{ ticket.get_status }}\r\nПрсвоена: {{ ticket.get_assigned_to }}\r\nПерейти к заявке: {{ ticket.staff_url }} (требуется авторизация)\r\n\r\nИзначальное описание:\r\n\r\n{{ ticket.description }}\r\n\r\nБыл добавлен следующий комментарий:\r\n\r\n{{ comment }}\r\n\r\nЭта информация {% if private %}не {% endif %} была отправленна на электронный ящик автора заявки.\r\n\r\nДля просмотра заявки онлайн перейдите по следующей ссылке {{ ticket.staff_url }}.','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Уведомляем Вас о том, что к заявке {{ ticket.ticket }} (\"{{ ticket.title }}\") от {{ ticket.submitter_email }}, которая была присвоенна Вам, был добавлен новый комментарий.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>ID заявки</b>: {{ ticket.ticket }}<br>\r\n<b>Очередь</b>: {{ queue.title }}<br>\r\n<b>Заголовок</b>: {{ ticket.title }}<br>\r\n<b>Создана</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Автор заявки</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Приоритет</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Статус</b>: {{ ticket.get_status }}<br>\r\n<b>Присвоена</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\"{{ ticket.staff_url }}\">Перейти к заявке</a></b> оставить комментарий (требуется авторизация)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Изначальное описание :</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Был добавлен следующий комментарий:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Эта информация{% if private %}не {% endif %}была отправлена на электронный ящик автора заявки.</p>','ru'),(32,'updated_submitter',' ','К Вашей заявке добавлен новый комментарий','Здравствуйте,\r\n\r\nВами была оставлена заявка \"{{ ticket.title }}\". Советуем Вам прокомментировать эту заявку.\r\n\r\nБыл добавлен следующий комментарий {{ ticket.ticket }}:\r\n\r\n{{ comment }}\r\n\r\nЕсли Вы хотите сообщить нам дополнительную информацию, пожалуйста ответьте на это письмо. Или же Вы можете сделать это, оставив комментарий к своей заявке. Перейти к заявке{{ ticket.ticket_url }}.','<p style=\"font-family: sans-serif; font-size: 1em;\">Здравствуйте,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Вами была оставлена заявка <i>{{ ticket.title }}</i> Советуем Вам прокомментировать эту заявку.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Следующий комментарий был добавлен к заявке<b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Если Вы хотите сообщить нам дополнительную информацию, пожалуйста ответьте на это письмо. Или же Вы можете сделать это, оставив комментарий к своей заявке. Перейти к заявке<a href=\"{{ ticket.ticket_urL }}\">{{ ticket.ticket_url }}</a>.</p>','ru'),(33,'assigned_cc','(Zugewiesen)','Ticket Zugewiesen','Hallo,\r\n\r\ngerne teilen wir Ihnen mit, dass Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") für {{ ticket.submitter_email }} {% if ticket.assigned_to %}zugewiesen wurde an {{ ticket.assigned_to }}{% else %}nicht mehr zugeordnet ist{% endif %}.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: {{ ticket.get_assigned_to }}\r\nOnline ansehen: {{ ticket.staff_url }}\r\n\r\nDie ursprüngliche Ticketbeschreibung war:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">gerne teilen wir Ihnen mit, dass Ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) für {{ ticket.submitter_email }} {% if ticket.assigned_to %}zugewiesen wurde an {{ ticket.assigned_to }}{% else %}nicht mehr zugeordnet ist{% endif %}.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich).</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','de'),(34,'assigned_owner','(Ihnen zugewiesen)','Ein Ticket wurde Ihnen zugewiesen','Hello,\r\n\r\ngerne teilen wir Ihnen mit, dass Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") für {{ ticket.submitter_email }} Ihnen zugewiesen wurde.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: SIE\r\nOnline ansehen: {{ ticket.staff_url }}\r\n\r\nDie ursprüngliche Ticketbeschreibung war:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">gerne teilen wir Ihnen mit, dass Ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) für {{ ticket.submitter_email }} <b>Ihnen</b> zugewiesen wurde.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: SIE<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','de'),(35,'closed_cc','(Geschlossen)','Ticket geschlossen','Hallo,\r\n\r\nTicket {{ ticket.title }} (\"{{ ticket.title }}\"){% if ticket.assigned_to %}, zugewiesen an {{ ticket.assigned_to }}{% endif %} wurde geschlossen.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: {{ ticket.get_assigned_to }}\r\nOnline ansehen: {{ ticket.staff_url }} (Login erforderlich)\r\n\r\nDie ursprüngliche Ticketbeschreibung war:\r\n\r\n{{ ticket.description }}\r\n\r\nDie Lösung war:\r\n\r\n{{ resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ticket <i>{{ ticket.title }}</i> (\'{{ ticket.title }}\'){% if ticket.assigned_to %}, zugewiesen an {{ ticket.get_assigned_to }}{% endif %} wurde geschlossen.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die Lösung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Sie können dieses Ticket unter folgendem Link online ansehen: <a href=\'{{ ticket.staff_url }}\'>{{ ticket.staff_url }}</a>.</p>','de'),(36,'closed_owner','(Geschlossen)','Ticket geschlossen','Hallo,\r\n\r\nDas folgende Ticket, das Ihnen zugewiesen war, wurde geschlossen.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: {{ ticket.get_assigned_to }}\r\nOnline ansehen: {{ ticket.staff_url }} (Login erforderlich)\r\n\r\nDie Lösung war:\r\n\r\n{{ resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Das folgende Ticket, das Ihnen zugewiesen war, wurde geschlossen.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die Lösung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>','de'),(37,'closed_submitter','(Geschlossen)','Ticket geschlossen','Hallo,\r\n\r\nSie haben kürzlich das Ticket \"{{ ticket.title }}\" bei uns eröffnet. Hiermit möchten wir Ihnen mitteilen das dieses Ticket nun geschlossen wurde.\r\n\r\nDie Lösung war:\r\n\r\n{{ resolution }}\r\n\r\nWenn Sie der Meinung sind, dass weitere Arbeit an diesem Ticket nötig ist, dann möchten wir Sie bitten, auf diese E-Mail zu antworten und den Betreff unverändert zu lassen.\r\n\r\nUnter folgendem Link können Sie das Ticket online ansehen: {{ ticket.ticket_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Sie haben kürzlich das Ticket <i>{{ ticket.title }}</i> bei uns eröffnet. Hiermit möchten wir Ihnen mitteilen das dieses Ticket nun geschlossen wurde.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die Lösung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Unter folgendem Link können Sie das Ticket online ansehen: <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>. Wenn Sie der Meinung sind, dass weitere Arbeit an diesem Ticket nötig ist, dann möchten wir Sie bitten, auf diese E-Mail zu antworten und den Betreff unverändert zu lassen.</p>','de'),(38,'escalated_cc','(Eskaliert)','Ticket Eskaliert','Hallo,\r\n\r\nGerne teilen wir Ihnen mit, dass das Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") automatisch eskaliert wurde.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: {{ ticket.get_assigned_to }}\r\nOnline ansehen: {{ ticket.staff_url }} (Login erforderlich)\r\n\r\nDie ursprüngliche Ticketbeschreibung war:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Gerne teilen wir Ihnen mit, dass das Ticket <i>{{ ticket.ticket }}</i> (\'{{ ticket.title }}\') automatisch eskaliert wurde.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','de'),(39,'escalated_owner','(Eskaliert)','Ein an Sie zugewiesenes Ticket wurde eskaliert','Hallo,\r\n\r\nEin an Sie zugewiesenes Ticket wurde automatisch eskaliert da es länger offen war als erwartet.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: {{ ticket.get_assigned_to }}\r\nOnline ansehen: {{ ticket.staff_url }} (Login erforderlich)\r\n\r\nDie ursprüngliche Ticketbeschreibung war:\r\n\r\n{{ ticket.description }}\r\n\r\nBitte prüfen Sie dieses Ticket und versuchen Sie so bald wie möglich eine Lösung zu finden.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ein an Sie zugewiesenes Ticket wurde automatisch eskaliert da es länger offen war als erwartet.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Bitte prüfen Sie dieses Ticket und versuchen Sie so bald wie möglich eine Lösung zu finden.</p>','de'),(40,'escalated_submitter','(Eskaliert)','Ihr Ticket wurde eskaliert','Hallo,\r\n\r\nSie haben kürzlich das Ticket \"{{ ticket.title }}\" bei uns eröffnet. Hiermit möchten wir Ihnen mitteilen, dass dieses Ticket automatisch eskaliert wurde, da es länger offen war als erwartet.\r\n\r\nWir werden Ihr Ticket in Kürze prüfen und so bald wie möglich eine Lösung finden.\r\n\r\nUnter folgendem Link können das Ticket online ansehen: {{ ticket.ticket_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 11pt;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Sie haben kürzlich das Ticket <i>{{ ticket.title }}</i> bei uns eröffnet. Hiermit möchten wir Ihnen mitteilen, dass dieses Ticket automatisch eskaliert wurde, da es länger offen war als erwartet.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Wir werden Ihr Ticket in Kürze prüfen und so bald wie möglich eine Lösung finden.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Unter folgendem Link können das Ticket online ansehen: <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','de'),(41,'newticket_cc','(Eröffnet)','Neues Ticket eröffnet','Hallo,\r\n\r\nGerne teilen wir Ihnen mit, dass ein neues Ticket eröffnet wurde.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nOnline ansehen: {{ ticket.staff_url }} (Login erforderlich)\r\n\r\nBeschreibung:\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Gerne teilen wir Ihnen mit, dass ein neues Ticket eröffnet wurde.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Beschreibung:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','de'),(42,'newticket_submitter','(Eröffnet)','Ihr Ticket wurde eröffnet','Hallo,\r\n\r\nGerne teilen wir Ihnen mit, dass wir Ihre Helpdesk-Anforderung mit dem Betreff \"{{ ticket.title }}\" erhalten haben. \r\n\r\nAn dieser Stelle sind keine weiteren Eingaben von Ihnen nötig. Ihrem Ticket wurde die ID {{ ticket.ticket }} zugewiesen und es wird in Kürze bearbeitet werden.\r\n\r\nWenn Sie uns weitere Details mitteilen möchten oder wenn Sie Fragen zu diesem Ticket haben, können Sie uns gerne eine E-Mail senden mit der Ticket ID \'{{ ticket.ticket }}\' im Betreff. Die einfachste Möglichkeit dazu ist, direkt auf diese E-Mail zu \"antworten\".\r\n\r\nWenn Sie das Ticket online ansehen möchten, um weitere Informationen hinzuzufügen, Dateien anzuhängen oder Aktualisierungen anzusehen, besuchen Sie bitte folgenden Link: {{ ticket.ticket_url }}.\r\n\r\nWir werden Ihr Ticket prüfen und so bald wie möglich eine Lösung erarbeiten. Weitere Aktualisierungen und die Lösung werden wir an diese E-Mail Adresse senden.\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Gerne teilen wir Ihnen mit, dass wir Ihre Helpdesk-Anforderung mit dem Betreff <i>{{ ticket.title }}</i> erhalten haben.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">An dieser Stelle sind keine weiteren Eingaben von Ihnen nötig. Ihrem Ticket wurde die ID <b>{{ ticket.ticket }}</b> zugewiesen und es wird in Kürze bearbeitet werden.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Wenn Sie uns weitere Details mitteilen möchten oder wenn Sie Fragen zu diesem Ticket haben, können Sie uns gerne eine E-Mail senden mit der Ticket ID <b>{{ ticket.ticket }}</b> im Betreff. Die einfachste Möglichkeit dazu ist, direkt auf diese E-Mail zu \"antworten\".</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Wenn Sie das Ticket online ansehen möchten, um weitere Informationen hinzuzufügen, Dateien anzuhängen oder Aktualisierungen anzusehen, besuchen Sie bitte folgenden Link: <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Wir werden Ihr Ticket prüfen und so bald wie möglich eine Lösung erarbeiten. Weitere Aktualisierungen und die Lösung werden wir an diese E-Mail Adresse senden.</p>','de'),(43,'resolved_cc','(Gelöst)','Ticket gelöst','Hallo,\r\n\r\nDas folgende Ticket wurde gelöst:\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: {{ ticket.get_assigned_to }}\r\nOnline ansehen: {{ ticket.staff_url }} (Login erforderlich)\r\n\r\nDie ursprüngliche Ticketbeschreibung war:\r\n\r\n{{ ticket.description }}\r\n\r\nDie vorgeschlagene Lösung ist:\r\n\r\n{{ ticket.resolution }}\r\n\r\nDiese Lösung wurde an den Ersteller gesendet, der die Lösung überprüfen muss, bevor dieses Ticket geschlossen werden kann.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Das folgende Ticket wurde gelöst:</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die vergeschlagene Lösung ist:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Diese Lösung wurde an den Ersteller gesendet, der die Lösung überprüfen muss, bevor dieses Ticket geschlossen werden kann.</p>','de'),(44,'resolved_owner','(Gelöst)','Ticket gelöst','Hallo,\r\n\r\nEin Ihnen zugeordnetes Ticket wurde gelöst.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: {{ ticket.get_assigned_to }}\r\nOnline ansehen: {{ ticket.staff_url }} (Login erforderlich)\r\n\r\nDie ursprüngliche Ticketbeschreibung war:\r\n\r\n{{ ticket.description }}\r\n\r\nDie vorgeschlagene Lösung ist:\r\n\r\n{{ ticket.resolution }}\r\n\r\nDiese Lösung wurde an den Ersteller gesendet, der die Lösung überprüfen muss, bevor dieses Ticket geschlossen werden kann.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ein Ihnen zugeordnetes Ticket wurde gelöst.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die vergeschlagene Lösung ist:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Diese Lösung wurde an den Ersteller gesendet, der die Lösung überprüfen muss, bevor dieses Ticket geschlossen werden kann.</p>','de'),(45,'resolved_submitter','(Gelöst)','Ihr Ticket wurde gelöst','Hallo,\r\n\r\nSie haben kürzlich das Ticket \"{{ ticket.title }}\" bei uns eröffnet. Hiermit möchten wir Ihnen mitteilen, dass dafür eine Lösung gefunden wurde.\r\n\r\nFür das Ticket {{ ticket.ticket }} wurde folgende Lösung vorgeschlagen:\r\n\r\n{{ resolution }}\r\n\r\nWir möchten Sie bitten zu bestätigen, dass diese Lösung Ihren Anforderungen entspricht, damit wir dieses Ticket schließen können. Wenn Sie weitere Fragen haben, oder der Meinung sind, dass diese Lösung nicht ausreichend ist, dann antworten Sie bitte auf diese E-Mail und lassen den Betreff unverändert.\r\n\r\nUnter folgendem Link können Sie das Ticket online ansehen: {{ ticket.ticket_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Sie haben kürzlich das Ticket <i>{{ ticket.title }}</i> bei uns eröffnet. Hiermit möchten wir Ihnen mitteilen, dass dafür eine Lösung gefunden wurde.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Für das Ticket <b>{{ ticket.ticket }}</b> wurde folgende Lösung vorgeschlagen:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Wir möchten Sie bitten zu bestätigen, dass diese Lösung Ihren Anforderungen entspricht, damit wir dieses Ticket schließen können. Wenn Sie weitere Fragen haben, oder der Meinung sind, dass diese Lösung nicht ausreichend ist, dann antworten Sie bitte auf diese E-Mail und lassen den Betreff unverändert.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Unter folgendem Link können Sie das Ticket online ansehen: <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','de'),(46,'updated_cc','(Aktualisiert)','Ticket aktualisiert','Hallo,\r\n\r\nGerne teilen wir Ihnen mit, dass das Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") für {{ ticket.submitter_email }} aktualisiert wurde.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: {{ ticket.get_assigned_to }}\r\nOnline ansehen: {{ ticket.staff_url }} (Login erforderlich)\r\n\r\nUrsprüngliche Ticketbeschreibung:\r\n\r\n{{ ticket.description }}\r\n\r\nFolgender Kommentar wurde hinzugefügt:\r\n\r\n{{ comment }}\r\n\r\nDiese Information wurde {% if private %}nicht {% endif %} an den Ersteller gesendet.\r\n\r\nUnter folgendem Link können Sie das Ticket online ansehen: {{ ticket.staff_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Gerne teilen wir Ihnen mit, dass das Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") für {{ ticket.submitter_email }} aktualisiert wurde.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Folgender Kommentar wurde hinzugefügt:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Diese Information wurde {% if private %}nicht {% endif %} an den Ersteller gesendet.</p>','de'),(47,'updated_owner','(Aktualisiert)','Ticket Aktualisiert','Hallo,\r\n\r\nGerne teilen wir Ihnen mit, dass das Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") für {{ ticket.submitter_email }}, das Ihnen zugewiesen ist, aktualisiert wurde.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nTicketsammlung: {{ queue.title }}\r\nTitel: {{ ticket.title }}\r\nEröffnet: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}\r\nErsteller: {{ ticket.submitter_email|default:\"Unbekannt\" }}\r\nPriorität: {{ ticket.get_priority_display }}\r\nStatus: {{ ticket.get_status }}\r\nZugewiesen an: {{ ticket.get_assigned_to }}\r\nOnline ansehen: {{ ticket.staff_url }} (Login erforderlich)\r\n\r\nUrsprüngliche Ticketbeschreibung:\r\n\r\n{{ ticket.description }}\r\n\r\nFolgender Kommentar wurde hinzugefügt:\r\n\r\n{{ comment }}\r\n\r\nDiese Information wurde {% if private %}nicht {% endif %} an den Ersteller gesendet.\r\n\r\nUnter folgendem Link können Sie das Ticket online ansehen: {{ ticket.staff_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Gerne teilen wir Ihnen mit, dass das Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") für {{ ticket.submitter_email }}, das Ihnen zugewiesen ist, aktualisiert wurde.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Ticketsammlung</b>: {{ queue.title }}<br>\r\n<b>Titel</b>: {{ ticket.title }}<br>\r\n<b>Eröffnet</b>: {{ ticket.created|date:\"l, j. N Y, \\u\\m H:i\" }}<br>\r\n<b>Ersteller</b>: {{ ticket.submitter_email|default:\"Unbekannt\" }}<br>\r\n<b>Priorität</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Status</b>: {{ ticket.get_status }}<br>\r\n<b>Zugewiesen an</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Online ansehen</a></b> um dieses Ticket zu aktualisieren (Login erforderlich)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Die ursprüngliche Ticketbeschreibung war:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Folgender Kommentar wurde hinzugefügt:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Diese Information wurde {% if private %}nicht {% endif %} an den Ersteller gesendet.</p>','de'),(48,'updated_submitter','(Aktualisiert)','Ihr Ticket wurde aktualisiert','Hallo,\r\n\r\nSie haben kürzlich das Ticket \"{{ ticket.title }}\" bei uns eröffnet. Hiermit möchten wir Ihnen eine Aktualisierung mitteilen.\r\n\r\nFolgender Kommentar wurde zum Ticket {{ ticket.ticket }} hinzugefügt:\r\n\r\n{{ comment }}\r\n\r\nWenn Sie uns weitere Informationen mitteilen möchten, antworten Sie bitte auf diese E-Mail und lassen den Betreff unverändert. Oder Sie können das Ticket online ansehen und aktualisieren: {{ ticket.ticket_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hallo,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Sie haben kürzlich das Ticket <i>{{ ticket.title }}</i> bei uns eröffnet. Hiermit möchten wir Ihnen eine Aktualisierung mitteilen.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Folgender Kommentar wurde zum Ticket <b>{{ ticket.ticket }}</b> hinzugefügt:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Wenn Sie uns weitere Informationen mitteilen möchten, antworten Sie bitte auf diese E-Mail und lassen den Betreff unverändert. Oder Sie können das Ticket online ansehen und aktualisieren: <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','de'),(49,'assigned_cc','(Assigné)','Ticket Assigné','Bonjour,\r\n\r\nCe courriel indicatif permet de vous prévenir que le ticket  {{ ticket.ticket }} (\"{{ ticket.title }}\") par {{ ticket.submitter_email }} {% if ticket.assigned_to %} a été assigné à {{ ticket.assigned_to }}{% else %} n\'est plus assigné à personne{% endif %}.\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nLa description originelle était :\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ce courriel indicatif permet de vous prévenir que le ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) par {{ ticket.submitter_email }}  {% if ticket.assigned_to %}a été assigné à {{ ticket.assigned_to }}{% else %} n\'est plus assigné à personne{% endif %}.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','fr'),(50,'assigned_owner','(Pour vous)','Le ticket vous est assigné','Bonjour,\r\n\r\nCe courriel indicatif permet de vous prévenir que le ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") pour {{ ticket.submitter_email }} vous a été assigné.\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nLa description originelle était :\r\n\r\n{{ ticket.description }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ce courriel indicatif permet de vous prévenir que le ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) pour {{ ticket.submitter_email }} <b>vous</b> a été assigné.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','fr'),(51,'closed_cc','(Fermé)','Ticket Fermé','Bonjour,\r\n\r\nLe ticket {{ ticket.title }} (\"{{ ticket.title }}\"){% if ticket.assigned_to %}, assigné à {{ ticket.assigned_to }}{% endif %} a été fermé.\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nLa description originelle était :\r\n\r\n{{ ticket.description }}\r\n\r\nLa motivation de résolution est:\r\n\r\n{{ resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Le ticket <i>{{ ticket.title }}</i> (\'{{ ticket.title }}\'){% if ticket.assigned_to %}, assigné à {{ ticket.get_assigned_to }}{% endif %} a été fermé.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La motivation de résolution est:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>','fr'),(52,'closed_owner','(Fermé - à vous)','Ticket Fermé','Bonjour,\r\n\r\nLe ticket suivant qui vous est actuellement assigné a été fermé.\r\n\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }} (authentification obligatoire)\r\n\r\nLa description originelle était :\r\n\r\n{{ ticket.description }}\r\n\r\nLa motivation de résolution est:\r\n\r\n{{ resolution }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\nLe ticket suivant qui vous est actuellement assigné a été fermé.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La motivation de résolution est:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n','fr'),(53,'closed_submitter','(Fermé)','Ticket Fermé','Bonjour,\r\n\r\nVous avez récemment ouvert chez nous un ticket dont le sujet est \"{{ ticket.title }}\". Ce courriel vous confirme que ce ticket a été fermé.\r\n\r\nSi vous pensez que nous devons encore travailler sur ce problème, faites le nous savoir en répondant à ce courriel en conservant le sujet tel-quel.\r\n\r\nVous pouvez visualiser ce ticket en ligne, en vous rendant à l\'adresse {{ ticket.ticket_url }}.\r\n\r\nLa résolution a été motivée ainsi :\r\n\r\n{{ ticket.resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Vous avez récemment ouvert chez nous un ticket dont le sujet est <i>{{ ticket.title }}</i>. Ce courriel vous confirme que ce ticket a été fermé.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;>\"La résolution a été motivée ainsi&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Vous pouvez visualiser ce ticket en ligne, en vous rendant à l\'adresse <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Si vous pensez que nous devons encore travailler sur ce problème, faites le nous savoir en répondant à ce courriel en conservant le sujet tel-quel..</p>','fr'),(54,'escalated_cc','(Priorité augmentée)','Priorité du ticket augmentée','Bonjour,\r\n\r\nCe courriel indicatif permet de vous prévenir que le ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") a vu sa priorité augmenté de manière automatique.\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nLa description originelle était :\r\n\r\n{{ ticket.description }}\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ce courriel indicatif permet de vous prévenir que le ticket <i>{{ ticket.ticket }}</i> (\'{{ ticket.title }}\') a vu sa priorité augmenté de manière automatique.</p>\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','fr'),(55,'escalated_submitter','(Priorité augmentée)','Votre ticket a vu sa priorité augmentée','Bonjour,\r\n\r\n\r\nVous avez récemment ouvert chez nous un ticket dont le sujet est \"{{ ticket.title }}\". Ce courriel vous informe que ce ticket  a vu sa priorité augmenté de manière automatique,  vu son délai de résolution plus long que prévu.\r\n\r\nNous allons reprendre rapidement ce ticket afin d\'essayer de le résoudre le plus vite possible.\r\n\r\nVous pouvez visualiser ce ticket en ligne, en vous rendant à l\'adresse {{ ticket.ticket_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 11pt;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Vous avez récemment ouvert chez nous un ticket dont le sujet est <i>{{ ticket.title }}</i> . Ce courriel vous informe que ce ticket  a vu sa priorité augmenté de manière automatique,  vu son délai de résolution plus long que prévu.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Nous allons reprendre rapidement ce ticket afin d\'essayer de le résoudre le plus vite possible.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Vous pouvez visualiser ce ticket en ligne, en vous rendant à l\'adresse <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','fr'),(56,'escalated_owner','(Priorité augmentée - à vous)','Priorité de votre ticket augmentée','Bonjour,\r\n\r\nUn ticket qui vous est assigné a vu sa priorité augmenté vu son délai de résolution plus long que prévu.\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nLa description originelle était :\r\n\r\n{{ ticket.description }}\r\n\r\nMerci de reprendre ce ticket afin d\'essayer de le résoudre le plus vite possible.\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Un ticket qui vous est assigné a vu sa priorité augmenté vu son délai de résolution plus long que prévu.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Merci de reprendre ce ticket afin d\'essayer de le résoudre le plus vite possible..</p>','fr'),(57,'newticket_cc','(Ouvert)','Nouveau ticket ouvert','Bonjour,\r\n\r\nCe courriel indicatif permet de vous prévenir qu\'un nouveau ticket a été ouvert.\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nDescription :\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ce courriel indicatif permet de vous prévenir qu\'un nouveau ticket a été ouvert.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Description&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','fr'),(58,'newticket_submitter','(Ouvert)','Votre ticket est désormais ouvert','Bonjour,\r\n\r\nCe courriel permet de vous informer que nous avons reçu votre demande de support dont le sujet est \"{{ ticket.title }}\".\r\n\r\nVous n\'avez rien de plus à faire pour le moment. Votre ticket porte l\'identifiant  {{ ticket.ticket }} et sera traité rapidement.\r\n\r\nSi vous voulez nous donner plus de détails ou si vous avez une question concernant ce ticket, merci d\'inclure la référence \'{{ ticket.ticket }}\'  dans le sujet du message. Le plus simple étant d\'utiliser la fonction \'répondre\' de votre logiciel de messagerie.\r\n\r\nVous pouvez visualiser ce ticket en ligne et y ajouter des informations ou des pièces jointes ainsi que voir les dernières mies à jour en vous rendant à l\'adresse {{ ticket.ticket_url }}.\r\n\r\nNous allons traiter votre demande afin, si possible, de la résoudre au plus vite. Vous recevrez des mise à jour ou la réponse au ticket à cette adresse mail.','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ce courriel permet de vous informer que nous avons reçu votre demande de support dont le sujet est <i>{{ ticket.title }}</i>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;>\"Vous n\'avez rien de plus à faire pour le moment. Votre ticket porte l\'identifiant <b>{{ ticket.ticket }}</b> et sera traité rapidement.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Si vous voulez nous donner plus de détails ou si vous avez une question concernant ce ticket, merci d\'inclure la référence <b>{{ ticket.ticket }}</b> dans le sujet du message. Le plus simple étant d\'utiliser la fonction \'répondre\' de votre logiciel de messagerie.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Vous pouvez visualiser ce ticket en ligne et y ajouter des informations ou des pièces jointes ainsi que voir les dernières mies à jour en vous rendant à l\'adresse <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Nous allons traiter votre demande afin, si possible, de la résoudre au plus vite. Vous recevrez des mise à jour ou la réponse au ticket à cette adresse mail.</p>','fr'),(59,'resolved_cc','(Résolu)','Ticket résolu','Bonjour,\r\n\r\nLe ticket suivant a été résolu.\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nLa description originelle était :\r\n\r\n{{ ticket.description }}\r\n\r\nLa motivation de résolution est:\r\n\r\n{{ resolution }}\r\n\r\nCette information a été envoyé au créateur de ce ticket, qui la confirmera avant que vous puissiez fermer ce ticket.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Le ticket suivant a été résolu.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La motivation de résolution est:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\nCette information a été envoyé au créateur de ce ticket, qui la confirmera avant que vous puissiez fermer ce ticket.</p>','fr'),(60,'resolved_owner','(Résolu - à vous)','Ticket résolu','Bonjour,\r\n\r\nUn ticket qui vous est assigné a été résolu.\r\n\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nLa description originelle était :\r\n\r\n{{ ticket.description }}\r\n\r\nLa motivation de résolution est:\r\n\r\n{{ resolution }}\r\n\r\nCette information a été envoyé au créateur de ce ticket, qui la confirmera avant que vous puissiez fermer ce ticket.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Un ticket qui vous est assigné a été résolu.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La motivation de résolution est:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\nCette information a été envoyé au créateur de ce ticket, qui la confirmera avant que vous puissiez fermer ce ticket.</p>','fr'),(61,'resolved_submitter','(Résolu)','Votre ticket a été résolu','Bonjour,\r\n\r\nVous avez récemment ouvert chez nous un ticket dont le sujet est \"{{ ticket.title }}\" . Ce message vous informe d\'une résolution de la demande.\r\n\r\nLa solution suivante a été donnée au ticket {{ ticket.ticket }}:\r\n\r\n{{ resolution }}\r\n\r\nMerci de confirmer que cette solution vous convient afin que nous puissions clore le ticket. Si vous avez d\'autre demandes, où si vous pensez que cette solution n\'est pas adaptée, merci de répondre à ce mail en conservant le sujet tel-quel.\r\n\r\nVous pouvez visualiser ce ticket en ligne, en vous rendant à l\'adresse {{ ticket.ticket_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Vous avez récemment ouvert chez nous un ticket dont le sujet est <i>{{ ticket.title }}</i>. Ce message vous informe d\'une résolution de la demande.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La solution suivante a été donnée au ticket <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Merci de confirmer que cette solution vous convient afin que nous puissions clore le ticket. Si vous avez d\'autre demandes, où si vous pensez que cette solution n\'est pas adaptée, merci de répondre à ce mail en conservant le sujet tel-quel.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Vous pouvez visualiser ce ticket en ligne, en vous rendant à l\'adresse <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','fr'),(62,'updated_cc','(Mis à jour)','Ticket mis à jour','Bonjour,\r\n\r\nCe courriel indicatif permet de vous prévenir que le ticket  {{ ticket.ticket }} (\"{{ ticket.title }}\") par {{ ticket.submitter_email }} a été mis à jour.\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nDescription originelle :\r\n\r\n{{ ticket.description }}\r\n\r\nLe commentaire suivant a été ajouté :\r\n\r\n{{ comment }}\r\n\r\nCette information {% if private %} n\' a pas {% else %} a {% endif %} été envoyé par mail à l\'émetteur.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ce courriel indicatif permet de vous prévenir que le ticket  {{ ticket.ticket }} (\"{{ ticket.title }}\") par {{ ticket.submitter_email }}  a été mis à jour.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Le commentaire suivant a été ajouté :</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Cette information {% if private %} n\' a pas {% else %} a {% endif %} été envoyé par mail à l\'émetteur.</p>','fr'),(63,'updated_owner','(Mis à jour - à vous)','Ticket mis à jour','Hello,\r\n\r\nCe courriel indicatif permet de vous prévenir que le ticket  {{ ticket.ticket }} (\"{{ ticket.title }}\") par {{ ticket.submitter_email }}, qui vous est assigné, a été mis à jour.\r\n\r\nIdentifiant : {{ ticket.ticket }}\r\nFile d\'attente : {{ queue.title }}\r\nTitre : {{ ticket.title }}\r\nOuvert le : {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nSoumis par : {{ ticket.submitter_email|default:\"Unknown\" }}\r\nPriorité : {{ ticket.get_priority_display }}\r\nStatut : {{ ticket.get_status }}\r\nAssigné à : {{ ticket.get_assigned_to }}\r\nAdresse : {{ ticket.staff_url }}\r\n\r\nDescription originelle :\r\n\r\n{{ ticket.description }}\r\n\r\nLe commentaire suivant a été ajouté :\r\n\r\n{{ comment }}\r\n\r\nCette information {% if private %} n\' a pas {% else %} a {% endif %} été envoyé par mail à l\'émetteur.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ce courriel indicatif permet de vous prévenir que le ticket  {{ ticket.ticket }} (\"{{ ticket.title }}\") par {{ ticket.submitter_email }}, qui vous est assigné, a été mis à jour.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>File d\'attente</b>&nbsp;: {{ ticket.ticket }}<br>\r\n<b>Queue</b>&nbsp;: {{ queue.title }}<br>\r\n<b>Titre</b>&nbsp;: {{ ticket.title }}<br>\r\n<b>Ouvert le</b>&nbsp;: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Soumis par</b>&nbsp;: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>Priorité</b>&nbsp;: {{ ticket.get_priority_display }}<br>\r\n<b>Statut</b>&nbsp;: {{ ticket.get_status }}<br>\r\n<b>Assigné à</b>&nbsp;: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Voir le ticket en ligne</a></b> pour le mettre à jour (après authentification)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Pour mémoire, la description originelle était&nbsp;:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Le commentaire suivant a été ajouté :</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Cette information {% if private %} n\' a pas {% else %} a {% endif %} été envoyé par mail à l\'émetteur.</p>','fr'),(64,'updated_submitter','(Mis à jour)','Votre ticket a été mis à jour','Bonjour,\r\n\r\nVous avez récemment ouvert chez nous un ticket dont le sujet est \"{{ ticket.title }}\". Ce message vous informe d\'une mise à jour du ticket.\r\n\r\nLe commentaire suivant a été ajouté au ticket {{ ticket.ticket }} :\r\n\r\n{{ comment }}\r\n\r\nSi vous voulez nous fournir d\'autres informations, merci de répondre à ce mail en conservant le sujet tel-quel. Vous pouvez également voir et mettre à jour ce ticket en ligne à l\'adresse {{ ticket.ticket_url }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Bonjour,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Vous avez récemment ouvert chez nous un ticket dont le sujet est <i>{{ ticket.title }}</i> . Ce message vous informe d\'une mise à jour du ticket.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Le commentaire suivant a été ajouté au ticket <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;>\"Si vous voulez nous fournir d\'autres informations, merci de répondre à ce mail en conservant le sujet tel-quel. Vous pouvez également voir et mettre à jour ce ticket en ligne à l\'adresse <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','fr'),(65,'assigned_cc','(Assegnato)','Ticket Assegnato','Salve,\r\n\r\nTi è stata inviata questa email per informarti che il ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") per {{ ticket.submitter_email }} {% if ticket.assigned_to %}è stato assegnato a {{ ticket.assigned_to }}{% else %}non è più assegnato{% endif %}.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nLa descrizione del ticket era:\r\n\r\n{{ ticket.description }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ti è stata inviata questa email per informarti che il ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) per {{ ticket.submitter_email }} {% if ticket.assigned_to %}è stato assegnato a {{ ticket.assigned_to }}{% else %}non è più assegnato{% endif %}.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Per riferimento, la descrizione del ticket era:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','it'),(66,'assigned_owner','(Assegnato a Te)','Ticket Assegnato a Te','Salve,\r\n\r\nTi è stata inviata questa email per informarti che ti è stato assegnato il ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") per {{ ticket.submitter_email }}.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nLa descrizione del ticket è:\r\n\r\n{{ ticket.description }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ti è stata inviata questa email per informarti che ti è stato assegnato il ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) per {{ ticket.submitter_email }}.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descrizione del ticket è:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','it'),(67,'closed_cc','(Closed)','Ticket Chiuso','Salve,\r\n\r\nIl ticket {{ ticket.title }} (\"{{ ticket.title }}\"){% if ticket.assigned_to %}, assegnato a {{ ticket.assigned_to }}{% endif %} è stato chiuso.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nLa descrizione del ticket è:\r\n\r\n{{ ticket.description }}\r\n\r\nLa soluzione fornita è:\r\n\r\n{{ resolution }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Il ticket <i>{{ ticket.title }}</i> (\'{{ ticket.title }}\'){% if ticket.assigned_to %}, assegnato a {{ ticket.get_assigned_to }}{% endif %} è stato chiuso.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descrizione del ticket è:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La soluzione fornita è:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Se vuoi vedere questo ticket online, puoi visitare l\'indirizzo <a href=\'{{ ticket.staff_url }}\'>{{ ticket.staff_url }}</a>.</p>','it'),(68,'closed_owner','(Chiuso)','Ticket Chiuso','Salve,\r\n\r\nIl seguente ticket, attualmente assegnato a te, è stato chiuso.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nSe vuoi vedere il ticket online, puoi visitare l\'indirizzo {{ ticket.staff_url }}.','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Il seguente ticket, attualmente assegnato a te, è stato chiuso.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descrizione del ticket è:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La soluzione fornita è:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>','it'),(69,'closed_submitter','(Closed)','Ticket Chiuso','Salve,\r\n\r\nHai recentemente inserito un ticket dal titolo \"{{ ticket.title }}\". Questa email ti è inviata come conferma della chiusura del ticket.\r\n\r\nSe ritieni che questo ticket richieda ulteriori attività, per cortesia faccelo sapere rispondendo a questa email mantenendone invariato l\'oggetto.\r\n\r\nSe vuoi vedere il ticket online, puoi visitare l\'indirizzo {{ ticket.ticket_url }}.\r\n\r\nLa soluzione proposta è:\r\n\r\n{{ ticket.resolution }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Hai recentemente inserito un ticket dal titolo <i>{{ ticket.title }}</i>. Questa email ti è inviata come conferma della chiusura del ticket.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La soluzione proposta è:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Se vuoi vedere il ticket online, puoi visitare l\'indirizzo <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>. Se ritieni che questo ticket richieda ulteriori attività, per cortesia faccelo sapere rispondendo a questa email mantenendone invariato l\'oggetto.\r\n</p>','it'),(70,'escalated_cc','(Priorità)','Priorità Aumentata','Salve,\r\n\r\nTi è stata inviata questa email per informarti che la priorità del ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") è stata aumentata automaticamente.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nLa descrizione originale del ticket era:\r\n\r\n{{ ticket.description }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ti è stata inviata questa email per informarti che la priorità del ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") è stata aumentata automaticamente.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Per riferimento, la descrizione originale del ticket era:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','it'),(71,'escalated_owner','(Priorità)','La Priorità di un Ticket Assegnato a Te è Stata Aumentata','Salve,\r\n\r\nLa priorità di un ticket a te assegnato è stata automaticamente aumentata in quanto questo è rimasto aperto più del previsto.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nLa descrizione originale del ticket era:\r\n\r\n{{ ticket.description }}\r\n\r\nRiesamina questo ticket e cerca di fornire una soluzione al più presto.','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La priorità di un ticket a te assegnato è stata automaticamente aumentata in quanto questo è rimasto aperto più del previsto.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Per riferimento, la descrizione originale del ticket era:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','it'),(72,'escalated_submitter','(Priorità)','La Priorità del Tuo Ticket è Stata Aumentata','Salve,\r\n\r\nHai recentemente inserito un ticket dal titolo \"{{ ticket.title }}\". Questa email ti è inviata per informarti che la priorità del ticket è stata automaticamente aumentata in quanto questo è rimasto aperto più a lungo del previsto.\r\n\r\nRiesamineremo a breve il ticket e cercheremo di fornire una soluzione quanto prima.\r\n\r\nSe vuoi visualizzare il ticket online, puoi visitare l\'indirizzo {{ ticket.ticket_url }}.','<p style=\"font-family: sans-serif; font-size: 11pt;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Hai recentemente inserito un ticket dal titolo <i>{{ ticket.title }}</i>. Questa email ti è inviata per informarti che la priorità del ticket è stata automaticamente aumentata in quanto questo è rimasto aperto più a lungo del previsto.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Riesamineremo a breve il ticket e cercheremo di fornire una soluzione quanto prima.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Se vuoi visualizzare il ticket online, puoi visitare l\'indirizzo <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','it'),(73,'newticket_cc','(Aperto)','Nuovo Ticket Aperto','Salve,\r\n\r\nQuesta email ti è stata inviata per informarti che è stato aperto un nuovo ticket.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nDescrizione:\r\n{{ ticket.description }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Questa email ti è stata inviata per informarti che è stato aperto un nuovo ticket.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Descrizione:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','it'),(74,'newticket_submitter','(Aperto)','Il Tuo Ticket è Stato Aperto','Salve,\r\n\r\nQuesta email ti è stata inviata per informarti che abbiamo ricevuto la tua richiesta di assistenza dal titolo \"{{ ticket.title }}\".\r\n\r\nNon è necessario fare altro al momento. Il tuo ticket è identificato dal codice {{ ticket.ticket }}, e verrà esaminato al più presto.\r\n\r\nSe vuoi aggiungere ulteriori dettagli o hai domande sul ticket, rispondi a questa email includendo l\'id \"{{ ticket.ticket }}\" del ticket nell\'oggetto. Il modo più semplice per farlo è premere il pulsante \"rispondi\" del tuo client di posta.\r\n\r\nSe vuoi vedere questo ticket online per aggiungere ulteriori informazioni, allegare file o vedere gli aggiornamenti, puoi visitare l\'indirizzo {{ ticket.ticket_url }}.\r\n\r\nAnalizzeremo la tua richiesta e cercheremo di risolverla quanto prima. Riceverai successivi aggiornamenti e la notifica di risoluzione a questo indirizzo email.','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Questa email ti è stata inviata per informarti che abbiamo ricevuto la tua richiesta di assistenza dal titolo <i>{{ ticket.title }}</i>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Non è necessario fare altro al momento. Il tuo ticket è identificato dal codice <b>{{ ticket.ticket }}</b> e verrà esaminato al più presto.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Se vuoi aggiungere ulteriori dettagli o hai domande sul ticket, rispondi a questa email includendo l\'id <b>{{ ticket.ticket}}</b> del ticket nell\'oggetto. Il modo più semplice per farlo è premere il pulsante \"rispondi\" del tuo client di posta.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Se vuoi vedere questo ticket online per aggiungere ulteriori informazioni, allegare file o vedere gli aggiornamenti, puoi visitare l\'indirizzo <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Analizzeremo la tua richiesta e cercheremo di risolverla quanto prima. Riceverai successivi aggiornamenti e la notifica di risoluzione a questo indirizzo email.</p>','it'),(75,'resolved_cc','(Risolto)','Ticket Risolto','Salve,\r\n\r\nIl seguente ticket è stato risolto:\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nLa descrizione del ticket è:\r\n\r\n{{ ticket.description }}\r\n\r\nLa risoluzione fornita è:\r\n\r\n{{ ticket.resolution }}\r\n\r\nLa risoluzione è stata inviata al proprietario del ticket, che dovrà verificarla prima che il ticket possa essere chiuso.','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Il seguente ticket è stato risolto:</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Per riferimento, la descrizione originale del ticket era:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La risoluzione aggiunta era:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La risoluzione è stata inviata al proprietario del ticket, che dovrà verificarla prima che il ticket possa essere chiuso.</p>','it'),(76,'resolved_owner','(Risolto)','Ticket Risolto','Salve,\r\n\r\nun ticket a te assegnato è stato risolto.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nLa descrizione del ticket è:\r\n\r\n{{ ticket.description }}\r\n\r\nLa risoluzione fornita è:\r\n\r\n{{ ticket.resolution }}\r\n\r\nLa risoluzione è stata inviata al proprietario del ticket, che dovrà verificarla prima che il ticket possa essere chiuso.','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Un ticket a te assegnato è stato risolto.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descrizione del ticket è:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La risoluzione fornita è:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La risoluzione è stata inviata al proprietario del ticket, che dovrà verificarla prima che il ticket possa essere chiuso.</p>','it'),(77,'resolved_submitter','(Risolto)','Il Tuo Ticket è Stato Risolto','Salve,\r\n\r\nHai recentemente inserito un ticket con titolo \"{{ ticket.title }}\". Questa email ti è stata inviata per informarti della risoluzione del ticket.\r\n\r\nLa seguente risoluzione è stata indicata per il ticket {{ ticket.ticket }}:\r\n\r\n{{ resolution }}\r\n\r\nPuoi per cortesia confermare che questa soluzione risolva i vostri problemi in modo tale da poter chiudere il ticket? Se hai ulteriori domande, o ritieni che la soluzione proposta non sia adeguata, rispondi a questa email mantenendo invariato l\'oggetto.\r\n\r\nSe vuoi vedere il ticket online, puoi visitare l\'indirizzo {{ ticket.ticket_url }}','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Hai recentemente inserito un ticket con titolo <i>{{ ticket.title }}</i>. Questa email ti è stata inviata per informarti della risoluzione del ticket.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La seguente risoluzione è stata indicata per il ticket <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Puoi per cortesia confermare che questa soluzione risolva i vostri problemi in modo tale da poter chiudere il ticket? Se hai ulteriori domande, o ritieni che la soluzione proposta non sia adeguata, rispondi a questa email mantenendo invariato l\'oggetto.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Se vuoi vedere il ticket online, puoi visitare l\'indirizzo <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','it'),(78,'updated_cc','(Aggiornato)','Ticket Aggiornato','Salve,\r\n\r\nQuesta email ti è stata inviata per informarti che il ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") per {{ ticket.submitter_email }} è stato aggiornato.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nDescrizione originale:\r\n\r\n{{ ticket.description }}\r\n\r\nIl seguente commento è stato aggiunto:\r\n\r\n{{ comment }}\r\n\r\nQuesta informazione{% if private %} non{% endif %} è stata inviata al proprietario del ticket.\r\n\r\nSe vuoi vedere il ticket online, puoi visitare l\'indirizzo {{ ticket.staff_url }}.','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Questa email ti è stata inviata per informarti che il ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") per {{ ticket.submitter_email }} è stato aggiornato.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Per riferimento, la descrizione originale era:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Il seguente commento è stato aggiunto:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Questa informazione{% if private %} non{% endif %} è stata inviata al proprietario del ticket.</p>','it'),(79,'updated_owner','(Updated)','Ticket Aggiornato','Salve,\r\n\r\nTi è stata inviata questa email per informarti che il ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") per {{ ticket.submitter_email }}, a te assegnato, è stato aggiornato.\r\n\r\nID Ticket: {{ ticket.ticket }}\r\nCoda: {{ queue.title }}\r\nTitolo: {{ ticket.title }}\r\nAperto: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nInserito da: {{ ticket.submitter_email|default:\"Sconosciuto\" }}\r\nPriorità: {{ ticket.get_priority_display }}\r\nStato: {{ ticket.get_status }}\r\nAssegnato a: {{ ticket.get_assigned_to }}\r\nVedi Online: {{ ticket.staff_url }} (richiede login)\r\n\r\nDescrizione originale:\r\n\r\n{{ ticket.description }}\r\n\r\nIl seguente commento è stato aggiunto:\r\n\r\n{{ comment }}\r\n\r\nQuesta informazione{% if private %} non{% endif %} è stata inviata al proprietario del ticket.\r\n\r\nSe vuoi vedere il ticket online, puoi visitare l\'indirizzo {{ ticket.staff_url }}.','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Ti è stata inviata questa email per informarti che il ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") per {{ ticket.submitter_email }}, a te assegnato, è stato aggiornato.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Coda</b>: {{ queue.title }}<br>\r\n<b>Titolo</b>: {{ ticket.title }}<br>\r\n<b>Aperto</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Inserito da</b>: {{ ticket.submitter_email|default:\"Sconosciuto\" }}<br>\r\n<b>Priorità</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Stato</b>: {{ ticket.get_status }}<br>\r\n<b>Assegnato a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Vedi Online</a></b> per aggiornare questo ticket (richiede login)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Per riferimento, la descrizione originale del ticket era:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Il seguente commento è stato aggiunto:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Questa informazione{% if private %} non{% endif %} è stata inviata al proprietario del ticket.</p>','it'),(80,'updated_submitter','(Aggiornato)','Il Tuo Ticket è Stato Aggiornato','Salve,\r\n\r\nHai recentemente inserito un ticket con titolo \"{{ ticket.title }}\". Questa email ti è stata inviata per informarti di un aggiornamento alla tua richiesta.\r\n\r\nIl seguente commento è stato aggiunto al ticket {{ ticket.ticket }}:\r\n\r\n{{ comment }}\r\n\r\nPer fornire informazioni aggiuntive, rispondi a questa email mantenendone l\'oggetto invariato. In alternativa, è possibile vedere ed aggiornare il ticket online visitando l\'indirizzo {{ ticket.ticket_url }}\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Salve,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Hai recentemente inserito un ticket con titolo <i>{{ ticket.title }}</i>. Questa email ti è stata inviata per informarti di un aggiornamento alla tua richiesta.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Il seguente commento è stato aggiunto al ticket <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Per fornire informazioni aggiuntive, rispondi a questa email mantenendone l\'oggetto invariato. In alternativa, è possibile vedere ed aggiornare il ticket online visitando l\'indirizzo <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','it'),(81,'assigned_cc','(Asignado)','Ticket asignado','Hola,\r\n\r\nEste e-mail es para informar que el Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") por {{ ticket.submitter_email }}{% if ticket.assigned_to %} ha sido asignado a {{ ticket.assigned_to }}{% else %} no ha sido asignado{% endif %}.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado a: {{ ticket.get_assigned_to }}\r\nVer online: {{ ticket.staff_url }}\r\n\r\nLa descripción original es:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Este e-mail es para informar que el Ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) por {{ ticket.submitter_email }} {% if ticket.assigned_to %} ha sido asignado a {{ ticket.assigned_to }}{% else %} no ha sido asignado{% endif %}.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','es'),(82,'assigned_owner','(Asignado a ud)','Le asignaron un Ticket','Hola,\r\n\r\nEste e-mail es para informar que el Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") por {{ ticket.submitter_email }} ha sido asignado a usted.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado: USTED\r\nVer online: {{ ticket.staff_url }}\r\n\r\nLa descripción original del ticket es:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Este e-mail es para informar que el Ticket <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>) por {{ ticket.submitter_email }} ha sido asignado a <b>usted</b>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: USTED<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar el Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','es'),(83,'closed_cc','(Cerrado)','Ticket cerrado','Hola,\r\n\r\nEl Ticket {{ ticket.title }} (\"{{ ticket.title }}\"){% if ticket.assigned_to %}, asignado a {{ ticket.assigned_to }}{% endif %} ha sido cerrado.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado a: {{ ticket.get_assigned_to }}\r\nVer online: {{ ticket.staff_url }} (login requerido)\r\n\r\nLa descripción original es:\r\n\r\n{{ ticket.description }}\r\n\r\nLa solución dada fue:\r\n\r\n{{ resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">El Ticket <i>{{ ticket.title }}</i> (\'{{ ticket.title }}\'){% if ticket.assigned_to %}, asignado a {{ ticket.get_assigned_to }}{% endif %} ha sido cerrado.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La solución dada fue:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Para ver este Ticket online, por favor visite <a href=\'{{ ticket.staff_url }}\'>{{ ticket.staff_url }}</a>.</p>','es'),(84,'closed_owner','(Cerrado)','Ticket cerrado','Hola,\r\n\r\nEl siguiente Ticket asignado a usted ha sido cerrado.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado a: {{ ticket.get_assigned_to }}\r\nVer online: {{ ticket.staff_url }} (login requerido)\r\n\r\nPara ver este Ticket online, por favor visite {{ ticket.staff_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">El siguiente Ticket asignado a usted ha sido cerrado.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La solución dada fue:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>','es'),(85,'closed_submitter','(cerrado)','Ticket cerrado','Hola,\r\n\r\nRecientemente usted envió el Ticket \"{{ ticket.title }}\". Este e-mail es para confirmar que el Ticket ha sido cerrado.\r\n\r\nSi cree que se requiere trabajo adicional, por favor déjanoslo saber respondiendo a este correo dejando el asunto intacto.\r\n\r\nPara ver este Ticket online, por favor visite {{ ticket.ticket_url }}.\r\n\r\nLa solución dada fue:\r\n\r\n{{ ticket.resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Recientemente usted envió el Ticket <i>{{ ticket.title }}</i>. Este e-mail es para confirmar que el Ticket ha sido cerrado.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La solución dada es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Para ver este Ticket online, por favor visite <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>. Si cree que se requiere trabajo adicional, por favor déjanoslo saber respondiendo a este correo dejando el asunto intacto.</p>','es'),(86,'escalated_cc','(Escalado)','Ticket escalado','Hola,\r\n\r\nEste e-mail es para informar que el Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") ha sido escalado automáticamente.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado a: {{ ticket.get_assigned_to }}\r\nVer online: {{ ticket.staff_url }} (login requerido)\r\n\r\nLa descripción original es:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Este e-mail es para informar que el Ticket <i>{{ ticket.ticket }}</i> (\'{{ ticket.title }}\') ha sido escalado automáticamente.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','es'),(87,'escalated_submitter','(Escalado)','Su Ticket ha sido escalado','Hola,\r\n\r\nRecientemente usted envió el Ticket \"{{ ticket.title }}\". Este e-mail es para informarle que su Ticket ha sido escalado ya que ha estado abierto por mas tiempo del esperado.\r\n\r\nSe revisará su Ticket para darle una solución tan pronto como sea posible.\r\n\r\nPara ver este Ticket online, por favor visite {{ ticket.ticket_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 11pt;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Recientemente usted envió el Ticket <i>{{ ticket.title }}</i>. Este e-mail es para informarle que su Ticket ha sido escalado ya que ha estado abierto por mas tiempo del esperado.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Se revisará su Ticket para darle una solución tan pronto como sea posible.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">Para ver este Ticket online, por favor visite <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','es'),(88,'escalated_owner','(Escalado)','El Ticket asignado a usted ha sido escalado','Hola,\r\n\r\nUn Ticket asignado a usted ha sido automaticamente escalado ya que ha estado abierto por mas tiempo del esperado.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado a: {{ ticket.get_assigned_to }}\r\nVer online: {{ ticket.staff_url }} (login requerido)\r\n\r\nLa descripción original es::\r\n\r\n{{ ticket.description }}\r\n\r\nPor favor revisar este Ticket e intentar dar una solución tan pronto como sea posible.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Un Ticket asignado a usted ha sido automaticamente escalado ya que ha estado abierto por mas tiempo del esperado.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','es'),(89,'newticket_cc','(Creado)','Nuevo Ticket creado','Hola,\r\n\r\nEste e-mail es para informar que un Ticket ha sido creado.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nVer online: {{ ticket.staff_url }} (login requerido)\r\n\r\nDescripción:\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Este e-mail es para informar que un Ticket ha sido creado.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Descripción:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','es'),(90,'newticket_submitter','(Creado)','Su Ticket ha sido creado','Hola,\r\n\r\nEste e-mail es para informar que recibimos su consulta \"{{ ticket.title }}\". \r\n\r\nUsted no debe realizar nada en este momento. Su Ticket está identificado con el número {{ ticket.ticket }} y será respondido prontamente.\r\n\r\nSi desea enviar detalles adicionales, o si tiene cualquier consulta con respecto a este Ticket por favor incluya el Ticket ID \'{{ ticket.ticket }}\' en el asunto. La manera mas fácil de hacerlo es presionando el botón de \"respuesta\" a este mensaje.\r\n\r\nPara ver este Ticket online y proveer información adicional, añadir archivos adjuntos o ver actualizaciones recientes, por favor visite {{ ticket.ticket_url }}.\r\n\r\nNosotros trabajaremos en su consulta y la resolveremos tan pronto como sea posible. Usted recibirá actualizaciones y la solución a su consulta a través de este e-mail.\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Este e-mail es para informar que recibimos su consulta <i>{{ ticket.title }}</i>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Usted no debe realizar nada en este momento. Su Ticket está identificado con el número <b>{{ ticket.ticket }}</b> y será respondido prontamente.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Si desea enviar detalles adicionales, o si tiene cualquier consulta con respecto a este Ticket por favor incluya el Ticket ID <b>{{ ticket.ticket }}</b> en el asunto. La manera mas fácil de hacerlo es presionando el botón de \"respuesta\" a este mensaje.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Para ver este Ticket online y proveer información adicional, añadir archivos adjuntos o ver actualizaciones recientes, por favor visite <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Nosotros trabajaremos en su consulta y la resolveremos tan pronto como sea posible. Usted recibirá actualizaciones y la solución a su consulta a través de este e-mail.</p>','es'),(91,'resolved_cc','(Resuelto)','Ticket resuelto','Hola,\r\n\r\nEl siguiente Ticket ha sido resuelto:\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado a: {{ ticket.get_assigned_to }}\r\nVer online: {{ ticket.staff_url }} (login requerido)\r\n\r\nLa descripción original es:\r\n\r\n{{ ticket.description }}\r\n\r\nLa solución dada fue:\r\n\r\n{{ ticket.resolution }}\r\n\r\nEsta solucion ha sido enviada al remitente, quien realizará la verificación antes de que pueda cerrar el Ticket.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">El siguiente Ticket ha sido resuelto.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La solución dada fue:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Esta solucion ha sido enviada al remitente, quien realizará la verificación antes de que pueda cerrar el Ticket.</p>','es'),(92,'resolved_owner','(Resuelto)','Ticket resuelto','Hola,\r\n\r\nUn ticket asignado a usted ha sido resuelto.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado a: {{ ticket.get_assigned_to }}\r\nVer online: {{ ticket.staff_url }} (login requerido)\r\n\r\nLa descripción original es:\r\n\r\n{{ ticket.description }}\r\n\r\nLa solución dada fue:\r\n\r\n{{ ticket.resolution }}\r\n\r\nEsta solución ha sido enviada al remitente, quien realizará la verificación antes de que pueda cerrar el Ticket.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Un ticket asignado a usted ha sido resuelto.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La solución dada fue:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Esta solucion ha sido enviada al remitente, quien realizará la verificación antes de que pueda cerrar el Ticket.</p>','es'),(93,'resolved_submitter','(Resuelto)','Su Ticket ha sido resuelto','Hola,\r\n\r\nRecientemente usted envió el Ticket \"{{ ticket.title }}\". Este e-mail es para informar que su Ticket ha sido resuelto.\r\n\r\nLa siguiente solución fue dada a su Ticket {{ ticket.ticket }}:\r\n\r\n{{ resolution }}\r\n\r\n¿Puede confirmar que esta solución cumple con lo que necesita para cerrar este Ticket? Si tiene otras consultas, o cree que esta solución no es la adecuada, por favor responda este mensaje manteniendo el asunto intacto.\r\n\r\nSi desea ver este Ticket online, por favor visite {{ ticket.ticket_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Recientemente usted envió el Ticket <i>{{ ticket.title }}</i>. Este e-mail es para informar que su Ticket ha sido resuelto.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La siguiente solución fue dada a su Ticket <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">¿Puede confirmar que esta solución cumple con lo que necesita para cerrar este Ticket? Si tiene otras consultas, o cree que esta solución no es la adecuada, por favor responda este mensaje manteniendo el asunto intacto.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Si desea ver este Ticket online, por favor visite <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','es'),(94,'updated_cc','(Actualizado)','Ticket actualizado','Hola,\r\n\r\nEste e-mail es para informar que el Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") por {{ ticket.submitter_email }} ha sido actualizado.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado a: {{ ticket.get_assigned_to }}\r\nVer online: {{ ticket.staff_url }} (login requerido)\r\n\r\nDescripción:\r\n\r\n{{ ticket.description }}\r\n\r\nSe agregó el siguiente comentario:\r\n\r\n{{ comment }}\r\n\r\nEsta información {% if private %}no {% endif %} fue enviada al remitente.\r\n\r\nSi desea ver este Ticket online, por favor visite {{ ticket.staff_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Este e-mail es para informar que el Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") por {{ ticket.submitter_email }} ha sido actualizado.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Se agregó el siguiente comentario:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Esta información {% if private %}no {% endif %} fue enviada al remitente.</p>','es'),(95,'updated_owner','(Actualizado)','Ticket actualizado','Hola,\r\n\r\nEste e-mail es para informar que el Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") por {{ ticket.submitter_email }}, que le fue asignado, ha sido actualizado.\r\n\r\nTicket ID: {{ ticket.ticket }}\r\nCola: {{ queue.title }}\r\nTítulo: {{ ticket.title }}\r\nCreado: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\nRemitente: {{ ticket.submitter_email|default:\"Desconocido\" }}\r\nPrioridad: {{ ticket.get_priority_display }}\r\nEstado: {{ ticket.get_status }}\r\nAsignado a: {{ ticket.get_assigned_to }}\r\nVer online: {{ ticket.staff_url }} (login requerido)\r\n\r\nDescripción original:\r\n\r\n{{ ticket.description }}\r\n\r\nSe agregó el siguiente comentario:\r\n\r\n{{ comment }}\r\n\r\nEsta información {% if private %}no {% endif %} fue enviada al remitente.\r\n\r\nSi desea ver este Ticket online, por favor visite {{ ticket.staff_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Este e-mail es para informar que el Ticket {{ ticket.ticket }} (\"{{ ticket.title }}\") por {{ ticket.submitter_email }}, que le fue asignado, ha sido actualizado.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>Ticket ID</b>: {{ ticket.ticket }}<br>\r\n<b>Cola</b>: {{ queue.title }}<br>\r\n<b>Título</b>: {{ ticket.title }}<br>\r\n<b>Creado</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>Remitente</b>: {{ ticket.submitter_email|default:\"Desconocido\" }}<br>\r\n<b>Prioridad</b>: {{ ticket.get_priority_display }}<br>\r\n<b>Estado</b>: {{ ticket.get_status }}<br>\r\n<b>Asignado a</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>Ver online</a></b> para actualizar este Ticket (login requerido)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">La descripción original es:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Se agregó el siguiente comentario:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">Esta información {% if private %}no {% endif %} fue enviada al remitente.</p>','es'),(96,'updated_submitter','(Actualizado)','Su Ticket ha sido actualizado','Hola,\r\n\r\nRecientemente usted envió el Ticket \"{{ ticket.title }}\". Este correo es para informar que su Ticket ha sido actualizado.\r\n\r\nSe agregó el siguiente comentario al Ticket {{ ticket.ticket }}:\r\n\r\n{{ comment }}\r\n\r\nSi necesita agregar información adicional por favor responda a este mensaje manteniendo el asunto intacto. Por otro lado, usted puede ver y actualizar la información de este Ticket visitando {{ ticket.ticket_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">Hola,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Recientemente usted envió el Ticket <i>{{ ticket.title }}</i>. Este correo es para informar que su Ticket ha sido actualizado.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Se agregó el siguiente comentario al Ticket <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Si necesita agregar información adicional por favor responda a este mensaje manteniendo el asunto intacto. Por otro lado, usted puede ver y actualizar la información de este Ticket visitando <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','es'),(97,'assigned_cc','(已分配)','工单已分配','您好,\r\n\r\n温馨提示, {{ ticket.submitter_email }}提交的工单 {{ ticket.ticket }} (\"{{ ticket.title }}\") 已经 {% if ticket.assigned_to %}分配给 {{ ticket.assigned_to }}{% else %}未分配{% endif %}.\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: {{ ticket.get_assigned_to }}\r\n在线查看: {{ ticket.staff_url }}\r\n\r\n原始描述为:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">温馨提示, {{ ticket.submitter_email }}的工单 <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>)  {% if ticket.assigned_to %}已经分配给 {{ ticket.assigned_to }}{% else %}还未分配{% endif %}.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','zh'),(98,'assigned_owner','(已分配给您)','工单已分配给您','您好,\r\n\r\n温馨提示, 工单 提交者{{ ticket.submitter_email }}的工单{{ ticket.ticket }} 已经 分配给 you.\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: YOU\r\n在线查看: {{ ticket.staff_url }}\r\n\r\n原始描述为:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">温馨提示, 提交者{{ ticket.submitter_email }}的工单 <a href=\"{{ ticket.staff_url }}\"><b>{{ ticket.ticket }}</b></a> (<em>{{ ticket.title }}</em>)  已经分配给 <b>you</b>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: YOU<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','zh'),(99,'closed_cc','(已关闭)','工单已关闭','您好,\r\n\r\n工单 {{ ticket.title }} (\"{{ ticket.title }}\"){% if ticket.assigned_to %}, 分配给 {{ ticket.assigned_to }}{% endif %} 已经 关闭\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: {{ ticket.get_assigned_to }}\r\n在线查看: {{ ticket.staff_url }} (需要登录)\r\n\r\n原始描述为:\r\n\r\n{{ ticket.description }}\r\n\r\n提供的解决方案为:\r\n\r\n{{ resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">工单 <i>{{ ticket.title }}</i> (\'{{ ticket.title }}\'){% if ticket.assigned_to %}, 分配给 {{ ticket.get_assigned_to }}{% endif %} 已经 关闭</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">提供的解决方案为:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">如果您想在线查看， 可以访问 <a href=\'{{ ticket.staff_url }}\'>{{ ticket.staff_url }}</a>.</p>','zh'),(100,'closed_owner','(已关闭)','工单已关闭','您好,\r\n\r\n以下分配给您的工单, 已经关闭\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: {{ ticket.get_assigned_to }}\r\n在线查看: {{ ticket.staff_url }} (需要登录)\r\n\r\n如果您想在线查看， 可以访问 {{ ticket.staff_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">以下分配给您的工单, 已经关闭</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">提供的解决方案为:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>','zh'),(101,'closed_submitter','(已关闭)','工单已关闭','您好,\r\n\r\n您最近记录了主题为\"{{ ticket.title }}\"的工单. 本邮件确认工单已经 关闭\r\n\r\nI如果您认为还需要后续工作， 请用原标题回复此邮件.\r\n\r\n如果您想在线查看， 可以访问 {{ ticket.ticket_url }}.\r\n\r\n提供的解决方案为:\r\n\r\n{{ ticket.resolution }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">您最近记录了主题为<i>{{ ticket.title }}</i>的工单. 本邮件确认工单已经 关闭</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">已提供的方案为:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">如果您想在线查看， 可以访问 <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>. 如果您认为还需要后续工作， 请用原标题回复此邮件.</p>','zh'),(102,'escalated_cc','(已经提升优先级)','工单 已经提升优先级','您好,\r\n\r\n温馨提示, 工单 {{ ticket.ticket }} (\"{{ ticket.title }}\") 已经自动提升优先级.\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: {{ ticket.get_assigned_to }}\r\n在线查看: {{ ticket.staff_url }} (需要登录)\r\n\r\n原始描述为:\r\n\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">温馨提示, 工单 <i>{{ ticket.ticket }}</i> (\'{{ ticket.title }}\') 已经 自动提升优先级.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','zh'),(103,'escalated_owner','(已经提升优先级)','工单 已分配给 您 已经提升优先级','您好,\r\n\r\nA 分配给您的当前工单已经自动提升优先级， 因为打开时间已经超过预期.\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: {{ ticket.get_assigned_to }}\r\n在线查看: {{ ticket.staff_url }} (需要登录)\r\n\r\n原始描述为:\r\n\r\n{{ ticket.description }}\r\n\r\n请查看此工单并尽快提供解决方案.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">A 当前分配给您的工单已经自动提升优先级 as it 已经 打开时间超过预期.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','zh'),(104,'escalated_submitter','(已经提升优先级)','您的 工单 已经 已经提升优先级','您好,\r\n\r\n您最近为我们记录了一个标题为 \"{{ ticket.title }}\" 的工单. 本邮件是想提醒您工单自动升级， 因为已经打开时间超过预期.\r\n\r\n我们将尽快查看并提供解决方案.\r\n\r\n如果您想在线查看， 可以访问 {{ ticket.ticket_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 11pt;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">您最近记录了主题为<i>{{ ticket.title }}</i>的工单. 本邮件是想提醒您工单自动升级， 因为已经 打开时间超过预期.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">我们将尽快查看并提供解决方案.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 11pt;\">如果您想在线查看， 可以访问 <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','zh'),(105,'newticket_cc','(已打开)','新工单已打开','您好,\r\n\r\n温馨提示： 新工单已经 打开.\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n在线查看: {{ ticket.staff_url }} (需要登录)\r\n\r\nDescription:\r\n{{ ticket.description }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">温馨提示： 新工单已经打开.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">Description:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>','zh'),(106,'newticket_submitter','(已打开)','您的工单已经打开','您好,\r\n\r\n温馨提示： 我们已经收到您主题为 \"{{ ticket.title }}\" 的查询. \r\n\r\n您当前什么都不用做. 您的工单已经分配编号 {{ ticket.ticket }} 且将很快收到回复.\r\n\r\n如果您想告诉我们更多详情, 或者要查询此工单, 请在主题带上工单id \'{{ ticket.ticket }}\' . 最简单方式就是按下此消息 \"回复\" .\r\n\r\n如果您希望在线查看并提供此工单的更多信息, 附加文件或者查看最近更新, 您可以访问 {{ ticket.ticket_url }}.\r\n\r\n我们将调查您的问题并尽快解决. 您将通过此邮箱收到后续更新和解决方案.\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">温馨提示： 我们已收到您主题为 <i>{{ ticket.title }}</i>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">您当前什么都不用做. 您的工单 已经 分配编号 <b>{{ ticket.ticket }}</b> 且将很快收到回复.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">如果您想告诉我们更多详情, 或者要查询此工单, 请在主题带上工单id <b>{{ ticket.ticket }}</b> . 最简单就是直接点这个消息的 \"回复\" 按钮.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">如果您希望在线查看并提供此工单的更多信息, 附加文件或者查看最近更新, 您可以访问 <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">我们将调查您的问题并尽快解决. 您将通过此邮箱收到后续更新和解决方案.</p>','zh'),(107,'resolved_cc','(解决)','工单 解决','您好,\r\n\r\n以下工单 已经 解决:\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: {{ ticket.get_assigned_to }}\r\n在线查看: {{ ticket.staff_url }} (需要登录)\r\n\r\n原始描述为:\r\n\r\n{{ ticket.description }}\r\n\r\n提供的解决方案为:\r\n\r\n{{ ticket.resolution }}\r\n\r\n此方案已经 邮件发送给提交者, 在您关闭之前需要他先确认.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">以下工单 已经 解决.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">增加的解决方案为:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">此方案已经 邮件发送给提交者, 在您关闭之前需要他先确认.</p>','zh'),(108,'resolved_owner','(解决)','工单 解决','您好,\r\n\r\nA 当前分配给您的工单已经 解决.\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: {{ ticket.get_assigned_to }}\r\n在线查看: {{ ticket.staff_url }} (需要登录)\r\n\r\n原始描述为:\r\n\r\n{{ ticket.description }}\r\n\r\n提供的方案为:\r\n\r\n{{ ticket.resolution }}\r\n\r\n此方案已经 邮件发送给提交者, 在您关闭之前需要他先确认.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">A 当前分配给您的工单已经 解决.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">增加的解决方案为:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">此方案已经 邮件发送给提交者, 在您关闭之前需要他先确认.</p>','zh'),(109,'resolved_submitter','(解决)','您的 工单 已经 解决','您好,\r\n\r\n您最近记录了主题为\"{{ ticket.title }}\"的工单. 此邮件是要告知您解决方案.\r\n\r\n工单添加了以下解决方案 {{ ticket.ticket }}:\r\n\r\n{{ resolution }}\r\n\r\n请您确认下此解决方案是否解决了您的问题， 这样我们可以关闭此工单? 如果有更多问题或者认为方案不够充分，, 请继续使用邮件的主题回复此邮件.\r\n\r\n如果您想在线查看， 可以访问 {{ ticket.ticket_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">您最近记录了主题为<i>{{ ticket.title }}</i>的工单. 此邮件是要告知您解决方案.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">工单添加了以下解决方案 <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ resolution }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">请您确认下此解决方案是否解决了您的问题， 这样我们可以关闭此工单? 如果有更多问题或者认为方案不够充分，, 请继续使用邮件的主题回复此邮件.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">如果您想在线查看， 可以访问 <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','zh'),(110,'updated_cc','(已更新)','工单已更新','您好,\r\n\r\n温馨提示, 提交者{{ ticket.submitter_email }}的工单{{ ticket.ticket }} 已经更新.\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: {{ ticket.get_assigned_to }}\r\n在线查看: {{ ticket.staff_url }} (需要登录)\r\n\r\n原始描述:\r\n\r\n{{ ticket.description }}\r\n\r\n已添加以下评论:\r\n\r\n{{ comment }}\r\n\r\n本信息 {% if private %}还没有{% else %} 已经 {% endif %} 邮件发送给提交者.\r\n\r\n如果您想在线查看， 可以访问 {{ ticket.staff_url }}.\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">温馨提示, {{ ticket.submitter_email }} 的工单 {{ ticket.ticket }} (\"{{ ticket.title }}\") 已经更新.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">已添加以下评论:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">本信息 {% if private %} 还没有 {% else %} 已经 {% endif %} 邮件发送给提交者.</p>','zh'),(111,'updated_owner','(已更新)','工单已更新','您好,\r\n\r\n温馨提示, 提交者分配给{{ ticket.submitter_email }} 您的工单 {{ ticket.ticket }} (\"{{ ticket.title }}\") , 已经更新.\r\n\r\n工单 ID: {{ ticket.ticket }}\r\n待办: {{ queue.title }}\r\n标题: {{ ticket.title }}\r\n已打开: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}\r\n提交人: {{ ticket.submitter_email|default:\"Unknown\" }}\r\n优先级:{{ ticket.get_priority_display }}\r\n状态: {{ ticket.get_status }}\r\n已分配给: {{ ticket.get_assigned_to }}\r\n在线查看: {{ ticket.staff_url }} (需要登录)\r\n\r\n原始描述:\r\n\r\n{{ ticket.description }}\r\n\r\n添加了一下评论:\r\n\r\n{{ comment }}\r\n\r\n本信息 {% if private %}还没有 {% endif %} 邮件发送给提交者.\r\n\r\n如果您想在线查看， 可以访问 {{ ticket.staff_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">温馨提示, 分配给您,提交者{{ ticket.submitter_email }}的工单{{ ticket.ticket }}, 已经更新.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">\r\n<b>工单 ID</b>: {{ ticket.ticket }}<br>\r\n<b>待办</b>: {{ queue.title }}<br>\r\n<b>标题</b>: {{ ticket.title }}<br>\r\n<b>已打开</b>: {{ ticket.created|date:\"l N jS Y, \\a\\t P\" }}<br>\r\n<b>提交人</b>: {{ ticket.submitter_email|default:\"Unknown\" }}<br>\r\n<b>优先级</b>: {{ ticket.get_priority_display }}<br>\r\n<b>状态</b>: {{ ticket.get_status }}<br>\r\n<b>已分配给</b>: {{ ticket.get_assigned_to }}<br>\r\n<b><a href=\'{{ ticket.staff_url }}\'>在线查看</a></b> 更新此工单 (需要登录)</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">原工单描述参考：:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ ticket.description|linebreaksbr }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">已添加以下评论:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: Tahoma, Arial, sans-serif; font-size: 11pt;\">本信息 {% if private %} 还未 {% else %} 已经 {% endif %} been 邮件发送给提交者.</p>','zh'),(112,'updated_submitter','(已更新)','您的工单已经更新','您好,\r\n\r\n您最近记录了主题为\"{{ ticket.title }}\"的工单. 此邮件是告知您工单的更新.\r\n\r\n工单添加了以下评论 {{ ticket.ticket }}:\r\n\r\n{{ comment }}\r\n\r\n如果你需要提供更多信息, 请继续使用邮件的主题回复此邮件. 或者您可以在线查看和更新此工单 {{ ticket.ticket_url }}\r\n\r\n','<p style=\"font-family: sans-serif; font-size: 1em;\">您好,</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">您最近记录了主题为<i>{{ ticket.title }}</i>的工单. 此邮件是告知您工单的更新.</p>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">工单添加了以下评论 <b>{{ ticket.ticket }}</b>:</p>\r\n\r\n<blockquote style=\"font-family: sans-serif; font-size: 1em;\">{{ comment }}</blockquote>\r\n\r\n<p style=\"font-family: sans-serif; font-size: 1em;\">如果你需要提供更多信息, 请继续使用邮件的主题回复此邮件. 或者您可以在线查看和更新此工单 <a href=\"{{ ticket.ticket_url }}\">{{ ticket.ticket_url }}</a>.</p>','zh');
/*!40000 ALTER TABLE `helpdesk_emailtemplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_escalationexclusion`
--

DROP TABLE IF EXISTS `helpdesk_escalationexclusion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_escalationexclusion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_escalationexclusion`
--

LOCK TABLES `helpdesk_escalationexclusion` WRITE;
/*!40000 ALTER TABLE `helpdesk_escalationexclusion` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_escalationexclusion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_escalationexclusion_queues`
--

DROP TABLE IF EXISTS `helpdesk_escalationexclusion_queues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_escalationexclusion_queues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `escalationexclusion_id` int(11) NOT NULL,
  `queue_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `helpdesk_escalationexclu_escalationexclusion_id_q_f8f19aff_uniq` (`escalationexclusion_id`,`queue_id`),
  KEY `helpdesk_escalatione_queue_id_ed8d4906_fk_helpdesk_` (`queue_id`),
  CONSTRAINT `helpdesk_escalatione_escalationexclusion__62556c07_fk_helpdesk_` FOREIGN KEY (`escalationexclusion_id`) REFERENCES `helpdesk_escalationexclusion` (`id`),
  CONSTRAINT `helpdesk_escalatione_queue_id_ed8d4906_fk_helpdesk_` FOREIGN KEY (`queue_id`) REFERENCES `helpdesk_queue` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_escalationexclusion_queues`
--

LOCK TABLES `helpdesk_escalationexclusion_queues` WRITE;
/*!40000 ALTER TABLE `helpdesk_escalationexclusion_queues` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_escalationexclusion_queues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_followup`
--

DROP TABLE IF EXISTS `helpdesk_followup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_followup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime(6) NOT NULL,
  `title` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `comment` longtext COLLATE utf8_bin,
  `public` tinyint(1) NOT NULL,
  `new_status` int(11) DEFAULT NULL,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `helpdesk_followup_ticket_id_3db2d079_fk_helpdesk_ticket_id` (`ticket_id`),
  KEY `helpdesk_followup_user_id_5b9c07e3_fk_investors_id` (`user_id`),
  CONSTRAINT `helpdesk_followup_ticket_id_3db2d079_fk_helpdesk_ticket_id` FOREIGN KEY (`ticket_id`) REFERENCES `helpdesk_ticket` (`id`),
  CONSTRAINT `helpdesk_followup_user_id_5b9c07e3_fk_investors_id` FOREIGN KEY (`user_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_followup`
--

LOCK TABLES `helpdesk_followup` WRITE;
/*!40000 ALTER TABLE `helpdesk_followup` DISABLE KEYS */;
INSERT INTO `helpdesk_followup` VALUES (7,'2018-07-19 13:58:37.822627','Comment','Я куда-то нажал и все сломалось',1,NULL,3,2),(8,'2018-07-19 13:58:41.694558','Comment','Помогите',1,NULL,3,2),(9,'2018-07-19 13:58:59.798306','Comment','Скоро поможем ',1,NULL,3,1),(10,'2018-07-19 14:11:35.130065','Comment','тест',1,NULL,3,2),(11,'2018-07-19 14:16:58.014895','Comment','test',1,NULL,4,2);
/*!40000 ALTER TABLE `helpdesk_followup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_ignoreemail`
--

DROP TABLE IF EXISTS `helpdesk_ignoreemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_ignoreemail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `date` date NOT NULL,
  `email_address` varchar(150) COLLATE utf8_bin NOT NULL,
  `keep_in_mailbox` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_ignoreemail`
--

LOCK TABLES `helpdesk_ignoreemail` WRITE;
/*!40000 ALTER TABLE `helpdesk_ignoreemail` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_ignoreemail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_ignoreemail_queues`
--

DROP TABLE IF EXISTS `helpdesk_ignoreemail_queues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_ignoreemail_queues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ignoreemail_id` int(11) NOT NULL,
  `queue_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `helpdesk_ignoreemail_que_ignoreemail_id_queue_id_b3c79ff5_uniq` (`ignoreemail_id`,`queue_id`),
  KEY `helpdesk_ignoreemail_queue_id_73141496_fk_helpdesk_` (`queue_id`),
  CONSTRAINT `helpdesk_ignoreemail_ignoreemail_id_f6fcd398_fk_helpdesk_` FOREIGN KEY (`ignoreemail_id`) REFERENCES `helpdesk_ignoreemail` (`id`),
  CONSTRAINT `helpdesk_ignoreemail_queue_id_73141496_fk_helpdesk_` FOREIGN KEY (`queue_id`) REFERENCES `helpdesk_queue` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_ignoreemail_queues`
--

LOCK TABLES `helpdesk_ignoreemail_queues` WRITE;
/*!40000 ALTER TABLE `helpdesk_ignoreemail_queues` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_ignoreemail_queues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_kbcategory`
--

DROP TABLE IF EXISTS `helpdesk_kbcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_kbcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `slug` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` longtext COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `helpdesk_kbcategory_slug_5922579d` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_kbcategory`
--

LOCK TABLES `helpdesk_kbcategory` WRITE;
/*!40000 ALTER TABLE `helpdesk_kbcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_kbcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_kbitem`
--

DROP TABLE IF EXISTS `helpdesk_kbitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_kbitem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `question` longtext COLLATE utf8_bin NOT NULL,
  `answer` longtext COLLATE utf8_bin NOT NULL,
  `votes` int(11) NOT NULL,
  `recommendations` int(11) NOT NULL,
  `last_updated` datetime(6) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `helpdesk_kbitem_category_id_14a1b130_fk_helpdesk_kbcategory_id` (`category_id`),
  CONSTRAINT `helpdesk_kbitem_category_id_14a1b130_fk_helpdesk_kbcategory_id` FOREIGN KEY (`category_id`) REFERENCES `helpdesk_kbcategory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_kbitem`
--

LOCK TABLES `helpdesk_kbitem` WRITE;
/*!40000 ALTER TABLE `helpdesk_kbitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_kbitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_presetreply`
--

DROP TABLE IF EXISTS `helpdesk_presetreply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_presetreply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `body` longtext COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_presetreply`
--

LOCK TABLES `helpdesk_presetreply` WRITE;
/*!40000 ALTER TABLE `helpdesk_presetreply` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_presetreply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_presetreply_queues`
--

DROP TABLE IF EXISTS `helpdesk_presetreply_queues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_presetreply_queues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `presetreply_id` int(11) NOT NULL,
  `queue_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `helpdesk_presetreply_que_presetreply_id_queue_id_805647a1_uniq` (`presetreply_id`,`queue_id`),
  KEY `helpdesk_presetreply_queue_id_b90d97e8_fk_helpdesk_` (`queue_id`),
  CONSTRAINT `helpdesk_presetreply_presetreply_id_9e5e7b10_fk_helpdesk_` FOREIGN KEY (`presetreply_id`) REFERENCES `helpdesk_presetreply` (`id`),
  CONSTRAINT `helpdesk_presetreply_queue_id_b90d97e8_fk_helpdesk_` FOREIGN KEY (`queue_id`) REFERENCES `helpdesk_queue` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_presetreply_queues`
--

LOCK TABLES `helpdesk_presetreply_queues` WRITE;
/*!40000 ALTER TABLE `helpdesk_presetreply_queues` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_presetreply_queues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_queue`
--

DROP TABLE IF EXISTS `helpdesk_queue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_queue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `slug` varchar(50) COLLATE utf8_bin NOT NULL,
  `email_address` varchar(254) COLLATE utf8_bin DEFAULT NULL,
  `locale` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `allow_public_submission` tinyint(1) NOT NULL,
  `allow_email_submission` tinyint(1) NOT NULL,
  `escalate_days` int(11) DEFAULT NULL,
  `new_ticket_cc` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `updated_ticket_cc` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `email_box_type` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  `email_box_host` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `email_box_port` int(11) DEFAULT NULL,
  `email_box_ssl` tinyint(1) NOT NULL,
  `email_box_user` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `email_box_pass` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `email_box_imap_folder` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `email_box_interval` int(11) DEFAULT NULL,
  `email_box_last_check` datetime(6) DEFAULT NULL,
  `socks_proxy_type` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `socks_proxy_host` char(39) COLLATE utf8_bin DEFAULT NULL,
  `socks_proxy_port` int(11) DEFAULT NULL,
  `permission_name` varchar(72) COLLATE utf8_bin DEFAULT NULL,
  `default_owner_id` int(11) DEFAULT NULL,
  `email_box_local_dir` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `logging_dir` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `logging_type` varchar(5) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `helpdesk_queue_slug_3b3429c3_uniq` (`slug`),
  KEY `helpdesk_queue_default_owner_id_b0930a66_fk_investors_id` (`default_owner_id`),
  CONSTRAINT `helpdesk_queue_default_owner_id_b0930a66_fk_investors_id` FOREIGN KEY (`default_owner_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_queue`
--

LOCK TABLES `helpdesk_queue` WRITE;
/*!40000 ALTER TABLE `helpdesk_queue` DISABLE KEYS */;
INSERT INTO `helpdesk_queue` VALUES (1,'Support','support',NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,5,NULL,NULL,NULL,NULL,'helpdesk.queue_access_support',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `helpdesk_queue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_savedsearch`
--

DROP TABLE IF EXISTS `helpdesk_savedsearch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_savedsearch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `shared` tinyint(1) NOT NULL,
  `query` longtext COLLATE utf8_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `helpdesk_savedsearch_user_id_24cf33b5_fk_investors_id` (`user_id`),
  CONSTRAINT `helpdesk_savedsearch_user_id_24cf33b5_fk_investors_id` FOREIGN KEY (`user_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_savedsearch`
--

LOCK TABLES `helpdesk_savedsearch` WRITE;
/*!40000 ALTER TABLE `helpdesk_savedsearch` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_savedsearch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_ticket`
--

DROP TABLE IF EXISTS `helpdesk_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8_bin NOT NULL,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  `submitter_email` varchar(254) COLLATE utf8_bin DEFAULT NULL,
  `status` int(11) NOT NULL,
  `on_hold` tinyint(1) NOT NULL,
  `description` longtext COLLATE utf8_bin,
  `resolution` longtext COLLATE utf8_bin,
  `priority` int(11) NOT NULL,
  `due_date` datetime(6) DEFAULT NULL,
  `last_escalation` datetime(6) DEFAULT NULL,
  `assigned_to_id` int(11) DEFAULT NULL,
  `queue_id` int(11) NOT NULL,
  `reporter_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `helpdesk_ticket_assigned_to_id_0716992e_fk_investors_id` (`assigned_to_id`),
  KEY `helpdesk_ticket_queue_id_9b210169_fk_helpdesk_queue_id` (`queue_id`),
  KEY `helpdesk_ticket_reporter_id_2151af00_fk_investors_id` (`reporter_id`),
  CONSTRAINT `helpdesk_ticket_assigned_to_id_0716992e_fk_investors_id` FOREIGN KEY (`assigned_to_id`) REFERENCES `investors` (`id`),
  CONSTRAINT `helpdesk_ticket_queue_id_9b210169_fk_helpdesk_queue_id` FOREIGN KEY (`queue_id`) REFERENCES `helpdesk_queue` (`id`),
  CONSTRAINT `helpdesk_ticket_reporter_id_2151af00_fk_investors_id` FOREIGN KEY (`reporter_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_ticket`
--

LOCK TABLES `helpdesk_ticket` WRITE;
/*!40000 ALTER TABLE `helpdesk_ticket` DISABLE KEYS */;
INSERT INTO `helpdesk_ticket` VALUES (3,'Не получается купить токены','2018-07-19 13:58:37.815431','2018-07-19 14:11:35.130104',NULL,1,0,NULL,NULL,3,NULL,NULL,NULL,1,2),(4,'New','2018-07-19 14:16:58.012479','2018-07-19 14:16:58.014962',NULL,1,0,NULL,NULL,3,NULL,NULL,NULL,1,2);
/*!40000 ALTER TABLE `helpdesk_ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_ticketcc`
--

DROP TABLE IF EXISTS `helpdesk_ticketcc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_ticketcc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) COLLATE utf8_bin DEFAULT NULL,
  `can_view` tinyint(1) NOT NULL,
  `can_update` tinyint(1) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `helpdesk_ticketcc_ticket_id_4e774289_fk_helpdesk_ticket_id` (`ticket_id`),
  KEY `helpdesk_ticketcc_user_id_d811c3c2_fk_investors_id` (`user_id`),
  CONSTRAINT `helpdesk_ticketcc_ticket_id_4e774289_fk_helpdesk_ticket_id` FOREIGN KEY (`ticket_id`) REFERENCES `helpdesk_ticket` (`id`),
  CONSTRAINT `helpdesk_ticketcc_user_id_d811c3c2_fk_investors_id` FOREIGN KEY (`user_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_ticketcc`
--

LOCK TABLES `helpdesk_ticketcc` WRITE;
/*!40000 ALTER TABLE `helpdesk_ticketcc` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_ticketcc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_ticketchange`
--

DROP TABLE IF EXISTS `helpdesk_ticketchange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_ticketchange` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `field` varchar(100) COLLATE utf8_bin NOT NULL,
  `old_value` longtext COLLATE utf8_bin,
  `new_value` longtext COLLATE utf8_bin,
  `followup_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `helpdesk_ticketchang_followup_id_2e4e87bc_fk_helpdesk_` (`followup_id`),
  CONSTRAINT `helpdesk_ticketchang_followup_id_2e4e87bc_fk_helpdesk_` FOREIGN KEY (`followup_id`) REFERENCES `helpdesk_followup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_ticketchange`
--

LOCK TABLES `helpdesk_ticketchange` WRITE;
/*!40000 ALTER TABLE `helpdesk_ticketchange` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_ticketchange` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_ticketcustomfieldvalue`
--

DROP TABLE IF EXISTS `helpdesk_ticketcustomfieldvalue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_ticketcustomfieldvalue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` longtext COLLATE utf8_bin,
  `field_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `helpdesk_ticketcustomfieldvalue_ticket_id_field_id_4fc28390_uniq` (`ticket_id`,`field_id`),
  KEY `helpdesk_ticketcusto_field_id_fd61fcda_fk_helpdesk_` (`field_id`),
  CONSTRAINT `helpdesk_ticketcusto_field_id_fd61fcda_fk_helpdesk_` FOREIGN KEY (`field_id`) REFERENCES `helpdesk_customfield` (`id`),
  CONSTRAINT `helpdesk_ticketcusto_ticket_id_4e2fe33a_fk_helpdesk_` FOREIGN KEY (`ticket_id`) REFERENCES `helpdesk_ticket` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_ticketcustomfieldvalue`
--

LOCK TABLES `helpdesk_ticketcustomfieldvalue` WRITE;
/*!40000 ALTER TABLE `helpdesk_ticketcustomfieldvalue` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_ticketcustomfieldvalue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_ticketdependency`
--

DROP TABLE IF EXISTS `helpdesk_ticketdependency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_ticketdependency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depends_on_id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `helpdesk_ticketdependency_ticket_id_depends_on_id_43caa9be_uniq` (`ticket_id`,`depends_on_id`),
  KEY `helpdesk_ticketdepen_depends_on_id_e310efa4_fk_helpdesk_` (`depends_on_id`),
  CONSTRAINT `helpdesk_ticketdepen_depends_on_id_e310efa4_fk_helpdesk_` FOREIGN KEY (`depends_on_id`) REFERENCES `helpdesk_ticket` (`id`),
  CONSTRAINT `helpdesk_ticketdepen_ticket_id_618bbe6b_fk_helpdesk_` FOREIGN KEY (`ticket_id`) REFERENCES `helpdesk_ticket` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_ticketdependency`
--

LOCK TABLES `helpdesk_ticketdependency` WRITE;
/*!40000 ALTER TABLE `helpdesk_ticketdependency` DISABLE KEYS */;
/*!40000 ALTER TABLE `helpdesk_ticketdependency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `helpdesk_usersettings`
--

DROP TABLE IF EXISTS `helpdesk_usersettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `helpdesk_usersettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `settings_pickled` longtext COLLATE utf8_bin,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `helpdesk_usersettings_user_id_58123c87_fk_investors_id` FOREIGN KEY (`user_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `helpdesk_usersettings`
--

LOCK TABLES `helpdesk_usersettings` WRITE;
/*!40000 ALTER TABLE `helpdesk_usersettings` DISABLE KEYS */;
INSERT INTO `helpdesk_usersettings` VALUES (1,'gAN9cQAoWBYAAAB1c2VfZW1haWxfYXNfc3VibWl0dGVycQGIWBYAAABlbWFpbF9vbl90aWNrZXRfYXNzaWducQKIWBYAAABlbWFpbF9vbl90aWNrZXRfY2hhbmdlcQOIWBUAAABsb2dpbl92aWV3X3RpY2tldGxpc3RxBIhYEAAAAHRpY2tldHNfcGVyX3BhZ2VxBUsZdS4=',1),(2,'gAN9cQAoWBYAAAB1c2VfZW1haWxfYXNfc3VibWl0dGVycQGIWBYAAABlbWFpbF9vbl90aWNrZXRfYXNzaWducQKIWBYAAABlbWFpbF9vbl90aWNrZXRfY2hhbmdlcQOIWBUAAABsb2dpbl92aWV3X3RpY2tldGxpc3RxBIhYEAAAAHRpY2tldHNfcGVyX3BhZ2VxBUsZdS4=',2);
/*!40000 ALTER TABLE `helpdesk_usersettings` ENABLE KEYS */;
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
INSERT INTO `ico_info` VALUES (1,'2018-07-17 12:43:59.798133',2737334),(2,'2018-07-19 09:06:11.618784',2737334),(3,'2018-07-19 09:11:10.948030',2737334),(4,'2018-07-19 09:16:10.986330',2737334),(5,'2018-07-19 14:01:31.683554',2737334),(6,'2018-07-19 14:01:31.961634',2737334),(7,'2018-07-19 14:01:32.623598',2737334),(8,'2018-07-19 14:01:33.076180',2737334),(9,'2018-07-19 14:01:33.352225',2737334),(10,'2018-07-19 14:01:33.912354',2737334),(11,'2018-07-19 14:01:34.219210',2737334),(12,'2018-07-19 14:01:34.726849',2737334),(13,'2018-07-19 14:01:35.022820',2737334),(14,'2018-07-19 14:01:35.414667',2737334),(15,'2018-07-19 14:06:24.698727',2737334),(16,'2018-07-19 14:11:24.851489',2737334),(17,'2018-07-19 14:16:25.037413',2737334),(18,'2018-07-19 14:21:25.046642',2737334),(19,'2018-07-19 14:26:25.011454',2737334),(20,'2018-07-19 14:31:24.973552',2737334),(21,'2018-07-19 14:36:25.204321',2737334),(22,'2018-07-19 14:41:25.605619',2737334),(23,'2018-07-19 14:46:25.114644',2737334),(24,'2018-07-19 14:51:25.162737',2737334),(25,'2018-07-19 14:56:25.111956',2737334),(26,'2018-07-19 15:01:25.112720',2737334),(27,'2018-07-21 13:36:06.283376',15700000000000000000000000),(28,'2018-07-21 13:41:03.696609',15700000000000000000000000),(29,'2018-07-21 13:46:03.937041',15700000000000000000000000),(30,'2018-07-21 13:51:03.816490',15700000000000000000000000),(31,'2018-07-21 13:56:04.043380',15700000000000000000000000),(32,'2018-07-21 14:01:04.070022',15700000000000000000000000),(33,'2018-07-21 14:06:04.064130',15700000000000000000000000),(34,'2018-07-21 14:11:04.508629',15700000000000000000000000),(35,'2018-07-21 14:16:04.150729',2771280),(36,'2018-07-21 14:21:04.188500',2771280);
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
  `first_name` varchar(30) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(150) COLLATE utf8_bin NOT NULL,
  `eth_account` varchar(42) COLLATE utf8_bin DEFAULT NULL,
  `tokens_amount` decimal(65,0) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `referral_id` varchar(16) COLLATE utf8_bin NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `referrer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `referral_id` (`referral_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `eth_account` (`eth_account`),
  KEY `investors_referrer_id_fe866d5b_fk_investors_id` (`referrer_id`),
  CONSTRAINT `investors_referrer_id_fe866d5b_fk_investors_id` FOREIGN KEY (`referrer_id`) REFERENCES `investors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investors`
--

LOCK TABLES `investors` WRITE;
/*!40000 ALTER TABLE `investors` DISABLE KEYS */;
INSERT INTO `investors` VALUES ('pbkdf2_sha256$100000$v7agkQFbwBhA$ZNdAEdw4Gzx9Wh8A0EQqLsmSAM5jZnbIgxScfaWG3RI=','2018-07-21 15:54:33.588787',1,'admin@ongrid.pro','','','0x73015966604928A312F79F7E69291a656Cb88602',-5694457440000000000000000,'2018-07-17 12:32:31.340503','EgPh9kheSFWoowsz',1,1,1,NULL),('pbkdf2_sha256$100000$jz2pej1vcec8$g3Gpiv6GlDmoGWPnnSnocHydJjTtRjOn0k+HSu3CKTU=','2018-07-21 15:54:12.690876',2,'gordon@ongrid.pro','','','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',5000000000000000000000,'2018-07-17 12:36:23.701588','Fgs5NOgjYoUfezij',1,0,0,NULL);
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
  `firstname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `decline_reason` longtext COLLATE utf8_bin,
  `approve_txn_id` char(32) COLLATE utf8_bin DEFAULT NULL,
  `investor_id` int(11) NOT NULL,
  `ticket_id` int(11) DEFAULT NULL,
  `address` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `basis_doc` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `beneficial_birthdate` date DEFAULT NULL,
  `beneficial_fullname` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `beneficial_personal_id` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `beneficial_place_of_birth` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `beneficial_place_of_residence` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `bill_photo` varchar(100) COLLATE utf8_bin NOT NULL,
  `business_name` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `director_firstname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `director_lastname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(254) COLLATE utf8_bin DEFAULT NULL,
  `field_of_activity` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `id_document_photo` varchar(100) COLLATE utf8_bin NOT NULL,
  `is_pep` tinyint(1) DEFAULT NULL,
  `lastname` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `personal_id` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `phone_number` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `place_of_birth` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `place_of_residence` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `profession` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `registration_number` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `type` varchar(10) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `investor_id` (`investor_id`),
  KEY `kyc_ticket_id_ab40dc71_fk_helpdesk_ticket_id` (`ticket_id`),
  CONSTRAINT `kyc_investor_id_1910e4d7_fk_investors_id` FOREIGN KEY (`investor_id`) REFERENCES `investors` (`id`),
  CONSTRAINT `kyc_ticket_id_ab40dc71_fk_helpdesk_ticket_id` FOREIGN KEY (`ticket_id`) REFERENCES `helpdesk_ticket` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kyc`
--

LOCK TABLES `kyc` WRITE;
/*!40000 ALTER TABLE `kyc` DISABLE KEYS */;
INSERT INTO `kyc` VALUES (1,'APPROVED','Roman','2018-07-21',NULL,'325a8d4cbd9f4549ba2f9c7dda030d0e',2,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,'kyc/2/bill_photo/download.jpeg',NULL,NULL,NULL,NULL,NULL,'kyc/2/doc_photo/download.jpeg',NULL,'Nesytov',NULL,NULL,'Moscow',NULL,NULL,NULL,NULL,'NATURAL');
/*!40000 ALTER TABLE `kyc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_page`
--

DROP TABLE IF EXISTS `page_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `title` varchar(200) COLLATE utf8_bin NOT NULL,
  `slug` varchar(150) COLLATE utf8_bin NOT NULL,
  `in_navigation` tinyint(1) NOT NULL,
  `override_url` varchar(255) COLLATE utf8_bin NOT NULL,
  `redirect_to` varchar(255) COLLATE utf8_bin NOT NULL,
  `_cached_url` varchar(255) COLLATE utf8_bin NOT NULL,
  `lft` int(10) unsigned NOT NULL,
  `rght` int(10) unsigned NOT NULL,
  `tree_id` int(10) unsigned NOT NULL,
  `level` int(10) unsigned NOT NULL,
  `template_key` varchar(255) COLLATE utf8_bin NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `page_page_parent_id_3d617840_fk_page_page_id` (`parent_id`),
  KEY `page_page_slug_d6b7c8ed` (`slug`),
  KEY `page_page__cached_url_8366e9ae` (`_cached_url`),
  KEY `page_page_lft_4c487c13` (`lft`),
  KEY `page_page_rght_bcda0183` (`rght`),
  KEY `page_page_tree_id_8d7cea49` (`tree_id`),
  KEY `page_page_level_cb2285c4` (`level`),
  CONSTRAINT `page_page_parent_id_3d617840_fk_page_page_id` FOREIGN KEY (`parent_id`) REFERENCES `page_page` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_page`
--

LOCK TABLES `page_page` WRITE;
/*!40000 ALTER TABLE `page_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_page_newspagecontent`
--

DROP TABLE IF EXISTS `page_page_newspagecontent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_page_newspagecontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `text` longtext COLLATE utf8_bin NOT NULL,
  `picture` varchar(100) COLLATE utf8_bin NOT NULL,
  `region` varchar(255) COLLATE utf8_bin NOT NULL,
  `ordering` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `page_page_newspagecontent_parent_id_0e0f3fc6_fk_page_page_id` (`parent_id`),
  CONSTRAINT `page_page_newspagecontent_parent_id_0e0f3fc6_fk_page_page_id` FOREIGN KEY (`parent_id`) REFERENCES `page_page` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_page_newspagecontent`
--

LOCK TABLES `page_page_newspagecontent` WRITE;
/*!40000 ALTER TABLE `page_page_newspagecontent` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_page_newspagecontent` ENABLE KEYS */;
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
  `usdc_value` decimal(65,0) NOT NULL,
  `tokens_move_id` int(11) NOT NULL,
  `bonus_ids` int(11) DEFAULT NULL,
  `bonus_percent` int(11) DEFAULT NULL,
  `rate_usdc` decimal(65,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_tokens_move_id_8d316d9f_fk_tokens_moves_id` (`tokens_move_id`),
  CONSTRAINT `payments_tokens_move_id_8d316d9f_fk_tokens_moves_id` FOREIGN KEY (`tokens_move_id`) REFERENCES `tokens_moves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'ETH','0x73015966604928A312F79F7E69291a656Cb88602',20.000000000000000000,20000000000000000000,NULL,'0x3787895064b624c5c46051b02cc45c7a8d328d75f57d1857456c3092beccf428','2018-07-21 13:36:07.188334',923760,273,1,20,46188),(2,'ETH','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',20.000000000000000000,20000000000000000000,NULL,'0x61f493131fa987986923e647aeb070337246bf91b13cf4b606a99618641bea70','2018-07-21 14:01:06.598316',923760,275,1,20,46188);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phases`
--

LOCK TABLES `phases` WRITE;
/*!40000 ALTER TABLE `phases` DISABLE KEYS */;
INSERT INTO `phases` VALUES (1,'First phase','2018-07-17 15:32:52.000000','2018-09-30 15:32:57.000000',10,10);
/*!40000 ALTER TABLE `phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `po_update_log`
--

DROP TABLE IF EXISTS `po_update_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `po_update_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `oracle_rate` decimal(65,0) NOT NULL,
  `actual_rate` decimal(65,0) NOT NULL,
  `txn_id` char(32) COLLATE utf8_bin NOT NULL,
  `new_rate` decimal(65,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `po_update_log`
--

LOCK TABLES `po_update_log` WRITE;
/*!40000 ALTER TABLE `po_update_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `po_update_log` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_code`
--

LOCK TABLES `social_auth_code` WRITE;
/*!40000 ALTER TABLE `social_auth_code` DISABLE KEYS */;
INSERT INTO `social_auth_code` VALUES (1,'gordon@ongrid.pro','80d6be63b6874444ae2831ee89b9481e',0,'2018-07-17 15:35:22.126115'),(2,'gordon@ongrid.pro','2b98816042f44427b115989a1879510b',1,'2018-07-17 15:36:15.612926');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_partial`
--

LOCK TABLES `social_auth_partial` WRITE;
/*!40000 ALTER TABLE `social_auth_partial` DISABLE KEYS */;
INSERT INTO `social_auth_partial` VALUES (1,'d79402f3da0e47718f29d829eca35a54',4,'email','{\"args\": [], \"kwargs\": {\"password\": \"q123q123q123\", \"response\": {\"email\": [\"gordon@ongrid.pro\"], \"password1\": [\"q123q123q123\"], \"password2\": [\"q123q123q123\"], \"g-recaptcha-response\": [\"03AEMEkEnVhzz58c_4LlvW3SSUb6t_QShz4C5525Oh_XPN8Xv1LPmLjQzdfEc8rgd44D5G1R4glq-6hB9VKbp1OPbzl1xGFK7VtzDLpGEsSIEToUwvLXOTlNEIbQbi2qw9XNuRwK9CYqBUx1gokmFQT117jWZEwnnFCR56sCOmWIw__KrR0Z2yRtaic1nLiTSoSSODqD4q0l3Yu-Ln5wMPNJsEp4aAhRHrXv-5EkSFRiWfslMGEXcJMjUEQO-zCc8UY4fX0qZiUtyl8RN2Sk1H_U0U3bSYU1u__OWSysTBPU5iCGMw-tax1DjLhsG40RyNApTaBACHXyLB9lOsrmsPEEi80amOFo-Sf7MaJGjPHYr915a1ieFZaNawMg9tZODlJJSBLanxIvIGWLRJ7InKpytp4kuUzMlJoFNxhii2WPozN8Ave-i2cUlJp4TLtaXmcHVNeM8PBZ3f\"], \"csrfmiddlewaretoken\": [\"KewtZCQ2GNv40tBMEcONAQlPulQ9cLCgbS6vHE4G6Cs33ZNuq8sGfzpUvUv0tj5o\"]}, \"is_new\": true, \"details\": {\"username\": \"gordon\", \"email\": \"gordon@ongrid.pro\", \"fullname\": \"\", \"first_name\": \"\", \"last_name\": \"\"}, \"uid\": \"gordon@ongrid.pro\", \"new_association\": true, \"username\": null, \"user\": null, \"social\": null}}','2018-07-17 15:35:22.365590'),(2,'3f806c7089614e60bb00df9df6948be1',4,'email','{\"args\": [], \"kwargs\": {\"password\": \"q123q123q123\", \"response\": {\"email\": [\"gordon@ongrid.pro\"], \"password1\": [\"q123q123q123\"], \"password2\": [\"q123q123q123\"], \"g-recaptcha-response\": [\"03AEMEkEnVhzz58c_4LlvW3SSUb6t_QShz4C5525Oh_XPN8Xv1LPmLjQzdfEc8rgd44D5G1R4glq-6hB9VKbp1OPbzl1xGFK7VtzDLpGEsSIEToUwvLXOTlNEIbQbi2qw9XNuRwK9CYqBUx1gokmFQT117jWZEwnnFCR56sCOmWIw__KrR0Z2yRtaic1nLiTSoSSODqD4q0l3Yu-Ln5wMPNJsEp4aAhRHrXv-5EkSFRiWfslMGEXcJMjUEQO-zCc8UY4fX0qZiUtyl8RN2Sk1H_U0U3bSYU1u__OWSysTBPU5iCGMw-tax1DjLhsG40RyNApTaBACHXyLB9lOsrmsPEEi80amOFo-Sf7MaJGjPHYr915a1ieFZaNawMg9tZODlJJSBLanxIvIGWLRJ7InKpytp4kuUzMlJoFNxhii2WPozN8Ave-i2cUlJp4TLtaXmcHVNeM8PBZ3f\"], \"csrfmiddlewaretoken\": [\"KewtZCQ2GNv40tBMEcONAQlPulQ9cLCgbS6vHE4G6Cs33ZNuq8sGfzpUvUv0tj5o\"]}, \"is_new\": true, \"details\": {\"username\": \"gordon\", \"email\": \"gordon@ongrid.pro\", \"fullname\": \"\", \"first_name\": \"\", \"last_name\": \"\"}, \"uid\": \"gordon@ongrid.pro\", \"new_association\": true, \"username\": null, \"user\": null, \"social\": null}}','2018-07-17 15:36:15.631986');
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
INSERT INTO `social_auth_usersocialauth` VALUES (1,'email','gordon@ongrid.pro','{}',2);
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
  `amount` decimal(65,0) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=279 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens_moves`
--

LOCK TABLES `tokens_moves` WRITE;
/*!40000 ALTER TABLE `tokens_moves` DISABLE KEYS */;
INSERT INTO `tokens_moves` VALUES (271,5700000000000000000000000,'2018-07-21 13:36:05.833857','2018-07-21 13:36:05.834041','ACTUAL','IN','0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD',136),(272,5700000000000000000000000,'2018-07-21 13:36:05.850088','2018-07-21 13:36:05.850119','ACTUAL','OUT','0x73015966604928A312F79F7E69291a656Cb88602',136),(273,5542560000000000000000,'2018-07-21 13:36:06.303511','2018-07-21 13:36:06.303619','ACTUAL','IN','0x73015966604928A312F79F7E69291a656Cb88602',137),(274,5542560000000000000000,'2018-07-21 13:36:06.372067','2018-07-21 13:36:06.372100','ACTUAL','OUT','0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD',137),(275,5542560000000000000000,'2018-07-21 14:01:05.956935','2018-07-21 14:01:05.957117','ACTUAL','IN','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',138),(276,5542560000000000000000,'2018-07-21 14:01:05.966341','2018-07-21 14:01:05.966385','ACTUAL','OUT','0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD',138),(277,542560000000000000000,'2018-07-21 14:05:36.106608','2018-07-21 14:05:36.106659','ACTUAL','IN','0x4A2CB5F3942Dbbf09BdDc6d9e354b28c7F69dc0d',139),(278,542560000000000000000,'2018-07-21 14:05:36.109257','2018-07-21 14:05:36.109298','ACTUAL','OUT','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',139);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (5,'0x7dabb4d6000000000000000000000000b63e4ecf7cece510a94a7231bafb70cdca18b91e',282,0,'0x73015966604928A312F79F7E69291a656Cb88602','0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD',50000,12000000000,'0xaf63b612b905c6fe67ac1bc46e60ad2e4953ec011f18250bc67359e557aa7aeb',2674035,'MINED',NULL,'2018-07-21 13:43:04.886411','325a8d4cbd9f4549ba2f9c7dda030d0e');
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
  `buy_txn_id` char(32) COLLATE utf8_bin DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfers`
--

LOCK TABLES `transfers` WRITE;
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` VALUES (136,'0xfe63808b5ae451e707596f892e2784ec2e83d073954142d94eebfb636af4d7b0',NULL,'0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD','0x73015966604928A312F79F7E69291a656Cb88602',5700000000000000000000000,'0x6b54dac24e4ba4fb7089e280433970b11f4f6202f4a4a727675bffcf33829e4a',2673243,'2018-07-21 13:36:05.621551','2018-07-21 13:36:05.829593','ACTUAL'),(137,'0x3787895064b624c5c46051b02cc45c7a8d328d75f57d1857456c3092beccf428',NULL,'0x73015966604928A312F79F7E69291a656Cb88602','0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD',5542560000000000000000,'0x86725f644d4a7a4994e4caa0bfb36959cb95f9848abe18fcc00b5684a56dd230',2673290,'2018-07-21 13:36:05.730089','2018-07-21 13:36:06.300744','ACTUAL'),(138,'0x61f493131fa987986923e647aeb070337246bf91b13cf4b606a99618641bea70',NULL,'0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e','0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD',5542560000000000000000,'0xcb29a41f02a1af35fb945515ed3f8dc84668f16b490199687d8889c40924f05c',2674104,'2018-07-21 14:01:05.909835','2018-07-21 14:01:05.952445','ACTUAL'),(139,'0xf7988ffc69f5d2369dd27f265357af827f2e200944f32e3decabd68b1c5d5b64',NULL,'0x4A2CB5F3942Dbbf09BdDc6d9e354b28c7F69dc0d','0xB63e4ECF7CECe510A94A7231BaFB70cdCa18b91e',542560000000000000000,'0x01c3eadde67b49c36234ac97253017c36008c292205b60f948571d0b97dfdd77',2674122,'2018-07-21 14:05:36.081666','2018-07-21 14:05:36.104513','ACTUAL');
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

-- Dump completed on 2018-07-21 17:37:15
