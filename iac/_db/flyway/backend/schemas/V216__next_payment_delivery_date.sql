ALTER TABLE payment_plans ADD COLUMN next_payment_date timestamp NULL after payment_date;
ALTER TABLE payment_plans ADD COLUMN next_delivery_date timestamp NULL after delivery_date;