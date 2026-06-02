LOCK TABLES `weekly_eight_alcoholic_drinks` WRITE;
/*!40000 ALTER TABLE `weekly_eight_alcoholic_drinks` DISABLE KEYS */;
INSERT INTO `weekly_eight_alcoholic_drinks` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `weekly_eight_alcoholic_drinks` ENABLE KEYS */;
UNLOCK TABLES;