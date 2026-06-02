UPDATE viteezy.fruit_consumptions SET code = 'one-to-two' WHERE name = '1 - 2';
UPDATE viteezy.fruit_consumptions SET code = 'three-to-four' WHERE name = '3 -4';
UPDATE viteezy.fruit_consumptions SET code = 'more-than-five' WHERE name = '5+';
UPDATE viteezy.fruit_consumptions SET code = 'none' WHERE name = 'Geen';

# Once any code column in the coming tables got a random UUID value, any new row introduced in the system
# shall have a code value and shall not rely on a random UUID.
# This change does not belong here but to the schemas domain. However, there's no way for making the migrations
# cope with both scenarios at the same time: a new db from scratch vs a pre-existing db.
# There's a clear race condition here and placing the "drop default" inside data is the only way around.
ALTER TABLE `fruit_consumptions` ALTER COLUMN `code` DROP DEFAULT;
