LOCK TABLES `iron_prescribeds` WRITE;
/*!40000 ALTER TABLE `iron_prescribeds` DISABLE KEYS */;
INSERT INTO `iron_prescribeds` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `iron_prescribeds` ENABLE KEYS */;
UNLOCK TABLES;