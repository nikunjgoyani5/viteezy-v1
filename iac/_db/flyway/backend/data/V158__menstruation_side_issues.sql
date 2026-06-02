LOCK TABLES `menstruation_side_issues` WRITE;
/*!40000 ALTER TABLE `menstruation_side_issues` DISABLE KEYS */;
INSERT INTO `menstruation_side_issues` (`name`, `code`) VALUES ('Kramp','cramp'),('Fysieke ongemakken','physical-discomfort'),('Opgeblazen gevoel','bloated-feeling'),('Eetbuien', 'binge-eating'),('Puistjes', 'pimples'),('Geen van bovenstaande', 'none');
/*!40000 ALTER TABLE `menstruation_side_issues` ENABLE KEYS */;
UNLOCK TABLES;