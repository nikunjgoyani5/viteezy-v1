LOCK TABLES `sleep_qualitys` WRITE;
/*!40000 ALTER TABLE `sleep_qualitys` DISABLE KEYS */;
INSERT INTO `sleep_qualitys` (`name`, `code`) VALUES ('Laag','low'),('Gemiddeld','average'),('Hoog','high');
/*!40000 ALTER TABLE `sleep_qualitys` ENABLE KEYS */;
UNLOCK TABLES;