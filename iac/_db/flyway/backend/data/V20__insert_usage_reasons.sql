LOCK TABLES `usage_reasons` WRITE;
/*!40000 ALTER TABLE `usage_reasons` DISABLE KEYS */;
INSERT INTO `usage_reasons` (`name`, `code`) VALUES ('Afvallen', 'weight-loose'), ('Maaltijdvervanger', 'meal-replacement'), ('Spieropbouw', 'muscle-building'), ('Spieronderhoud', 'muscle-maintenance'), ('Breder worden', 'getting-wider'), ('Herstellen na trainen', 'recover-after-training'), ('Sportprestaties verbeteren', 'improve-sport-performance'), ('Toename caloriën', 'increase-calories'), ('Meer energie', 'more-energy'), ('Stress verminderen', 'reduce-stress'), ('Vitamine toename', 'vitamine-increase'), ('Huid verzorgen', 'skin-care');
/*!40000 ALTER TABLE `usage_reasons` ENABLE KEYS */;
UNLOCK TABLES;