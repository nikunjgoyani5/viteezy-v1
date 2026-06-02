LOCK TABLES `hours_of_sleeps` WRITE;
/*!40000 ALTER TABLE `hours_of_sleeps` DISABLE KEYS */;
INSERT INTO `hours_of_sleeps` (`name`, `code`) VALUES ('0 - 4', 'zero-to-four'), ('5 - 6', 'five-to-six'), ('7 - 8', 'seven-to-eight'), ('8 - 9', 'eight-to-nine'), ('9 - 10', 'nine-to-ten'), ('10+', 'more-than-ten');
/*!40000 ALTER TABLE `hours_of_sleeps` ENABLE KEYS */;
UNLOCK TABLES;