LOCK TABLES `energy_levels` WRITE;
/*!40000 ALTER TABLE `energy_levels` DISABLE KEYS */;
INSERT INTO `energy_levels` (`name`, `code`) VALUES ('Slap', 'very-weak'),('Kan beter', 'weak'),('Okay','average'),('Goed','good'),('Super','very-good');
/*!40000 ALTER TABLE `energy_levels` ENABLE KEYS */;
UNLOCK TABLES;