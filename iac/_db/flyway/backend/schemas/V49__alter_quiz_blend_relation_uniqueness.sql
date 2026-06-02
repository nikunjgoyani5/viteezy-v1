alter table quiz_blend_relations drop foreign key quiz_blend_relation_quiz_id_fk;

alter table quiz_blend_relations drop key quiz_blend_relation_pk_2;
create unique index quiz_blend_relation_pk_2
    on quiz_blend_relations (quiz_id);

alter table quiz_blend_relations
    add constraint quiz_blend_relations_quiz_id_fk
        foreign key (quiz_id) references quiz (id);

