# When performing this change, bear in mind any blend entity present in a local or pre-production environment.
# If there's no default UUID() generation, the migration fails, but once a default UUID is present, is better to drop
# the default value, so we force a UUID value to be set by backend.

alter table blends
    add external_reference varchar(200) default UUID() not null;

create unique index blends_external_reference_uindex
    on blends (external_reference);

alter table blends alter column external_reference drop default;
