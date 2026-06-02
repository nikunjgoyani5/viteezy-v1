DROP TABLE IF EXISTS `payment_plans`;
CREATE TABLE `payment_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_amount` decimal(7,2)  NOT NULL,
  `recurring_amount` decimal(7,2)  NOT NULL,
  `recurring_weeks` int(11) NOT NULL,
  `mollie_subscription_id` varchar(200) NULL UNIQUE KEY,
  `customer_id` int(11) NOT NULL,
  `blend_id` int(11) NOT NULL,
  `external_reference` varchar(200) NOT NULL UNIQUE KEY,
  `creation_date` timestamp DEFAULT NOW(),
  `last_modified` timestamp DEFAULT NOW(),
  `status` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT payment_plans_customer_id_fk
    FOREIGN KEY (customer_id) REFERENCES customers (id),
  CONSTRAINT payment_plans_blend_id_fk
    FOREIGN KEY (blend_id) REFERENCES blends (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(7,2)  NOT NULL,
  `mollie_payment_id` varchar(200) NULL UNIQUE KEY,
  `payment_plan_id` int(11) NOT NULL,
  `creation_date` timestamp DEFAULT NOW(),
  `status` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT payment_payment_plan_id_fk
    FOREIGN KEY (payment_plan_id) REFERENCES payment_plans (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
