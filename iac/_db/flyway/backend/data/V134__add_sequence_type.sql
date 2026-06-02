DELIMITER $$
CREATE PROCEDURE add_sequence_type()
BEGIN
    DECLARE i int;
    SET i = 1;
    WHILE i<50000 DO
		update payments
		set sequence_type = "first"
        where sequence_type is null
		and creation_date in
		(
		  select creation_date from
		  (
			select creation_date
			from payments
			where payment_plan_id = i
			order by creation_date asc
			limit 1
		  ) as arbitraryTableName
		);
      SET i = i + 1 ;
    END WHILE;

    update payments
	set sequence_type = "recurring"
	where sequence_type is null;
END $$
DELIMITER ;

CALL add_sequence_type();