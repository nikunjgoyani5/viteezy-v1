ALTER TABLE payment_plans ADD COLUMN delivery_date datetime;

UPDATE payment_plans set delivery_date =
	(SELECT DATE_ADD(`creation_date`, INTERVAL 5 DAY)
	FROM payments
	WHERE payment_plan_id = payment_plans.id
	ORDER BY creation_date DESC
	LIMIT 1);