CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `coupons_used`
--

DROP TABLE IF EXISTS `coupons_used`;
CREATE TABLE `coupons_used` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `coupon_id` int(11) NOT NULL,
                           `customer_id` int(11) NOT NULL,
                           `payment_plan_id` int(11) NOT NULL,
                           PRIMARY KEY (`id`),
                           CONSTRAINT coupons_used_pk_2
                               UNIQUE (customer_id, payment_plan_id),
                           CONSTRAINT coupons_used_coupon_id_fk
                               FOREIGN KEY (coupon_id) REFERENCES coupons (id),
                           CONSTRAINT coupons_used_customer_id_fk
                               FOREIGN KEY (customer_id) REFERENCES customers (id),
                           CONSTRAINT coupons_used_payment_plan_id_fk
                               FOREIGN KEY (payment_plan_id) REFERENCES payment_plans (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;