LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons`
    DISABLE KEYS */;
INSERT INTO `coupons` (coupon_code, start_date, end_date, amount, minimum_amount, maximum_amount, percentage, max_uses,
                       used, is_paid, campaign_id, creator_id, is_recurring, creation_date)
VALUES ('LOTTE10', '2021-01-01', '2022-12-12', 0.1, 19.99, 1000, 10, 10000, 0, 0, 0, 0, false, NOW()),
       ('ESTELLE10', '2021-01-01', '2022-12-12', 0.1, 19.99, 1000, 10, 10000, 0, 0, 0, 0, false, NOW()),
       ('JAYDI10', '2021-01-01', '2022-12-12', 0.1, 19.99, 1000, 10, 10000, 0, 0, 0, 0, false, NOW()),
       ('EILISH10', '2021-01-01', '2022-12-12', 0.1, 19.99, 1000, 10, 10000, 0, 0, 0, 0, false, NOW()),
       ('JIPP10', '2021-01-01', '2022-12-12', 0.1, 19.99, 1000, 10, 10000, 0, 0, 0, 0, false, NOW()),
       ('VITA10', '2021-01-01', '2022-12-12', 0.1, 19.99, 1000, 10, 10000, 0, 0, 0, 0, false, NOW()),
       ('ELISE10', '2021-01-01', '2022-12-12', 0.1, 19.99, 1000, 10, 10000, 0, 0, 0, 0, false, NOW());
/*!40000 ALTER TABLE `coupons`
    ENABLE KEYS */;
UNLOCK TABLES;