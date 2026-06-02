UPDATE viteezy.amount_of_training SET code = 'one-to-two' WHERE name = '1 - 2';
UPDATE viteezy.amount_of_training SET code = 'two-to-three' WHERE name = '2 - 3';
UPDATE viteezy.amount_of_training SET code = 'more-than-four' WHERE name = '4+';
UPDATE viteezy.amount_of_training SET code = 'none' WHERE name = 'Ik train niet';

# Once any code column in the coming tables got a random UUID value, any new row introduced in the system
# shall have a code value and shall not rely on a random UUID.
# This change does not belong here but to the schemas domain. However, there's no way for making the migrations
# cope with both scenarios at the same time: a new db from scratch vs a pre-existing db.
# There's a clear race condition here and placing the "drop default" inside data is the only way around.
ALTER TABLE `amount_of_training` ALTER COLUMN `code` DROP DEFAULT;
