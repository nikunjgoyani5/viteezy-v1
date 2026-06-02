DROP TABLE IF EXISTS `notes`;
create table notes
(
    id                       int 					AUTO_INCREMENT,
    from_id                  int(11)                NOT NULL,
    customer_id              int(11)                NOT NULL,
    message                  varchar(10000)         NOT NULL,
    creation_timestamp       timestamp              DEFAULT NOW(),
    modification_timestamp   timestamp              DEFAULT NOW(),
    PRIMARY KEY (id),
	CONSTRAINT user_id_fk FOREIGN KEY (from_id) REFERENCES users(id),
    CONSTRAINT customer_id_fk FOREIGN KEY (customer_id) REFERENCES customers(id)
);