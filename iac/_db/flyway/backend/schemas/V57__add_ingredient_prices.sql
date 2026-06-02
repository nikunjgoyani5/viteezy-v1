create table ingredient_prices
(
    id int auto_increment,
    ingredient_id int not null,
    amount decimal(15,3) not null,
    international_system_unit varchar(10) not null,
    price decimal(7,2) not null,
    currency varchar(10) not null default 'EUR',
    constraint ingredient_prices_pk
        primary key (id),
    constraint ingredient_prices_pk_2
        unique (ingredient_id, amount, international_system_unit),
    constraint ingredient_prices_ingredients_id_fk
        foreign key (ingredient_id) references ingredients (id)
            on update cascade on delete cascade
);
