UPDATE viteezy.used_supplements SET code = 'protein' WHERE name = 'Protein';
UPDATE viteezy.used_supplements SET code = 'vitamins' WHERE name = 'Vitamines';
UPDATE viteezy.used_supplements SET code = 'minerals' WHERE name = 'Mineralen';
UPDATE viteezy.used_supplements SET code = 'others' WHERE name = 'Overige';
UPDATE viteezy.used_supplements SET code = 'never' WHERE name = 'Nog nooit';

# Once any code column in the coming tables got a random UUID value, any new row introduced in the system
# shall have a code value and shall not rely on a random UUID.
# This change does not belong here but to the schemas domain. However, there's no way for making the migrations
# cope with both scenarios at the same time: a new db from scratch vs a pre-existing db.
# There's a clear race condition here and placing the "drop default" inside data is the only way around.
ALTER TABLE `used_supplements` ALTER COLUMN `code` DROP DEFAULT;
