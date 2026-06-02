LOCK TABLES `acne_places` WRITE;
/*!40000 ALTER TABLE `acne_places` DISABLE KEYS */;
INSERT INTO `acne_places` (`name`, `code`) VALUES ('Kin of kaaklijn','chin-or-jawline'),('Borst of rug','chest-or-back'),('Wangen, neus of voorhoofd','cheeks-nose-or-forehead'),('Geen van bovenstaande','none');
/*!40000 ALTER TABLE `acne_places` ENABLE KEYS */;
UNLOCK TABLES;