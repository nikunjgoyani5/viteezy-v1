LOCK TABLES `transition_period_complaints` WRITE;
/*!40000 ALTER TABLE `transition_period_complaints` DISABLE KEYS */;
INSERT INTO `transition_period_complaints` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `transition_period_complaints` ENABLE KEYS */;
UNLOCK TABLES;