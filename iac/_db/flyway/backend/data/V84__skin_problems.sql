LOCK TABLES `skin_problems` WRITE;
/*!40000 ALTER TABLE `skin_problems` DISABLE KEYS */;
INSERT INTO `skin_problems` (`name`, `code`) VALUES ('Acne','acne'),('Pigmentvlekken','pigment-spots'),('Rimpels','wrinkles'),('Elasticiteit','elasticity'),('Huidveroudering','skin-aging'),('Geen van bovenstaande','none');
/*!40000 ALTER TABLE `skin_problems` ENABLE KEYS */;
UNLOCK TABLES;