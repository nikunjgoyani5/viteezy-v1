LOCK TABLES `sport_amounts` WRITE;
/*!40000 ALTER TABLE `sport_amounts` DISABLE KEYS */;
INSERT INTO `sport_amounts` (`name`, `code`) VALUES ('Nauwelijks','almost-never'),('Twee tot vier keer','two-to-four'),('Vijf keer of meer','five-or-more');
/*!40000 ALTER TABLE `sport_amounts` ENABLE KEYS */;
UNLOCK TABLES;