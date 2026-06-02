LOCK TABLES `thirty_minutes_of_suns` WRITE;
/*!40000 ALTER TABLE `thirty_minutes_of_suns` DISABLE KEYS */;
INSERT INTO `thirty_minutes_of_suns` (`name`,`code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `thirty_minutes_of_suns` ENABLE KEYS */;
UNLOCK TABLES;