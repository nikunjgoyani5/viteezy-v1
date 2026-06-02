ALTER TABLE customers ADD COLUMN active_campaign_contact_id BIGINT(11) AFTER ga_id;
ALTER TABLE customers ADD COLUMN active_campaign_ecom_customer_id BIGINT(11) AFTER active_campaign_contact_id;