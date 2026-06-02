DROP TABLE IF EXISTS `tokens`;
create table tokens
(
    id                       int 					AUTO_INCREMENT,
	token                    varchar(256)           NOT NULL,
	user_id                  int 					NOT NULL,
	user_role                varchar(256)           NOT NULL,
	last_access              datetime default NOW() NOT NULL,
    CONSTRAINT token_pk
        PRIMARY KEY (id),
    CONSTRAINT uc_user_id UNIQUE (user_id),
	CONSTRAINT token_relation_user__fk
	    FOREIGN KEY (user_id) REFERENCES users (id)
);