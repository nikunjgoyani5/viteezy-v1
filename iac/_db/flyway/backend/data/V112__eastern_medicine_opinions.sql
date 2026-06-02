LOCK TABLES `eastern_medicine_opinions` WRITE;
/*!40000 ALTER TABLE `eastern_medicine_opinions` DISABLE KEYS */;
INSERT INTO `eastern_medicine_opinions` (`name`, `code`) VALUES ('Ik ben overtuigd','convinced'),('Ik sta ervoor open','open-minded'),('Ik ben skeptisch','skeptical');
/*!40000 ALTER TABLE `eastern_medicine_opinions` ENABLE KEYS */;
UNLOCK TABLES;