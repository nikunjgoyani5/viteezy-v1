ALTER TABLE `name_answers`
DROP INDEX name_answers_pk_2,
ADD UNIQUE KEY `name_answers_pk_2` (`quiz_id`);