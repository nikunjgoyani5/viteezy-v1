DROP TABLE IF EXISTS `users`;
create table users
(
    id                       int 					AUTO_INCREMENT,
    email                    varchar(256)           NOT NULL,
    password                 binary(60)             NOT NULL,
    first_name               varchar(256)           NOT NULL,
    last_name                varchar(256)           NOT NULL,
    creation_date            datetime default NOW() NOT NULL,
    role                     varchar(256)           NOT NULL,
    constraint user_pk
        primary key (id),
	CONSTRAINT uc_email UNIQUE (email)
);