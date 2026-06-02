LOCK TABLES `digestion_amounts` WRITE;
/*!40000 ALTER TABLE `digestion_amounts` DISABLE KEYS */;
INSERT INTO `digestion_amounts` (`name`, `code`) VALUES ('Minder dan één keer per dag','less-than-once'),('Ongeveer één keer per dag ','about-once'),('Meer dan eens per dag','more-than-once'),('Onregelmatig','irregular');
/*!40000 ALTER TABLE `digestion_amounts` ENABLE KEYS */;
UNLOCK TABLES;