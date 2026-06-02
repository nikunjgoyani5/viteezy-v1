CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `coupons_discount`
--

DROP TABLE IF EXISTS coupons_discount;
CREATE TABLE coupons_discount (
                           id int(11) NOT NULL AUTO_INCREMENT,
                           coupon_id int(11) NOT NULL,
                           payment_plan_id int(11) NOT NULL,
                           month int(1) NOT NULL,
                           amount decimal(7,2) NOT NULL,
                           status varchar(12) NOT NULL,
                           creation_timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
                           modification_timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
                           PRIMARY KEY (id),
                           CONSTRAINT coupons_discount_pk_2
                               UNIQUE (coupon_id, payment_plan_id, month),
                           CONSTRAINT coupons_discount_coupon_id_fk
                               FOREIGN KEY (coupon_id) REFERENCES coupons (id),
                           CONSTRAINT coupons_discount_payment_plan_id_fk
                               FOREIGN KEY (payment_plan_id) REFERENCES payment_plans (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;