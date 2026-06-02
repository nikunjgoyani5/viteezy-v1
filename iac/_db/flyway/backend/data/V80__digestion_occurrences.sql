LOCK TABLES `digestion_occurrences` WRITE;
/*!40000 ALTER TABLE `digestion_occurrences` DISABLE KEYS */;
INSERT INTO `digestion_occurrences` (`name`, `code`) VALUES ('Winderigheid','flatulence'),('Opgeblazen gevoel','bloated-feeling'),('Boeren','burp'),('Slechte spijsvertering','bad-digestion'),('Geen van bovenstaande','none');
/*!40000 ALTER TABLE `digestion_occurrences` ENABLE KEYS */;
UNLOCK TABLES;