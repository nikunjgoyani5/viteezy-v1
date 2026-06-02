LOCK TABLES `used_supplements` WRITE;
/*!40000 ALTER TABLE `used_supplements` DISABLE KEYS */;
INSERT INTO `used_supplements` (`name`) VALUES ('Protein'),('Vitamines'),('Mineralen'),('Overige'),('Nog nooit');
/*!40000 ALTER TABLE `used_supplements` ENABLE KEYS */;
UNLOCK TABLES;