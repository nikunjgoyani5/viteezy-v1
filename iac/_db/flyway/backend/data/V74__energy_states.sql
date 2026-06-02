LOCK TABLES `energy_states` WRITE;
/*!40000 ALTER TABLE `energy_states` DISABLE KEYS */;
INSERT INTO `energy_states` (`name`, `code`) VALUES ('Ben ik de hele dag futloos','lifeless'),('Heb ik vaak een middag dip','afternoon-dip'),('Heb ik veel pieken en dalen','peaks-and-troughs');
/*!40000 ALTER TABLE `energy_states` ENABLE KEYS */;
UNLOCK TABLES;