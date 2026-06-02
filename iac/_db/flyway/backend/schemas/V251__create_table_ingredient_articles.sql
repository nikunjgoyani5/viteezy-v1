CREATE TABLE `ingredient_articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ingredient_id` int(11) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `title` varchar(1000) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `source` varchar(1000) DEFAULT NULL,
  `creation_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `modification_timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `ingredient_articles_ingredient_id_fk` (`ingredient_id`),
  CONSTRAINT `ingredient_articles_ingredient_id_fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;