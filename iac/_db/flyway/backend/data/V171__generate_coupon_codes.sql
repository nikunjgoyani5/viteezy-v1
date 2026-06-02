DELIMITER $$
CREATE PROCEDURE generate_coupon_codes()
BEGIN
	DECLARE random_coupon varchar(10);
    DECLARE i int;
    SET i = 0;
    WHILE i<1000 DO
		SET random_coupon = (SELECT UPPER(LPAD(LEFT(REPLACE(REPLACE(REPLACE(TO_BASE64(UNHEX(MD5(RAND()))), "/", ""), "+", ""), "=", ""), 7), 7, 0)));
		INSERT INTO `coupons` (coupon_code, start_date, end_date, amount, minimum_amount, maximum_amount, percentage, max_uses, used, is_paid, campaign_id, creator_id, creation_date)
		VALUES (random_coupon, '2023-01-01', '2024-12-12', 0.25, 19.99, 1000, 25, 1, 0, 0, 0, 0, NOW());

        SET i = i + 1 ;
    END WHILE;

    SET i = 0;
    WHILE i<500 DO
		SET random_coupon = (SELECT UPPER(LPAD(LEFT(REPLACE(REPLACE(REPLACE(TO_BASE64(UNHEX(MD5(RAND()))), "/", ""), "+", ""), "=", ""), 7), 7, 0)));
		INSERT INTO `coupons` (coupon_code, start_date, end_date, amount, minimum_amount, maximum_amount, percentage, max_uses, used, is_paid, campaign_id, creator_id, creation_date)
		VALUES (random_coupon, '2023-01-01', '2024-12-12', 0.3, 19.99, 1000, 30, 1, 0, 0, 0, 0, NOW());

        SET i = i + 1 ;
    END WHILE;
END $$
DELIMITER ;

CALL generate_coupon_codes();
DROP PROCEDURE generate_coupon_codes;