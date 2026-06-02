LOCK TABLES `trouble_falling_asleeps` WRITE;
/*!40000 ALTER TABLE `trouble_falling_asleeps` DISABLE KEYS */;
INSERT INTO `trouble_falling_asleeps` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `trouble_falling_asleeps` ENABLE KEYS */;
UNLOCK TABLES;