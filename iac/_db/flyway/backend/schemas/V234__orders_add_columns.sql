AlTER TABLE orders ADD COLUMN sequence_type VARCHAR(200) AFTER payment_id;
AlTER TABLE orders ADD COLUMN referral_code VARCHAR(200) AFTER email;