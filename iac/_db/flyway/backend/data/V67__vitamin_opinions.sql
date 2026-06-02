LOCK TABLES `vitamin_opinions` WRITE;
/*!40000 ALTER TABLE `vitamin_opinions` DISABLE KEYS */;
INSERT INTO `vitamin_opinions` (`name`, `code`) VALUES ('Goed geïnformeerd','well-informed'),('Nieuwsgierig','curious'),('Skeptisch','skeptical');
/*!40000 ALTER TABLE `vitamin_opinions` ENABLE KEYS */;
UNLOCK TABLES;