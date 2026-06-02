CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `blends`
--

DROP TABLE IF EXISTS `blends`;
CREATE TABLE `blends` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `status` varchar(128) NOT NULL DEFAULT 'CREATED',
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
