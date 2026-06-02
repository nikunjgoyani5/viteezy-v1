ALTER TABLE payment_plans CHANGE COLUMN start_date payment_date timestamp;
UPDATE payment_plans SET payment_date = DATE_SUB(delivery_date, INTERVAL 8 DAY) WHERE payment_date < NOW();