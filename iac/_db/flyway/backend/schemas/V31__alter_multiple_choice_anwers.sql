ALTER TABLE usage_reason_answers DROP FOREIGN KEY usage_reason_answers_quiz_id_fk;
ALTER TABLE usage_reason_answers DROP KEY usage_reason_answers_pk_2;
CREATE INDEX usage_reason_answers_pk_2 ON usage_reason_answers (quiz_id, usage_reason_id);
ALTER TABLE usage_reason_answers ADD CONSTRAINT usage_reason_answers_quiz_id_fk FOREIGN KEY (quiz_id) REFERENCES quiz (id);

ALTER TABLE allergy_answers DROP FOREIGN KEY allergy_answers_quiz_id_fk;
ALTER TABLE allergy_answers DROP KEY allergy_answers_pk_2;
CREATE INDEX allergy_answers_pk_2 ON allergy_answers (quiz_id, allergy_id);
ALTER TABLE allergy_answers ADD CONSTRAINT allergy_answers_quiz_id_fk FOREIGN KEY (quiz_id) REFERENCES quiz (id);

ALTER TABLE sport_types_answers DROP FOREIGN KEY sport_types_answers_quiz_id_fk;
ALTER TABLE sport_types_answers DROP KEY sport_types_answers_pk_2;
CREATE INDEX sport_types_answers_pk_2 ON sport_types_answers (quiz_id, sport_type_id);
ALTER TABLE sport_types_answers ADD CONSTRAINT sport_types_answers_quiz_id_fk FOREIGN KEY (quiz_id) REFERENCES quiz (id);

ALTER TABLE used_supplements_answers DROP FOREIGN KEY used_supplements_answers_quiz_id_fk;
ALTER TABLE used_supplements_answers DROP KEY used_supplements_answers_pk_2;
CREATE INDEX used_supplements_answers_pk_2 ON used_supplements_answers (quiz_id, used_supplement_id);
ALTER TABLE used_supplements_answers ADD CONSTRAINT used_supplements_answers_quiz_id_fk FOREIGN KEY (quiz_id) REFERENCES quiz (id);
