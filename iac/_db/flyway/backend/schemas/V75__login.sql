create table login
(
    id                       int auto_increment,
    email                    varchar(200)          not null UNIQUE KEY,
    token                    varchar(200)          not null,
    last_updated             timestamp             not null DEFAULT NOW(),
    creation_timestamp       timestamp             not null DEFAULT NOW(),
    primary key (id)
);
