LOCK TABLES `sport_types` WRITE;
/*!40000 ALTER TABLE `sport_types` DISABLE KEYS */;
INSERT INTO `sport_types` (`name`) VALUES ('Krachttraining'),('Yoga'),('Roeien'),('Rugby'),('Cricket'),('Voetbal'),('Tennis'),('Hockey'),('Golf'),('Hardlopen'),('Anders');
/*!40000 ALTER TABLE `sport_types` ENABLE KEYS */;
UNLOCK TABLES;