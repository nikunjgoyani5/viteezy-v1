DROP PROCEDURE update_delivery_date;

DELIMITER $$
CREATE PROCEDURE update_delivery_date()
BEGIN
	UPDATE payment_plans
	SET payment_date = next_payment_date, next_payment_date = NULL
	WHERE next_payment_date IS NOT NULL
	AND delivery_date < NOW()
	AND status = 'ACTIVE';

	UPDATE payment_plans
    SET delivery_date = next_delivery_date, next_delivery_date = NULL
    WHERE next_delivery_date IS NOT NULL
    AND delivery_date < NOW()
    AND status = 'ACTIVE';

	UPDATE payment_plans SET delivery_date = DATE_ADD(delivery_date, INTERVAL recurring_months MONTH)
	WHERE delivery_date < NOW()
	AND status = 'ACTIVE';
END$$
DELIMITER ;