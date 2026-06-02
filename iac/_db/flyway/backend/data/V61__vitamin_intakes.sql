LOCK TABLES `vitamin_intakes` WRITE;
/*!40000 ALTER TABLE `vitamin_intakes` DISABLE KEYS */;
INSERT INTO `vitamin_intakes` (`name`,`code`) VALUES ('Geen','none'),('1 tot 3', 'one-to-three'),('5+','five-plus');
/*!40000 ALTER TABLE `vitamin_intakes` ENABLE KEYS */;
UNLOCK TABLES;