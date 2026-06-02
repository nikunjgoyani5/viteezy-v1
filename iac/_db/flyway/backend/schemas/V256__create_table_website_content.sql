DROP TABLE IF EXISTS `website_content`;
create table website_content
(
    id                       int                    NOT NULL AUTO_INCREMENT,
    code                     varchar(50)            NOT NULL,
    title                    varchar(1000)          NOT NULL,
    subtitle                 varchar(1000)          NULL,
    is_active                boolean                NOT NULL DEFAULT true,
    creation_timestamp       timestamp              NOT NULL DEFAULT NOW(),
    modification_timestamp   timestamp              NOT NULL DEFAULT NOW(),
    constraint website_content_pk
        primary key (id),
    constraint website_content_pk_2
        unique (code)
);