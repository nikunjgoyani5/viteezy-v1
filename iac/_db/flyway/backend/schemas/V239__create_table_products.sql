DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `name` varchar(100) NOT NULL,
                           `category` varchar(200),
                           `description` varchar(5000),
                           `code` varchar(50) NOT NULL,
                           `url` varchar(50) NOT NULL,
                           `is_vegan` boolean NOT NULL,
                           `is_active` boolean NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `product_ingredients`;
CREATE TABLE `product_ingredients` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `product_id` int(11) NOT NULL,
                           `ingredient_id` int(11) NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT product_ingredients_products_id_fk
                               FOREIGN KEY (product_id) REFERENCES products (id),
						   CONSTRAINT product_ingredients_ingredients_id_fk
                               FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;