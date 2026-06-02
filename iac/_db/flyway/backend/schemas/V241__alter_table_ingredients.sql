ALTER TABLE ingredients ADD COLUMN is_active boolean DEFAULT true;
ALTER TABLE ingredients MODIFY COLUMN creation_timestamp timestamp DEFAULT NOW() AFTER is_active;
ALTER TABLE ingredients MODIFY COLUMN modification_timestamp timestamp DEFAULT NOW() AFTER creation_timestamp;
ALTER TABLE ingredients ADD COLUMN type varchar(50) AFTER name;
ALTER TABLE ingredients ADD COLUMN excipients varchar(1000) AFTER description;
ALTER TABLE ingredients ADD COLUMN claim varchar(2500) AFTER excipients;
ALTER TABLE ingredients ADD COLUMN url varchar(50) DEFAULT NULL AFTER code;
ALTER TABLE ingredients ADD COLUMN is_vegan varchar(50) DEFAULT true AFTER is_a_flavour;