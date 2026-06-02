CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `type_of_trainings`
--

DROP TABLE IF EXISTS `type_of_trainings`;
CREATE TABLE `type_of_trainings` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `name` varchar(128) NOT NULL,
                           `code` varchar(50) NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;


CREATE UNIQUE INDEX type_of_trainings__unique_index ON `type_of_trainings` (code);