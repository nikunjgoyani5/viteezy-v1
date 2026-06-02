LOCK TABLES `stress_level_conditions` WRITE;
/*!40000 ALTER TABLE `stress_level_conditions` DISABLE KEYS */;
INSERT INTO `stress_level_conditions` (`name`, `code`) VALUES ('Kortademig','short-of-breath'),('Last van je spieren','problems-with-muscles'),('Slaapproblemen','sleep-problems'),('Buikpijn','stomach-ache'),('Hoofdpijn','headache'),('Hartkloppingen','palpitations'),('Anders','other');
/*!40000 ALTER TABLE `stress_level_conditions` ENABLE KEYS */;
UNLOCK TABLES;