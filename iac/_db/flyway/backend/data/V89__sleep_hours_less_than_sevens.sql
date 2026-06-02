LOCK TABLES `sleep_hours_less_than_sevens` WRITE;
/*!40000 ALTER TABLE `sleep_hours_less_than_sevens` DISABLE KEYS */;
INSERT INTO `sleep_hours_less_than_sevens` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `sleep_hours_less_than_sevens` ENABLE KEYS */;
UNLOCK TABLES;