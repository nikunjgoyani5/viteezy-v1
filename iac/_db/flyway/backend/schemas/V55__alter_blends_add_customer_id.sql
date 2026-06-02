# When performing this change, bear in mind any blend entity present in a local or pre-production environment.
# In order to have a foreign key constraint we insert all customers that have an email address, you shouldn't have blends without an email address right?

alter table blends
    add customer_id int not null;

insert into customers (email,external_reference) select email,external_reference from email_answers,quiz where email_answers.quiz_id=quiz.id;

update blends join quiz_blend_relations on quiz_blend_relations.blend_id=blends.id join quiz on quiz_blend_relations.quiz_id=quiz.id join customers on quiz.external_reference=customers.external_reference set blends.customer_id=customers.id;

alter table blends
    add constraint blends_customer_id_fk
        foreign key (customer_id) references customers (id);
