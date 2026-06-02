LOCK TABLES `training_intensivelys` WRITE;
/*!40000 ALTER TABLE `training_intensivelys` DISABLE KEYS */;
INSERT INTO `training_intensivelys` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `training_intensivelys` ENABLE KEYS */;
UNLOCK TABLES;