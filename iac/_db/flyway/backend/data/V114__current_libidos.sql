LOCK TABLES `current_libidos` WRITE;
/*!40000 ALTER TABLE `current_libidos` DISABLE KEYS */;
INSERT INTO `current_libidos` (`name`, `code`) VALUES ('Laag','low'),('Gemiddeld','average'),('Hoog','high');
/*!40000 ALTER TABLE `current_libidos` ENABLE KEYS */;
UNLOCK TABLES;