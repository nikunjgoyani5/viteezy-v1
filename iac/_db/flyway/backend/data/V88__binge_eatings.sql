LOCK TABLES `binge_eatings` WRITE;
/*!40000 ALTER TABLE `binge_eatings` DISABLE KEYS */;
INSERT INTO `binge_eatings` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `binge_eatings` ENABLE KEYS */;
UNLOCK TABLES;