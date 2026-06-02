LOCK TABLES `amount_of_protein_consumptions` WRITE;
/*!40000 ALTER TABLE `amount_of_protein_consumptions` DISABLE KEYS */;
INSERT INTO `amount_of_protein_consumptions` (`name`, `code`) VALUES ('Nauwelijks','barely'),('Eén keer','once'),('Twee keer of meer','twice-or-more');
/*!40000 ALTER TABLE `amount_of_protein_consumptions` ENABLE KEYS */;
UNLOCK TABLES;