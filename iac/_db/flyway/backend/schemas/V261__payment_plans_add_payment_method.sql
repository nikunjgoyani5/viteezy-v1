ALTER TABLE payment_plans DROP COLUMN mollie_subscription_id;
ALTER TABLE payment_plans ADD COLUMN payment_method varchar(10) NULL;
