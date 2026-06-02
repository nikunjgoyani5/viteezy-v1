CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `blend_ingredients_relations_history`
--

DROP TABLE IF EXISTS `blend_ingredients_relations_history`;
CREATE TABLE `blend_ingredients_relations_history` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `ingredient_id` int(11) NOT NULL,
                           `blend_id` int(11) NOT NULL,
                           `amount` int(11) NOT NULL,
                           `is_unit` varchar(11) NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           `price` decimal(7,2) NOT NULL default 0.0,
                           `currency` varchar(10) NOT NULL default 'EUR',
                           `explanation` varchar(1000) NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;