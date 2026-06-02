LOCK TABLES `stress_level_at_end_of_days` WRITE;
/*!40000 ALTER TABLE `stress_level_at_end_of_days` DISABLE KEYS */;
INSERT INTO `stress_level_at_end_of_days` (`name`, `code`) VALUES ('Hyper','hyper'),('Opgebrand','burnt-out');
/*!40000 ALTER TABLE `stress_level_at_end_of_days` ENABLE KEYS */;
UNLOCK TABLES;