ALTER TABLE customers ADD COLUMN referral_code VARCHAR(200);
CREATE UNIQUE INDEX customers_referral_code__unique_index ON customers(referral_code);

DELIMITER $$
CREATE PROCEDURE add_referral_code()
BEGIN
    DECLARE i int;
    DECLARE customer_rows int;

    SET customer_rows = (SELECT count(*) FROM customers);
    SET i = 1;
    WHILE i<customer_rows DO
      UPDATE customers
      SET referral_code = CONCAT(UPPER((first_name)), (SELECT LPAD(i, 6, 0)))
      WHERE id = i;

      SET i = i + 1 ;
    END WHILE;
END $$
DELIMITER ;

CALL add_referral_code();

DROP PROCEDURE add_referral_code;