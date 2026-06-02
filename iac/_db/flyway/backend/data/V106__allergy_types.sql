LOCK TABLES `allergy_types` WRITE;
/*!40000 ALTER TABLE `allergy_types` DISABLE KEYS */;
INSERT INTO `allergy_types` (`name`, `code`) VALUES ('Geen','none'),('Melk','milk'),('Ei','egg'),('Vis','fish'),('Schaal- en schelpdieren','shellfish'),('Pinda','peanut'),('Noten','nuts'),('Soya','soy'),('Gluten','gluten'),('Tarwe','wheat'),('Hooikoorts','hay-fever');
/*!40000 ALTER TABLE `allergy_types` ENABLE KEYS */;
UNLOCK TABLES;