LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` (`name`, `code`, `description`, `is_a_flavour`, `is_active`) VALUES
    ('Gut Support', 'gut-support', 'probiotica', false, true),
    ('Brain Boost', 'brain-boost', 'B-Complex', false, true),
    ('Hormone Control', 'hormone-control', 'PMS', false, true);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;