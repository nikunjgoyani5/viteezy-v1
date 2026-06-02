LOCK TABLES `average_sleeping_hours` WRITE;
/*!40000 ALTER TABLE `average_sleeping_hours` DISABLE KEYS */;
INSERT INTO `average_sleeping_hours` (`name`, `code`) VALUES ('7 uur of meer','seven-or-more'),('Minder dan 7 uur','less-than-seven'),('Minder dan 5 uur','less-than-five');
/*!40000 ALTER TABLE `average_sleeping_hours` ENABLE KEYS */;
UNLOCK TABLES;