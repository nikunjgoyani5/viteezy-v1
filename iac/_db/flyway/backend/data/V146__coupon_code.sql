LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons`
    DISABLE KEYS */;
INSERT INTO `coupons` (coupon_code, start_date, end_date, amount, minimum_amount, maximum_amount, percentage, max_uses,
                       used, is_paid, campaign_id, creator_id, is_recurring, creation_date)
VALUES ('MYMUESLI', '2021-01-01', '2022-12-12', 0.18, 49.99, 1000, 18, 10000, 0, 0, 0, 0, false, NOW()),
       ('HELLOFRESH', '2021-01-01', '2022-12-12', 0.18, 49.99, 1000, 18, 10000, 0, 0, 0, 0, false, NOW()),
       ('LINDA15', '2021-01-01', '2022-12-12', 0.15, 19.99, 1000, 15, 10000, 0, 0, 0, 0, false, NOW()),
       ('VITAMINANGELS10', '2021-01-01', '2022-12-12', 0.1, 19.99, 1000, 10, 10000, 0, 0, 0, 0, false, NOW()),
       ('VITAMINANGELS15', '2021-01-01', '2022-12-12', 0.15, 19.99, 1000, 15, 10000, 0, 0, 0, 0, false, NOW()),
       ('HAPPY22', '2022-01-01', '2022-12-12', 0.22, 19.99, 1000, 22, 10000, 0, 0, 0, 0, false, NOW()),
       ('CHRISTMAS10', '2021-01-01', '2022-12-12', 0.1, 19.99, 1000, 10, 10000, 0, 0, 0, 0, false, NOW());
/*!40000 ALTER TABLE `coupons`
    ENABLE KEYS */;
UNLOCK TABLES;