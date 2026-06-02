UPDATE usage_goals SET code = 'resistance' WHERE code = 'resistence';
UPDATE children_wishs SET name = 'Nee' WHERE code = 'no';
UPDATE birth_healths SET name = 'Nee' WHERE code = 'no';

LOCK TABLES `primary_goals` WRITE;
/*!40000 ALTER TABLE `primary_goals` DISABLE KEYS */;
INSERT INTO `primary_goals` (`name`, `code`) VALUES ('Libido','libido');
/*!40000 ALTER TABLE `primary_goals` ENABLE KEYS */;
UNLOCK TABLES;