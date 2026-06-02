ALTER TABLE customers ADD COLUMN opt_in BOOLEAN DEFAULT 0 AFTER email;

UPDATE customers
JOIN quiz ON quiz.customer_id = customers.id
JOIN email_answers ON email_answers.quiz_id = quiz.id
SET customers.opt_in = email_answers.opt_in;