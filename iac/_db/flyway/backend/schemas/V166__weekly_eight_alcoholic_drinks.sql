CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `weekly_eight_alcoholic_drinks`
--

DROP TABLE IF EXISTS `weekly_eight_alcoholic_drinks`;
CREATE TABLE `weekly_eight_alcoholic_drinks` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `name` varchar(128) NOT NULL,
                           `code` varchar(50) NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;


CREATE UNIQUE INDEX weekly_eight_alcoholic_drinks__unique_index ON `weekly_eight_alcoholic_drinks` (code);