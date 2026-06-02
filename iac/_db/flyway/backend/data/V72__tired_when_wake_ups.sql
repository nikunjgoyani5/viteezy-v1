LOCK TABLES `tired_when_wake_ups` WRITE;
/*!40000 ALTER TABLE `tired_when_wake_ups` DISABLE KEYS */;
INSERT INTO `tired_when_wake_ups` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `tired_when_wake_ups` ENABLE KEYS */;
UNLOCK TABLES;