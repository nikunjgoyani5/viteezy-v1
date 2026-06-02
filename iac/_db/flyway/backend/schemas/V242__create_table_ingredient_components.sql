DROP TABLE IF EXISTS `ingredient_components`;
CREATE TABLE `ingredient_components` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `ingredient_id` int(11) NOT NULL,
                           `name` varchar(100) NOT NULL,
                           `amount` varchar(20) NOT NULL,
                           `percentage` varchar(10) NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT ingredient_components_id_fk
                               FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;