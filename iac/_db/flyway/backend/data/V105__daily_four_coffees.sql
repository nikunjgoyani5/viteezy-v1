LOCK TABLES `daily_four_coffees` WRITE;
/*!40000 ALTER TABLE `daily_four_coffees` DISABLE KEYS */;
INSERT INTO `daily_four_coffees` (`name`, `code`) VALUES ('Ja','yes'),('Nee','nee');
/*!40000 ALTER TABLE `daily_four_coffees` ENABLE KEYS */;
UNLOCK TABLES;