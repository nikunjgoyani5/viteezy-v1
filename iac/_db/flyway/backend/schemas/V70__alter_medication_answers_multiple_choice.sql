ALTER TABLE medication_answers DROP FOREIGN KEY medication_answers_quiz_id_fk;
ALTER TABLE medication_answers DROP KEY medication_answers_pk_2;
CREATE INDEX medication_answers_pk_2 ON medication_answers (quiz_id, medication_id);
ALTER TABLE medication_answers ADD CONSTRAINT medication_answers_quiz_id_fk FOREIGN KEY (quiz_id) REFERENCES quiz (id);