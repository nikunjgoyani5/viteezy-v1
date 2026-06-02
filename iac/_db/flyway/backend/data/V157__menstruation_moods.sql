LOCK TABLES `menstruation_moods` WRITE;
/*!40000 ALTER TABLE `menstruation_moods` DISABLE KEYS */;
INSERT INTO `menstruation_moods` (`name`, `code`) VALUES ('Stemmingswisselingen','mood-swings'),('Futloos','lifeless'),('Prikkelbaar', 'irritable'),('Gespannen', 'tense'),('Geen van bovenstaande', 'none');
/*!40000 ALTER TABLE `menstruation_moods` ENABLE KEYS */;
UNLOCK TABLES;