LOCK TABLES `amount_of_meat_consumptions` WRITE;
/*!40000 ALTER TABLE `amount_of_meat_consumptions` DISABLE KEYS */;
INSERT INTO `amount_of_meat_consumptions` (`name`, `code`) VALUES ('Nooit','never'),('Eén of twee keer','one-or-two'),('Drie keer of meer','three-or-more');
/*!40000 ALTER TABLE `amount_of_meat_consumptions` ENABLE KEYS */;
UNLOCK TABLES;