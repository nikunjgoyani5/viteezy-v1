LOCK TABLES `medications` WRITE;
/*!40000 ALTER TABLE `medications` DISABLE KEYS */;
INSERT INTO `medications` (`name`,`code`) VALUES ('Bloedverdunners','blood-thinners'),('Maagzuurbinders', 'heartburners'),('Bètablokkers','beta-blockers'),('Geen','none');
/*!40000 ALTER TABLE `medications` ENABLE KEYS */;
UNLOCK TABLES;