LOCK TABLES `sport_reasons` WRITE;
/*!40000 ALTER TABLE `sport_reasons` DISABLE KEYS */;
INSERT INTO `sport_reasons` (`name`, `code`) VALUES ('Prestatiegericht','performance-oriented'),('Lekker zweten','good-sweat'),('Spieren onderhouden','muscle-maintenance'),('Spieren opbouwen','build-muscle'),('Algehele gezondheid','overall-health');
/*!40000 ALTER TABLE `sport_reasons` ENABLE KEYS */;
UNLOCK TABLES;