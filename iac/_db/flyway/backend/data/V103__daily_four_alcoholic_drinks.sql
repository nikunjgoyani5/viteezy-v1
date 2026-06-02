LOCK TABLES `daily_four_alcoholic_drinks` WRITE;
/*!40000 ALTER TABLE `daily_four_alcoholic_drinks` DISABLE KEYS */;
INSERT INTO `daily_four_alcoholic_drinks` (`name`,`code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `daily_four_alcoholic_drinks` ENABLE KEYS */;
UNLOCK TABLES;