LOCK TABLES `amount_of_training` WRITE;
/*!40000 ALTER TABLE `amount_of_training` DISABLE KEYS */;
INSERT INTO `amount_of_training` (`name`) VALUES ('1 - 2'),('2 - 3'),('4+'),('Ik train niet');
/*!40000 ALTER TABLE `amount_of_training` ENABLE KEYS */;
UNLOCK TABLES;