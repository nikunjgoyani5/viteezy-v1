DROP TABLE IF EXISTS `ingredient_units`;
CREATE TABLE `ingredient_units` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `ingredient_id` int(11) NOT NULL,
                           `pharmacist_code` int(11) NOT NULL,
                           `pharmacist_size` varchar(50) NOT NULL,
                           `pharmacist_unit` decimal(15,2) NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT ingredient_units_pk_2
                               UNIQUE (pharmacist_code),
                           CONSTRAINT ingredient_units_id_fk
                               FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;