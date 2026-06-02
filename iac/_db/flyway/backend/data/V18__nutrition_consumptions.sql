LOCK TABLES `nutrition_consumptions` WRITE;
/*!40000 ALTER TABLE `nutrition_consumptions` DISABLE KEYS */;
INSERT INTO `nutrition_consumptions` (`name`, `code`) VALUES ('Na het opstaan', 'after-wake-up'),('Voor het trainen', 'before-training'),('Tijdens het trainen', 'during-training'),('Na het trainen', 'after-training'),('Voor het slapen', 'before-sleeping'),('Wanneer ik zin heb', 'other');
/*!40000 ALTER TABLE `nutrition_consumptions` ENABLE KEYS */;
UNLOCK TABLES;