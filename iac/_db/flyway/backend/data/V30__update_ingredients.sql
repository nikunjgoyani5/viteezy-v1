LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` (`name`, `code`, `description`) VALUES
    ('Kurkuma', 'kurkuma', 'kurkuma'),
    ('Rode rijst extract', 'red-rice-extract', 'rode-rijst-extract'),
    ('Omega 3 krill olie', 'omega-three-krill-oil', 'omega-three-krill-olie'),
    ('Omega 3 vegan', 'omega-three-vegan', 'omega-three-vegan'),
    ('Cranberry', 'cranberry', 'veenbes'),
    ('Whey protein', 'whey-protein', 'whey-protein'),
    ('Vegan Eiwitten', 'vegan-protein', 'vegan-eiwitten'),
    ('Peptide Collageen', 'peptide-collagen', 'peptide-collageen');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

