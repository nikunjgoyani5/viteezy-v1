DROP TABLE IF EXISTS `referrals`;
CREATE TABLE `referrals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `amount` decimal(7,2)  NOT NULL,
  `status` varchar(12) NOT NULL,
  `creation_date` timestamp DEFAULT NOW(),
  `last_modified` timestamp DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT referrals_customers_id_from_fk
    FOREIGN KEY (`from_id`) REFERENCES customers (id),
CONSTRAINT referrals_customers_id_to_fk
    FOREIGN KEY (`to_id`) REFERENCES customers (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;