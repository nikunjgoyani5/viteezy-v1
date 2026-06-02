LOCK TABLES `present_at_crowded_places` WRITE;
/*!40000 ALTER TABLE `present_at_crowded_places` DISABLE KEYS */;
INSERT INTO `present_at_crowded_places` (`name`, `code`) VALUES ('Ja','yes'),('No','no');
/*!40000 ALTER TABLE `present_at_crowded_places` ENABLE KEYS */;
UNLOCK TABLES;