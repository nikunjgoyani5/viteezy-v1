LOCK TABLES `hair_types` WRITE;
/*!40000 ALTER TABLE `hair_types` DISABLE KEYS */;
INSERT INTO `hair_types` (`name`, `code`) VALUES ('Dunner aan het worden','getting-thinner'),('Droog','dry'),('Beschadigd ','damaged'),('Langzaam groeiend','slow-growing'),('Geen van bovenstaande','none');
/*!40000 ALTER TABLE `hair_types` ENABLE KEYS */;
UNLOCK TABLES;