LOCK TABLES `type_of_trainings` WRITE;
/*!40000 ALTER TABLE `type_of_trainings` DISABLE KEYS */;
INSERT INTO `type_of_trainings` (`name`, `code`) VALUES ('Krachtbevorderend','strengthening'),('Hoge intensiteit','high-intensity'),('Uithoudingsvermogen','endurance'),('Flexibiliteit','flexibility'),('Geen van bovenstaande','none-of-the-above');
/*!40000 ALTER TABLE `type_of_trainings` ENABLE KEYS */;
UNLOCK TABLES;