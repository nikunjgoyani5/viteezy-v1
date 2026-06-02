LOCK TABLES `find_us` WRITE;
/*!40000 ALTER TABLE `find_us` DISABLE KEYS */;
INSERT INTO `find_us` (`name`, `code`) VALUES ('Facebook','facebook'),('Instagram','instagram'),('Mond tot mond','mouth'),('Personal Trainer','personal-trainer'),('Media','media'),('Online','online'),('Overige','other');
/*!40000 ALTER TABLE `find_us` ENABLE KEYS */;
UNLOCK TABLES;