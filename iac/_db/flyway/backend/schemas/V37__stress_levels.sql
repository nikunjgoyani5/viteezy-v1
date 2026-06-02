CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `stress_levels`
--

DROP TABLE IF EXISTS `stress_levels`;
CREATE TABLE `stress_levels` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `name` varchar(128) NOT NULL,
                           `code` varchar(50) NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;


CREATE UNIQUE INDEX stress_levels__unique_index ON `stress_levels` (code);