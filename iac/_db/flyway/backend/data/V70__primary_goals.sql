LOCK TABLES `primary_goals` WRITE;
/*!40000 ALTER TABLE `primary_goals` DISABLE KEYS */;
INSERT INTO `primary_goals` (`name`, `code`) VALUES ('Slaap','sleep'),('Stress','stress'),('Energie','energy'),('Fitness','fitness'),('Spijsvertering','digestion'),('Huid','skin'),('Haar & nagels','hair-and-nails'),('Afvallen','weight-loose'),('Weerstand','resistence');
/*!40000 ALTER TABLE `primary_goals` ENABLE KEYS */;
UNLOCK TABLES;