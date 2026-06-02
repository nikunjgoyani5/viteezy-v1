DROP TABLE IF EXISTS `incentives`;
CREATE TABLE `incentives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `amount` decimal(7,2) NULL,
  `incentive_type` varchar(12) NOT NULL,
  `status` varchar(12) NOT NULL,
  `creation_date` timestamp DEFAULT NOW(),
  `last_modified` timestamp DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT incentives_customers_id
    FOREIGN KEY (`customer_id`) REFERENCES customers (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;