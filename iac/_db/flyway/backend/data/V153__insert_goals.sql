LOCK TABLES `usage_goals` WRITE;
/*!40000 ALTER TABLE `usage_goals` DISABLE KEYS */;
INSERT INTO `usage_goals` (`name`, `code`) VALUES ('Brein', 'brain'),('Menstruatie', 'menstruation');
/*!40000 ALTER TABLE `usage_goals` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `primary_goals` WRITE;
/*!40000 ALTER TABLE `primary_goals` DISABLE KEYS */;
INSERT INTO `primary_goals` (`name`, `code`) VALUES ('Brein', 'brain'),('Menstruatie', 'menstruation');
/*!40000 ALTER TABLE `primary_goals` ENABLE KEYS */;
UNLOCK TABLES;