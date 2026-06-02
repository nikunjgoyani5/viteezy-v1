LOCK TABLES `mental_fitness` WRITE;
/*!40000 ALTER TABLE `mental_fitness` DISABLE KEYS */;
INSERT INTO `mental_fitness` (`name`, `code`) VALUES ('Gebrek aan motivatie', 'lack-of-motivation'),('Neerslachtigheid','dejection'),('Piekeren','worry'),('Angst gevoelens','fear-feelings'),('Geen van bovenstaande','none');
/*!40000 ALTER TABLE `mental_fitness` ENABLE KEYS */;
UNLOCK TABLES;