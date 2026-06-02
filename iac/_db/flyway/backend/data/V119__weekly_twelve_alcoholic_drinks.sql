LOCK TABLES `weekly_twelve_alcoholic_drinks` WRITE;
/*!40000 ALTER TABLE `weekly_twelve_alcoholic_drinks` DISABLE KEYS */;
INSERT INTO `weekly_twelve_alcoholic_drinks` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `weekly_twelve_alcoholic_drinks` ENABLE KEYS */;
UNLOCK TABLES;