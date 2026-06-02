LOCK TABLES `pregnancies` WRITE;
/*!40000 ALTER TABLE `pregnancies` DISABLE KEYS */;
INSERT INTO `pregnancies` (`name`) VALUES ('Zwanger'),('Borstvoeding'),('Geen van beide');
/*!40000 ALTER TABLE `pregnancies` ENABLE KEYS */;
UNLOCK TABLES;