DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `external_reference` char(36) NOT NULL UNIQUE KEY,
  `order_number` varchar(13) NOT NULL UNIQUE KEY,
  `payment_id` int(11) NOT NULL,
  `payment_plan_id` int(11) NOT NULL,
  `blend_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `recurring_months` int(11) NOT NULL,
  `first_name` varchar(200),
  `last_name` varchar(200),
  `phone_number` varchar(20),
  `street` varchar(200),
  `house_number` varchar(200),
  `house_number_addition` varchar(200),
  `postcode` varchar(20),
  `city` varchar(200),
  `country` char(2),
  `email` varchar(200),
  `tracktrace` varchar(200),
  `status` varchar(20) NOT NULL,
  `created` timestamp DEFAULT NOW(),
  `shipped` datetime,
  `last_modified` timestamp DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT orders_customers_id_fk
    FOREIGN KEY (`customer_id`) REFERENCES customers (id),
  CONSTRAINT orders_payments_id_fk
    FOREIGN KEY (`payment_id`) REFERENCES payments (id),
  CONSTRAINT orders_payment_plans_id_fk
    FOREIGN KEY (`payment_plan_id`) REFERENCES payment_plans (id),
  CONSTRAINT orders_blends_id_fk
    FOREIGN KEY (`blend_id`) REFERENCES blends (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
