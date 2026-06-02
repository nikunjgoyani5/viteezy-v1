LOCK TABLES `healthy_lifestyles` WRITE;
/*!40000 ALTER TABLE `healthy_lifestyles` DISABLE KEYS */;
INSERT INTO `healthy_lifestyles` (`name`, `code`) VALUES ('Al een lange tijd goed bezig','doing-well'),('Lekker op weg','nice-on-the-road'),('Klaar om te beginnen','ready-to-go');
/*!40000 ALTER TABLE `healthy_lifestyles` ENABLE KEYS */;
UNLOCK TABLES;