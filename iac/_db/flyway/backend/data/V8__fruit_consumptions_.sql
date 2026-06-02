LOCK TABLES `fruit_consumptions` WRITE;
/*!40000 ALTER TABLE `fruit_consumptions` DISABLE KEYS */;
INSERT INTO `fruit_consumptions` (`name`) VALUES ('1 - 2'),('3 -4'),('5+'),('Geen');
/*!40000 ALTER TABLE `fruit_consumptions` ENABLE KEYS */;
UNLOCK TABLES;