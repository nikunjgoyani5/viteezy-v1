create table configuration
(
    id                       int auto_increment,
    name                     varchar(50)           not null UNIQUE KEY,
    type                     varchar(50)           null,
    value                    varchar(1000)         not null,
    expiration_timestamp     timestamp             null,
    modification_timestamp   timestamp             not null DEFAULT NOW(),
    creation_timestamp       timestamp             not null DEFAULT NOW(),
    primary key (id)
);