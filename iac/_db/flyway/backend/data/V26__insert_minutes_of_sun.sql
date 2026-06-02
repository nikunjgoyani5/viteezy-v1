LOCK TABLES `minutes_of_suns` WRITE;
/*!40000 ALTER TABLE `minutes_of_suns` DISABLE KEYS */;
INSERT INTO `minutes_of_suns` (`name`, `code`) VALUES ('0 - 5', 'zero-to-five'),('5 - 10','five-to-ten'),('20 - 30','twenty-to-thirty'),('30 - 45','thirty-to-forty-five'),('45+','forty-five-plus');
/*!40000 ALTER TABLE `minutes_of_suns` ENABLE KEYS */;
UNLOCK TABLES;