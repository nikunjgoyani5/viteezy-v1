DROP TABLE IF EXISTS `logging`;
create table logging
(
    id                       int 					AUTO_INCREMENT,
    customer_id              int(11)                NOT NULL,
    event                    varchar(50)            NOT NULL,
    info                     varchar(10000)         NOT NULL,
    creation_timestamp       timestamp              DEFAULT NOW(),
    PRIMARY KEY (id),
    CONSTRAINT logs_customer_id_fk FOREIGN KEY (customer_id) REFERENCES customers(id)
);