LOCK TABLES `nail_improvements` WRITE;
/*!40000 ALTER TABLE `nail_improvements` DISABLE KEYS */;
INSERT INTO `nail_improvements` (`name`, `code`) VALUES ('Sterkte','power'),('Lengte','length'),('Conditie','condition'),('Geen van bovenstaande','none');
/*!40000 ALTER TABLE `nail_improvements` ENABLE KEYS */;
UNLOCK TABLES;