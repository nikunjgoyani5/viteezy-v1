LOCK TABLES `body_type_targets` WRITE;
/*!40000 ALTER TABLE `body_type_targets` DISABLE KEYS */;
INSERT INTO `body_type_targets` (`name`, `code`) VALUES ('Mager','thin'), ('Slank','slim'), ('Gespierd','muscular'), ('Stevig','solid'), ('Zwaar','heavy');
/*!40000 ALTER TABLE `body_type_targets` ENABLE KEYS */;
UNLOCK TABLES;