LOCK TABLES `menstruation_interval` WRITE;
/*!40000 ALTER TABLE `menstruation_interval` DISABLE KEYS */;
INSERT INTO `menstruation_interval` (`name`, `code`) VALUES ('Elke 2-3 weken', 'every-2-3-weeks'),('Elke 4 weken', 'every-4-weeks'),('Langer dan 4 weken','longer-than-4-weeks'),('Geen van bovenstaande', 'none');
/*!40000 ALTER TABLE `menstruation_interval` ENABLE KEYS */;
UNLOCK TABLES;