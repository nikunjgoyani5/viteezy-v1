LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons`
    DISABLE KEYS */;
INSERT INTO `coupons` (coupon_code, start_date, end_date, amount, minimum_amount, maximum_amount, percentage, max_uses,
                       used, is_paid, campaign_id, creator_id, creation_date)
VALUES ('MUM25', '2020-01-01', '2020-12-12', 0.25, 14.99, 1000, 25, 1000, 0, 0, 0, 0, NOW()),
       ('PERSONALTRAINING15', '2020-01-01', '2020-12-12', 0.15, 14.99, 1000, 15, 1000, 0, 0, 0, 0, NOW());

/*!40000 ALTER TABLE `coupons`
    ENABLE KEYS */;
UNLOCK TABLES;
