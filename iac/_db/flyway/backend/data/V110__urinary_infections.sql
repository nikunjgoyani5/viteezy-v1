LOCK TABLES `urinary_infections` WRITE;
/*!40000 ALTER TABLE `urinary_infections` DISABLE KEYS */;
INSERT INTO `urinary_infections` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `urinary_infections` ENABLE KEYS */;
UNLOCK TABLES;