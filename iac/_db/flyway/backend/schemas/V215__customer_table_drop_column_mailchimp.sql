ALTER TABLE customers MODIFY COLUMN address VARCHAR(45) AFTER user_agent;

AlTER TABLE customers DROP COLUMN mailchimp_customer_id;

