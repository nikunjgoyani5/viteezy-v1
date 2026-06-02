LOCK TABLES `stress_levels` WRITE;
/*!40000 ALTER TABLE `stress_levels` DISABLE KEYS */;
INSERT INTO `stress_levels` (`name`, `code`) VALUES ('Weinig','low'),('Normaal','average'),('Veel','high');
/*!40000 ALTER TABLE `stress_levels` ENABLE KEYS */;
UNLOCK TABLES;