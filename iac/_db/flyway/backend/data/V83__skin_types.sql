LOCK TABLES `skin_types` WRITE;
/*!40000 ALTER TABLE `skin_types` DISABLE KEYS */;
INSERT INTO `skin_types` (`name`, `code`) VALUES ('Droog','dry'),('Vet','fat'),('Onrustig','restless'),('Dof','dull'),('Best prima','pretty-fine');
/*!40000 ALTER TABLE `skin_types` ENABLE KEYS */;
UNLOCK TABLES;