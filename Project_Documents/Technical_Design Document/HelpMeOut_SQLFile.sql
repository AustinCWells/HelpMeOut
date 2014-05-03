# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.16)
# Database: HelpMeOut
# Generation Time: 2014-03-27 19:05:44 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table BADGES
# ------------------------------------------------------------

DROP TABLE IF EXISTS `BADGES`;

CREATE TABLE `BADGES` (
  `badge_id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`badge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `BADGES` WRITE;
/*!40000 ALTER TABLE `BADGES` DISABLE KEYS */;

INSERT INTO `BADGES` (`badge_id`, `title`, `description`)
VALUES
	(1,'Speed Demon','They call you... \"El Rapido\"'),
	(2,'Night Owl','You Work the Graveyard Shift'),
	(3,'Multi-Tasker','You take on multiple requests at a time and no one has a clue');

/*!40000 ALTER TABLE `BADGES` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table BADGES_EARNED
# ------------------------------------------------------------

DROP TABLE IF EXISTS `BADGES_EARNED`;

CREATE TABLE `BADGES_EARNED` (
  `badge_awarded_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `badge_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`badge_awarded_id`),
  KEY `badges_earned_user_link` (`user_id`),
  KEY `badges_earned_badges_link` (`badge_id`),
  CONSTRAINT `badges_earned_badges_link` FOREIGN KEY (`badge_id`) REFERENCES `BADGES` (`badge_id`),
  CONSTRAINT `badges_earned_user_link` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `BADGES_EARNED` WRITE;
/*!40000 ALTER TABLE `BADGES_EARNED` DISABLE KEYS */;

INSERT INTO `BADGES_EARNED` (`badge_awarded_id`, `user_id`, `badge_id`)
VALUES
	(1,2,1),
	(2,2,3),
	(3,1,2),
	(4,4,1),
	(5,4,2),
	(6,3,1),
	(7,5,2),
	(8,6,3);

/*!40000 ALTER TABLE `BADGES_EARNED` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table BIDS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `BIDS`;

CREATE TABLE `BIDS` (
  `bid_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `bidder_id` int(11) unsigned DEFAULT NULL,
  `task_id` int(11) unsigned NOT NULL,
  `amount` int(5) DEFAULT NULL,
  PRIMARY KEY (`bid_id`),
  KEY `bids_user_link` (`bidder_id`),
  KEY `bid_task_link` (`task_id`),
  CONSTRAINT `bids_user_link` FOREIGN KEY (`bidder_id`) REFERENCES `USER` (`user_id`),
  CONSTRAINT `bid_task_link` FOREIGN KEY (`task_id`) REFERENCES `TASK` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table CATEGORY
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CATEGORY`;

CREATE TABLE `CATEGORY` (
  `category_id` int(3) unsigned NOT NULL,
  `title` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `CATEGORY` WRITE;
/*!40000 ALTER TABLE `CATEGORY` DISABLE KEYS */;

INSERT INTO `CATEGORY` (`category_id`, `title`)
VALUES
	(1,'Food Delivery'),
	(2,'Rides'),
	(3,'Grocery Run'),
	(4,'Cleaning'),
	(5,'Laundry'),
	(6,'Maintenance'),
	(7,'Tech Support'),
	(8,'Other');

/*!40000 ALTER TABLE `CATEGORY` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table OFFERS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `OFFERS`;

CREATE TABLE `OFFERS` (
  `offer_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `task_id` int(11) unsigned NOT NULL,
  `chooser_id` int(11) unsigned NOT NULL,
  `is_accepted` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`offer_id`),
  KEY `offers_task_link` (`task_id`),
  KEY `offers_user_link` (`chooser_id`),
  CONSTRAINT `offers_user_link` FOREIGN KEY (`chooser_id`) REFERENCES `USER` (`user_id`),
  CONSTRAINT `offers_task_link` FOREIGN KEY (`task_id`) REFERENCES `TASK` (`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `OFFERS` WRITE;
/*!40000 ALTER TABLE `OFFERS` DISABLE KEYS */;

INSERT INTO `OFFERS` (`offer_id`, `task_id`, `chooser_id`, `is_accepted`)
VALUES
	(1,1,3,1),
	(2,2,1,0),
	(3,2,3,0),
	(4,4,5,0),
	(5,6,4,1),
	(6,10,6,1);

/*!40000 ALTER TABLE `OFFERS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table REPORT
# ------------------------------------------------------------

DROP TABLE IF EXISTS `REPORT`;

CREATE TABLE `REPORT` (
  `report_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL DEFAULT '',
  `report_category_id` int(3) unsigned NOT NULL,
  `reporter_id` int(11) unsigned NOT NULL,
  `defector_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `report_user_link` (`reporter_id`),
  KEY `report_user_link2` (`defector_id`),
  KEY `report_report_category_link` (`report_category_id`),
  CONSTRAINT `report_report_category_link` FOREIGN KEY (`report_category_id`) REFERENCES `REPORT_CATEGORY` (`category_id`),
  CONSTRAINT `report_user_link` FOREIGN KEY (`reporter_id`) REFERENCES `USER` (`user_id`),
  CONSTRAINT `report_user_link2` FOREIGN KEY (`defector_id`) REFERENCES `USER` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `REPORT` WRITE;
/*!40000 ALTER TABLE `REPORT` DISABLE KEYS */;

INSERT INTO `REPORT` (`report_id`, `description`, `report_category_id`, `reporter_id`, `defector_id`)
VALUES
	(1,'He asked me to buy him beer... Aint nobody got time fo that',8,2,5);

/*!40000 ALTER TABLE `REPORT` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table REPORT_CATEGORY
# ------------------------------------------------------------

DROP TABLE IF EXISTS `REPORT_CATEGORY`;

CREATE TABLE `REPORT_CATEGORY` (
  `category_id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL DEFAULT '',
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `REPORT_CATEGORY` WRITE;
/*!40000 ALTER TABLE `REPORT_CATEGORY` DISABLE KEYS */;

INSERT INTO `REPORT_CATEGORY` (`category_id`, `title`, `description`)
VALUES
	(1,'Incomplete Task','The user who offered you help did not fulfill his/her obligations in any way'),
	(2,'Unreasonably Late','The user who offered you help took an unreasonable amount of time to complete the task (Note: Only report a user when he/she was extremely late)'),
	(3,'Minimal Completion','The user who offered you help did not complete a significant portion of your task and, as a result, you do not feel compensation was justified'),
	(4,'Fake Profile','The account that offered you help is malicious account'),
	(5,'Spam','The user that offered you help contacted you as a means to promote an unrelated business or cause'),
	(6,'Harassment','The user that offered you help or the user you helped harassed you in any way. '),
	(7,'Offensive Profile','The user\'s profile contains offensive language or offensive images'),
	(8,'Illegal/Inappropriate Request','The activity requested is illegal/inappropriate');

/*!40000 ALTER TABLE `REPORT_CATEGORY` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table TASK
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TASK`;

CREATE TABLE `TASK` (
  `task_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `beggar_id` int(11) unsigned NOT NULL,
  `chooser_id` int(11) unsigned DEFAULT NULL,
  `short_description` varchar(36) NOT NULL DEFAULT '',
  `notes` varchar(200) DEFAULT '',
  `price` int(5) NOT NULL,
  `category_id` int(3) unsigned NOT NULL,
  `negotiable` tinyint(1) unsigned DEFAULT NULL,
  `bid_id` int(11) unsigned DEFAULT NULL,
  `time_frame_date` date DEFAULT NULL,
  `time_frame_time` time DEFAULT NULL,
  `is_complete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`task_id`),
  KEY `task_category_link` (`category_id`),
  KEY `task_user_link` (`chooser_id`),
  KEY `task_user_link2` (`beggar_id`),
  KEY `task_bid_link` (`bid_id`),
  CONSTRAINT `task_bid_link` FOREIGN KEY (`bid_id`) REFERENCES `BIDS` (`bid_id`),
  CONSTRAINT `task_category_link` FOREIGN KEY (`category_id`) REFERENCES `CATEGORY` (`category_id`),
  CONSTRAINT `task_user_link` FOREIGN KEY (`chooser_id`) REFERENCES `USER` (`user_id`),
  CONSTRAINT `task_user_link2` FOREIGN KEY (`beggar_id`) REFERENCES `USER` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `TASK` WRITE;
/*!40000 ALTER TABLE `TASK` DISABLE KEYS */;

INSERT INTO `TASK` (`task_id`, `beggar_id`, `chooser_id`, `short_description`, `notes`, `price`, `category_id`, `negotiable`, `bid_id`, `time_frame_date`, `time_frame_time`, `is_complete`)
VALUES
	(1,1,3,'I NEED TO MAKE BIG ORDAH','I need to place ordah of the sukadick chicken.',5,1,0,NULL,NULL,NULL,1),
	(2,2,NULL,'You need 2 clean dis shit AHP','2 Chahpstick.',12,4,0,NULL,NULL,NULL,0),
	(3,5,NULL,'Need a Burger!','In a study sesh @ Fondren. Hook me up...',5,1,0,NULL,NULL,NULL,0),
	(4,3,NULL,'Do mah laundry, Bitch','I have a giant bag of smelly socks that need tending to',10,5,0,NULL,NULL,NULL,0),
	(5,2,NULL,'Can I get a ride to Northpark?','I need to get a ride so I can get to an interview to become a janitor for Jamba Juice',7,2,0,NULL,NULL,NULL,0),
	(6,6,4,'My fridge is EMPTY','I need the following: Soap, Milk, Frozen Waffles, Condoms, Mike & Ikes, Ice Cream, and the biggest bag of potatoes you can buy.',8,3,0,NULL,NULL,NULL,0),
	(7,4,NULL,'My computer is broke?','Yea, so my screen is all blue and stuff. And like, IDK what to do...',10,7,0,NULL,NULL,NULL,0),
	(8,2,NULL,'Broken Faucet','So I was having some fun with a Theta last weekend and now my faucet is broken. Can someone help?',5,6,0,NULL,NULL,NULL,0),
	(9,5,NULL,'Party Clean-Up','Had a HUGE Beta part last night and the pledges are all too hungover to clean. Hook it up. Beta 4 Lyfe.',15,4,0,NULL,NULL,NULL,0),
	(10,3,6,'RED BULLLLLLL','I RAN OUT OF RED BULL. NEED MORE RED BULL. RED BULL!',5,3,0,NULL,NULL,NULL,0),
	(11,1,NULL,'Need a ride to Bumble-F%$# Nowhere','Got a speeding ticket on my way back from A&M and now I need a ride back for my court date.',25,2,0,NULL,NULL,NULL,0),
	(12,4,NULL,'My Printer doesn\'t work','I set up my printer to work over wifi but it stopped working. Help?',5,7,0,NULL,NULL,NULL,0),
	(13,6,NULL,'I only cahm for da lahnch','I need to place ordah for da lahnch. PLZ help.',5,1,0,NULL,NULL,NULL,0);

/*!40000 ALTER TABLE `TASK` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USER
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USER`;

CREATE TABLE `USER` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL DEFAULT '',
  `first_name` varchar(40) NOT NULL DEFAULT '',
  `last_name` varchar(40) NOT NULL DEFAULT '',
  `phone` varchar(14) DEFAULT '',
  `birth_date` date DEFAULT NULL,
  `gender` int(1) unsigned DEFAULT NULL,
  `times_reported` int(2) DEFAULT '0',
  `is_hidden` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `tokens` int(11) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;

INSERT INTO `USER` (`user_id`, `email`, `password`, `first_name`, `last_name`, `phone`, `birth_date`, `gender`, `times_reported`, `is_hidden`, `tokens`)
VALUES
	(1,'skaiser@smu.edu','password1','Spencer','Kaiser','3109249909','1989-12-22',1,0,0,10),
	(2,'acwells@smu.edu','password2','Austin','Wells','9855021061',NULL,1,0,0,9),
	(3,'calbright@smu.edu','password3','Charlie','Albright','2147292501','1993-10-06',1,0,0,8),
	(4,'wilsonjc@smu.edu','password4','Wilson','Wilson','7608093238','1993-11-14',1,0,0,6),
	(5,'cmdunn@smu.edu','password5','Rainman','Dunn','9548301911','1992-08-18',1,1,0,4),
	(6,'jcsilver@smu.edu','password6','Jordan','Silver','5125695357','1993-05-17',1,0,0,1);

/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USER_DATA
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USER_DATA`;

CREATE TABLE `USER_DATA` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `jobs_completed` int(11) unsigned NOT NULL,
  `jobs_requested` int(11) unsigned NOT NULL,
  `speed` int(100) unsigned DEFAULT NULL,
  `reliability` int(100) unsigned DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_data_user_link` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `USER_DATA` WRITE;
/*!40000 ALTER TABLE `USER_DATA` DISABLE KEYS */;

INSERT INTO `USER_DATA` (`user_id`, `jobs_completed`, `jobs_requested`, `speed`, `reliability`)
VALUES
	(1,0,1,87,78),
	(2,1,0,99,99),
	(3,4,7,75,89),
	(4,2,0,85,79),
	(5,0,0,99,65),
	(6,7,1,92,94);

/*!40000 ALTER TABLE `USER_DATA` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
