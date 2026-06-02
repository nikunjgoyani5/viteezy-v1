alter table blend_ingredients_relations
    add price decimal(7,2) not null default 0.0;

alter table blend_ingredients_relations
    add currency varchar(10) not null default 'EUR';

