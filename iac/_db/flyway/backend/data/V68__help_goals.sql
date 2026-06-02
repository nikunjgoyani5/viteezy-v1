LOCK TABLES `help_goals` WRITE;
/*!40000 ALTER TABLE `help_goals` DISABLE KEYS */;
INSERT INTO `help_goals` (`name`,`code`) VALUES ('Een specifiek doel ','specific-goal'),('Algehele gezondheid','total-health'),('Ontdekken','discover');
/*!40000 ALTER TABLE `help_goals` ENABLE KEYS */;
UNLOCK TABLES;