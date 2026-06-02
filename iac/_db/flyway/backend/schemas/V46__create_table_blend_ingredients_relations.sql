CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `blend_ingredients_relations`
--

DROP TABLE IF EXISTS `blend_ingredients_relations`;
CREATE TABLE `blend_ingredients_relations` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `ingredient_id` int(11) NOT NULL,
                           `blend_id` int(11) NOT NULL ,
                           `amount` int(11) NOT NULL ,
                           `is_unit` varchar(11) NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT blend_ingredients_relationsn_pk_2
                               UNIQUE (ingredient_id, blend_id),
                           CONSTRAINT blend_ingredients_relations_blend_id_fk
                               FOREIGN KEY (blend_id) REFERENCES blends (id),
                           CONSTRAINT blend_ingredients_relations_quiz_id_fk
                               FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
