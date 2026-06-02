ALTER TABLE coupons ADD COLUMN recurring_months int(1) DEFAULT NULL AFTER used;
ALTER TABLE coupons ADD COLUMN ingredient_id int(11) DEFAULT NULL AFTER is_recurring;
ALTER TABLE coupons ADD CONSTRAINT coupons_ingredient_id_fk FOREIGN KEY (ingredient_id) REFERENCES ingredients (id);