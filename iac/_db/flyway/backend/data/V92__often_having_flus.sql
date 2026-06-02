LOCK TABLES `often_having_flus` WRITE;
/*!40000 ALTER TABLE `often_having_flus` DISABLE KEYS */;
INSERT INTO `often_having_flus` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `often_having_flus` ENABLE KEYS */;
UNLOCK TABLES;