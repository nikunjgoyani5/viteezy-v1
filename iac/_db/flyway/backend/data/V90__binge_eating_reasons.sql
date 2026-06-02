LOCK TABLES `binge_eating_reasons` WRITE;
/*!40000 ALTER TABLE `binge_eating_reasons` DISABLE KEYS */;
INSERT INTO `binge_eating_reasons` (`name`, `code`) VALUES ('Emotie','emotion'),('Zwangerschap','pregnancy'),('Stress','stress'),('Menstruatie','period');
/*!40000 ALTER TABLE `binge_eating_reasons` ENABLE KEYS */;
UNLOCK TABLES;