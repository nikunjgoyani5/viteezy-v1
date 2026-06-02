UPDATE payment_plans SET status = "CANCELED"
where id in (select payment_plan_id
			 from payments
			 where id in (select MAX(id) from payments group by payment_plan_id)
			 and status = "chargeback");