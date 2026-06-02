ALTER TABLE quiz ADD COLUMN customer_id int(11) NULL;
ALTER TABLE quiz ADD CONSTRAINT quiz_customer_id_fk FOREIGN KEY (customer_id) REFERENCES customers (id);

UPDATE quiz
JOIN quiz_blend_relations ON quiz.id = quiz_blend_relations.quiz_id
JOIN blends ON quiz_blend_relations.blend_id = blends.id
JOIN customers ON blends.customer_id = customers.id
SET quiz.customer_id = customers.id;