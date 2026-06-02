LOCK TABLES `diet_intolerances` WRITE;
/*!40000 ALTER TABLE `diet_intolerances` DISABLE KEYS */;
INSERT INTO `diet_intolerances` (`name`, `code`) VALUES ('Lactose vrij','lactose-free'),('Gluten-vrij','gluten-free'),('Paleo','paleo'),('Geen voorkeur','no-preference');
/*!40000 ALTER TABLE `diet_intolerances` ENABLE KEYS */;
UNLOCK TABLES;