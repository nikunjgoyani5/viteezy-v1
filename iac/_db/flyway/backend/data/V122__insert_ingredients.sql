LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` (`name`, `code`, `description`, `is_a_flavour`, `is_active`) VALUES
    ('Slaap formule', 'sleep-formula', 'sleep-formula', false, false),
    ('Energie formule', 'energy-formula', 'energy-formula', false, false),
    ('Stress formule', 'stress-formula', 'stress-formula', false, false),
    ('Prenatal multi', 'prenatal-multi', 'prenatal-multi', false, false),
    ('Detox formule', 'detox-formula', 'detox-formula', false, false),
    ('Haar & nagel formule', 'hair-and-nail-formula', 'hair-and-nail-formula', false, false),
    ('Huid formule', 'skin-formula', 'skin-formula', false, false),
    ('Libido formule', 'libido-formula', 'libido-formula', false, false),
    ('Probiotica', 'probiotica', 'probiotica', false, false);
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;