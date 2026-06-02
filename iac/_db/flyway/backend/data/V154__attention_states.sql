LOCK TABLES `attention_states` WRITE;
/*!40000 ALTER TABLE `attention_states` DISABLE KEYS */;
INSERT INTO `attention_states` (`name`, `code`) VALUES ('Moeite met focus','difficulty-with-focus'),('Gebrek aan concentratie','lack-of-concentration'),('Niet op woorden kunnen komen','cant-come-up-with-words'),('Vergeetachtigheid', 'forgetfulness'),('Geen van bovenstaande', 'none');
/*!40000 ALTER TABLE `attention_states` ENABLE KEYS */;
UNLOCK TABLES;