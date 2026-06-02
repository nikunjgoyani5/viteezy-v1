LOCK TABLES `usage_goals` WRITE;
/*!40000 ALTER TABLE `usage_goals` DISABLE KEYS */;
INSERT INTO `usage_goals` (`name`, `code`) VALUES ('Slaap','sleep'),('Stress','stress'),('Energie','energy'),('Fitness','fitness'),('Spijsvertering','digestion'),('Huid','skin'),('Haar & nagels','hair-and-nails'),('Afvallen','weight-loose'),('Weerstand','resistence'),('Libido','libido');
/*!40000 ALTER TABLE `usage_goals` ENABLE KEYS */;
UNLOCK TABLES;