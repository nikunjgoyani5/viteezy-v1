ALTER TABLE customers ADD COLUMN street varchar(200);
ALTER TABLE customers ADD COLUMN house_number int(11);
ALTER TABLE customers ADD COLUMN house_number_addition varchar(50);

update customers set street = REGEXP_REPLACE(address,'[0-9]|,|-','');
update customers set house_number =
CASE
    WHEN REGEXP_SUBSTR(REGEXP_REPLACE(address,'[a-z|A-Z]|,| |',''), '^[0-9]+') IS NULL or REGEXP_SUBSTR(REGEXP_REPLACE(address,'[a-z|A-Z]|,| |',''), '^[0-9]+') = ''
        THEN 0
        ELSE REGEXP_SUBSTR(REGEXP_REPLACE(address,'[a-z|A-Z]|,| |',''), '^[0-9]+')
        END;
update customers set house_number_addition =
CASE
    WHEN NOT SUBSTRING_INDEX(SUBSTRING_INDEX(address, ' ', -2), ' ', -1) REGEXP '^-?[0-9]+$' > 0
	    THEN REGEXP_REPLACE(SUBSTRING_INDEX(SUBSTRING_INDEX(address, ' ', -2), ' ', -1),'[0-9]','')
	    ELSE null
    END;