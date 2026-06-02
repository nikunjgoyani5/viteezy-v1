UPDATE viteezy.pregnancies SET code = 'pregnant' WHERE name = 'Zwanger';
UPDATE viteezy.pregnancies SET code = 'breast-feeding' WHERE name = 'Borstvoeding';
UPDATE viteezy.pregnancies SET code = 'neither' WHERE name = 'Geen van beide';

# Once any code column in the coming tables got a random UUID value, any new row introduced in the system
# shall have a code value and shall not rely on a random UUID.
# This change does not belong here but to the schemas domain. However, there's no way for making the migrations
# cope with both scenarios at the same time: a new db from scratch vs a pre-existing db.
# There's a clear race condition here and placing the "drop default" inside data is the only way around.
ALTER TABLE `pregnancies` ALTER COLUMN `code` DROP DEFAULT;
