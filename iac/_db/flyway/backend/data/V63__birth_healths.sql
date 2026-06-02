LOCK TABLES `birth_healths` WRITE;
/*!40000 ALTER TABLE `birth_healths` DISABLE KEYS */;
INSERT INTO `birth_healths` (`name`, `code`) VALUES ('Ja','yes'),('No', 'no');
/*!40000 ALTER TABLE `birth_healths` ENABLE KEYS */;
UNLOCK TABLES;