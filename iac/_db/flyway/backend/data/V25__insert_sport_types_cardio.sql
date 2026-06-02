LOCK TABLES `sport_types` WRITE;
/*!40000 ALTER TABLE `sport_types` DISABLE KEYS */;
INSERT INTO `sport_types` (`name`, `code`) VALUES ('Cardio', 'cardio');
/*!40000 ALTER TABLE `sport_types` ENABLE KEYS */;
UNLOCK TABLES;