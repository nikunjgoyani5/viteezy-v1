LOCK TABLES `diet_types` WRITE;
/*!40000 ALTER TABLE `diet_types` DISABLE KEYS */;
INSERT INTO `diet_types` (`name`, `code`) VALUES ('Flexitarisch','flexitarian'),('Vegetarisch','vegetarian'),('Veganistisch','vegan'),('Geen voorkeur','no-preference');
/*!40000 ALTER TABLE `diet_types` ENABLE KEYS */;
UNLOCK TABLES;