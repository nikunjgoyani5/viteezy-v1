lock tables configuration write;
insert into configuration (name, type, value, expiration_timestamp) values ('facebook_access_token', 'bearer', 'PLACEHOLDER_SET_VIA_SECRETS_OR_LOCAL_CONFIG', '2022-04-29 00:00:00');
unlock tables;