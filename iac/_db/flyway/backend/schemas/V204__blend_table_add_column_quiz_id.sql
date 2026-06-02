ALTER TABLE blends ADD COLUMN quiz_id int(11) NULL;
ALTER TABLE blends ADD CONSTRAINT blend_quiz_id_fk FOREIGN KEY (quiz_id) REFERENCES quiz (id);

UPDATE blends
JOIN quiz_blend_relations ON blends.id = quiz_blend_relations.blend_id
SET blends.quiz_id = quiz_blend_relations.quiz_id;