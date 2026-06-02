LOCK TABLES `lose_weight_challenges` WRITE;
/*!40000 ALTER TABLE `lose_weight_challenges` DISABLE KEYS */;
INSERT INTO `lose_weight_challenges` (`name`, `code`) VALUES ('Beweging','movement'),('Algehele voeding','overall-nutrition'),('Tussendoortjes','snacks'),('Discipline','discipline'),('Onvoldoende kennis','insufficient-knowledge'),('Zwangerschapskilo\'s','pregnancy-kilos'),('Menopauze','menopause'),('Geen van bovenstaande','none');
/*!40000 ALTER TABLE `lose_weight_challenges` ENABLE KEYS */;
UNLOCK TABLES;