LOCK TABLES `lack_of_concentrations` WRITE;
/*!40000 ALTER TABLE `lack_of_concentrations` DISABLE KEYS */;
INSERT INTO `lack_of_concentrations` (`name`, `code`) VALUES ('Ja','yes'),('Nee', 'no');
/*!40000 ALTER TABLE `lack_of_concentrations` ENABLE KEYS */;
UNLOCK TABLES;