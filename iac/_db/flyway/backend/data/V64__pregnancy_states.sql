LOCK TABLES `pregnancy_states` WRITE;
/*!40000 ALTER TABLE `pregnancy_states` DISABLE KEYS */;
INSERT INTO `pregnancy_states` (`name`, `code`) VALUES ('Ik wil in de aankomende twee jaar zwanger worden', 'pregnant-in-two-years'),('Ik ben zwanger', 'pregnant'),('Ik geef borstvoeding', 'breastfeeding');
/*!40000 ALTER TABLE `pregnancy_states` ENABLE KEYS */;
UNLOCK TABLES;