LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons`
    DISABLE KEYS */;
INSERT INTO `coupons` (coupon_code, start_date, end_date, amount, minimum_amount, maximum_amount, percentage, max_uses,
                       used, is_paid, campaign_id, creator_id, creation_date)
VALUES ('friendsxfamily', '2019-12-19', '2020-06-19', 0.5, 25, 1000, TRUE, 200, 0, 0, 0, 0, NOW()),
       ('bakertilly20', '2020-01-01', '2020-12-31', 0.5, 25, 1000, TRUE, 500, 0, 0, 0, 0, NOW()),
       ('vqrfjyze', '2020-01-01', '2020-12-31', 0.5, 20, 1000, TRUE, 1000, 0, 0, 0, 0, NOW()),
       ('jlsk3qnq', '2020-01-01', '2020-12-31', 0.5, 20, 1000, TRUE, 1000, 0, 0, 0, 0, NOW()),
       ('jhxvwdtx', '2020-01-01', '2020-12-31', 0.5, 20, 1000, TRUE, 1000, 0, 0, 0, 0, NOW()),
       ('ypoey8sb', '2020-01-01', '2020-12-31', 0.5, 20, 1000, TRUE, 1000, 0, 0, 0, 0, NOW()),
       ('ae7dykzv', '2020-01-01', '2020-12-31', 0.5, 20, 1000, TRUE, 1000, 0, 0, 0, 0, NOW());
/*!40000 ALTER TABLE `coupons`
    ENABLE KEYS */;
UNLOCK TABLES;
