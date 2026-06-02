create table blend_ingredient_reasons
(
    id                          int auto_increment,
    code                        varchar(100)           not null,
    description                 varchar(1000)          not null,
    creation_timestamp          datetime default NOW() not null,
    last_modification_timestamp datetime default NOW() not null,
    constraint blend_ingredient_reasons_pk
        primary key (id)
);

create unique index blend_ingredient_reasons_code_uindex
    on blend_ingredient_reasons (code);

