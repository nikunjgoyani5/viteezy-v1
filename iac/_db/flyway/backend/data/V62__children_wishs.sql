LOCK TABLES `children_wishs` WRITE;
/*!40000 ALTER TABLE `children_wishs` DISABLE KEYS */;
INSERT INTO `children_wishs` (`name`, `code`) VALUES ('Ja','yes'),('No', 'no');
/*!40000 ALTER TABLE `children_wishs` ENABLE KEYS */;
UNLOCK TABLES;