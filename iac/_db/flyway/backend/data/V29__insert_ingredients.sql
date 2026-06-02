LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` (`name`, `code`, `description`) VALUES
    ('Ijzer', 'iron', 'iron'),
    ('Vitamine b12', 'vitamin-b12', 'vitamine-b12'),
    ('Vitamine C', 'vitamin-c', 'vitamine-c'),
    ('Vitamine D', 'vitamin-d', 'vitamine-d'),
    ('Magnesium', 'magnesium', 'magnesium'),
    ('Zink', 'zinc', 'zink'),
    ('Cafeine', 'caffeine', 'cafeine'),
    ('Groene thee extract', 'green-tea-extract', 'groene-thee-extract'),
    ('Dextrose', 'dextrose', 'dextrose'),
    ('Whey protein isolaat', 'whey-protein-isolate', 'whey-protein-isolaat'),
    ('Whey protein concentrate', 'whey-protein-concentrate', 'whey-protein-concentrate'),
    ('Organic Soja protein', 'organic-soy-protein', 'organic-soja-protein'),
    ('Organic Erwten protein', 'organic-peas-protein', 'organic-erwten-protein'),
    ('Organic rijst protein', 'organic-rice-protein', 'organic-rijst-protein'),
    ('Micellar Casein', 'micellar-casein', 'micellar-casein'),
    ('Stevia organic', 'organic-stevia', 'stevia-organic');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;