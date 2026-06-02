LOCK TABLES `fish_consumptions` WRITE;
/*!40000 ALTER TABLE `fish_consumptions` DISABLE KEYS */;
INSERT INTO `fish_consumptions` (`name`,`code`) VALUES ('Nooit of nauwelijks','never-or-almost-never'),('1 keer', 'one'),('2 of meer','two-or-more');
/*!40000 ALTER TABLE `fish_consumptions` ENABLE KEYS */;
UNLOCK TABLES;