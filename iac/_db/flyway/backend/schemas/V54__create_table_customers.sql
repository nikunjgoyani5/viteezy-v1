DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL UNIQUE KEY,
  `external_reference` varchar(200) NOT NULL UNIQUE KEY,
  `mollie_customer_id` varchar(200) NULL,
  `mailchimp_customer_id` varchar(200) NULL,
  `creation_date` timestamp DEFAULT NOW(),
  `last_modified` timestamp DEFAULT NOW(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;