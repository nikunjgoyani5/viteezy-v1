LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons`
    DISABLE KEYS */;
INSERT INTO `coupons` (coupon_code, start_date, end_date, amount, minimum_amount, maximum_amount, percentage, max_uses,
                       used, is_paid, campaign_id, creator_id, creation_date)
VALUES ('DAPHNE50', '2020-01-01', '2020-12-12', 0.5, 20, 1000, 50, 10000, 0, 0, 0, 0, NOW());
/*!40000 ALTER TABLE `coupons`
    ENABLE KEYS */;
UNLOCK TABLES;