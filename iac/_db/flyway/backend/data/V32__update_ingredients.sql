LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients`
    DISABLE KEYS */;
INSERT INTO `ingredients` (`name`, `code`, `description`, `is_a_flavour`)
VALUES ('Caramel', 'caramel', 'caramel', true),
       ('Aardbei', 'strawberry', 'aardbei', true),
       ('Kokos', 'coconut', 'kokos', true);
/*!40000 ALTER TABLE `ingredients`
    ENABLE KEYS */;
UNLOCK TABLES;

