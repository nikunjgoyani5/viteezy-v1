UPDATE viteezy.vegetable_consumptions SET code = 'zero-to-one-hundred' WHERE name = '0 -100';
UPDATE viteezy.vegetable_consumptions SET code = 'two-hundred-to-three-hundred' WHERE name = '200 - 300';
UPDATE viteezy.vegetable_consumptions SET code = 'four-hundred-to-five-hundred' WHERE name = '400 - 500';
UPDATE viteezy.vegetable_consumptions SET code = 'more-than-five-hundred' WHERE name = '500+';

# Once any code column in the coming tables got a random UUID value, any new row introduced in the system
# shall have a code value and shall not rely on a random UUID.
# This change does not belong here but to the schemas domain. However, there's no way for making the migrations
# cope with both scenarios at the same time: a new db from scratch vs a pre-existing db.
# There's a clear race condition here and placing the "drop default" inside data is the only way around.
ALTER TABLE `vegetable_consumptions` ALTER COLUMN `code` DROP DEFAULT;
