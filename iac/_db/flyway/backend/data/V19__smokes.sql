LOCK TABLES `smokes` WRITE;
/*!40000 ALTER TABLE `smokes` DISABLE KEYS */;
INSERT INTO `smokes` (`name`, `code`) VALUES ('Ja','smoking'),('Nee','non-smoking');
/*!40000 ALTER TABLE `smokes` ENABLE KEYS */;
UNLOCK TABLES;