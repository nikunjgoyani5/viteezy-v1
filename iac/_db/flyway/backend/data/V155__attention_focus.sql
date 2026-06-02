LOCK TABLES `attention_focus` WRITE;
/*!40000 ALTER TABLE `attention_focus` DISABLE KEYS */;
INSERT INTO `attention_focus` (`name`, `code`) VALUES ('Scherp blijven', 'stay-sharp'),('Geheugen','memory'),('Mentale fitheid','mental-fitness'),('Concentratie','concentration');
/*!40000 ALTER TABLE `attention_focus` ENABLE KEYS */;
UNLOCK TABLES;