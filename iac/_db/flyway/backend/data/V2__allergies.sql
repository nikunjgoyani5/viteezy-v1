LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` (`name`) VALUES ('Gluten'),('Lactose'),('Soya'),('Zuivel'),('Vegan'),('Vegetarisch'),('Ketogeen'),('Geen');
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;