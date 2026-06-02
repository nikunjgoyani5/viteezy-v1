ALTER TABLE `payments`
  add column IF NOT EXISTS `last_modified` timestamp DEFAULT NOW() NOT NULL after creation_date,
  add column IF NOT EXISTS `reason` varchar(200),
  add column IF NOT EXISTS `retried_mollie_payment_id` varchar(200) after mollie_payment_id;

