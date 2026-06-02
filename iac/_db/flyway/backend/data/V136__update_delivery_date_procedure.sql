DELIMITER $$
CREATE PROCEDURE update_delivery_date()
BEGIN
	UPDATE payment_plans SET delivery_date = DATE_ADD(delivery_date, INTERVAL recurring_months MONTH)
    WHERE delivery_date < NOW()
    AND status = 'ACTIVE';
END$$
DELIMITER ;

CREATE EVENT `update_delivery_date_event`
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP('2021-04-13 05:00:00')
DO CALL update_delivery_date();