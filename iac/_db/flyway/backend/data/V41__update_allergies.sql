LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` (`name`,`code`) VALUES ('Vis','fish'),('Schaal- en schelpdieren', 'shellfish');
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;