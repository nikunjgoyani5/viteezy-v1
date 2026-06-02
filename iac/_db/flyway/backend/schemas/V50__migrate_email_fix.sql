ALTER TABLE `email_answers`
DROP INDEX email_answers_pk_2,
ADD UNIQUE KEY `email_answers_pk_2` (`quiz_id`);