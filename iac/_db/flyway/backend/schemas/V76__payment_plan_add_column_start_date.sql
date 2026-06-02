ALTER TABLE payment_plans ADD COLUMN start_date datetime;
UPDATE payment_plans set start_date = creation_date + interval 27 day;
ALTER TABLE payment_plans MODIFY COLUMN start_date datetime NOT NULL;