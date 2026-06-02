LOCK TABLES `vegetable_consumptions` WRITE;
/*!40000 ALTER TABLE `vegetable_consumptions` DISABLE KEYS */;
INSERT INTO `vegetable_consumptions` (`name`) VALUES ('0 -100'),('200 - 300'),('400 - 500'),('500+');
/*!40000 ALTER TABLE `vegetable_consumptions` ENABLE KEYS */;
UNLOCK TABLES;