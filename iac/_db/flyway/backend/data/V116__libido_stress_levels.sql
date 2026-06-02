LOCK TABLES `libido_stress_levels` WRITE;
/*!40000 ALTER TABLE `libido_stress_levels` DISABLE KEYS */;
INSERT INTO `libido_stress_levels` (`name`, `code`) VALUES ('Laag','low'),('Gemiddeld','average'),('Hoog','high');
/*!40000 ALTER TABLE `libido_stress_levels` ENABLE KEYS */;
UNLOCK TABLES;