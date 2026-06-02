DROP TABLE IF EXISTS `coupons`;
CREATE TABLE `coupons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coupon_code` varchar(200) NOT NULL UNIQUE KEY,
  `start_date` timestamp DEFAULT NOW(),
  `end_date` timestamp DEFAULT NOW(),
  `amount` decimal(7,2)  NOT NULL,
  `minimum_amount` decimal(7,2)  NOT NULL,
  `maximum_amount` decimal(7,2)  NOT NULL,
  `percentage` tinyint NOT NULL,
  `max_uses` int(11) NOT NULL DEFAULT 0,
  `used` int(11) NOT NULL DEFAULT 0,
  `is_paid` tinyint NOT NULL DEFAULT 0,
  `campaign_id` int(11) NOT NULL DEFAULT 0,
  `creator_id` int(11) NOT NULL DEFAULT 0,
  `creation_date` timestamp DEFAULT NOW(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;