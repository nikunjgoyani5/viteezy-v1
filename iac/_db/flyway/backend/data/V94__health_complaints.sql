LOCK TABLES `health_complaints` WRITE;
/*!40000 ALTER TABLE `health_complaints` DISABLE KEYS */;
INSERT INTO `health_complaints` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `health_complaints` ENABLE KEYS */;
UNLOCK TABLES;