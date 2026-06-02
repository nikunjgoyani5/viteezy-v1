ALTER TABLE `payment_plans`
  drop recurring_weeks,
  add column `recurring_months` int(11) NOT NULL after recurring_amount;

