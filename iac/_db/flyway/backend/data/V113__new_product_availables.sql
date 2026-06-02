LOCK TABLES `new_product_availables` WRITE;
/*!40000 ALTER TABLE `new_product_availables` DISABLE KEYS */;
INSERT INTO `new_product_availables` (`name`, `code`) VALUES ('Het als eerste hebben','have-it-first'),('Meer weten','knowing-more'),('Voorlopig wachten','wait');
/*!40000 ALTER TABLE `new_product_availables` ENABLE KEYS */;
UNLOCK TABLES;