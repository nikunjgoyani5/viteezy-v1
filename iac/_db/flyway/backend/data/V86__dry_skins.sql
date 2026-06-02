LOCK TABLES `dry_skins` WRITE;
/*!40000 ALTER TABLE `dry_skins` DISABLE KEYS */;
INSERT INTO `dry_skins` (`name`, `code`) VALUES ('Ja','yes'),('Nee','no');
/*!40000 ALTER TABLE `dry_skins` ENABLE KEYS */;
UNLOCK TABLES;