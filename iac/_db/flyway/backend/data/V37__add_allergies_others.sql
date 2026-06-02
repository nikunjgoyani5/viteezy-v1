LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` (`name`, `code`) VALUES ('Anders','other');
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;