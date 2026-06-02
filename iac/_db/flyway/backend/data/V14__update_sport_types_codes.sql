UPDATE viteezy.sport_types SET code = 'weight-training' WHERE name = 'Krachttraining';
UPDATE viteezy.sport_types SET code = 'yoga' WHERE name = 'Yoga';
UPDATE viteezy.sport_types SET code = 'rowing' WHERE name = 'Roeien';
UPDATE viteezy.sport_types SET code = 'rugby' WHERE name = 'Rugby';
UPDATE viteezy.sport_types SET code = 'cricket' WHERE name = 'Cricket';
UPDATE viteezy.sport_types SET code = 'foottball' WHERE name = 'Voetbal';
UPDATE viteezy.sport_types SET code = 'tennis' WHERE name = 'Tennis';
UPDATE viteezy.sport_types SET code = 'hockey' WHERE name = 'Hockey';
UPDATE viteezy.sport_types SET code = 'golf' WHERE name = 'Golf';
UPDATE viteezy.sport_types SET code = 'running' WHERE name = 'Hardlopen';
UPDATE viteezy.sport_types SET code = 'others' WHERE name = 'Anders';

# Once any code column in the coming tables got a random UUID value, any new row introduced in the system
# shall have a code value and shall not rely on a random UUID.
# This change does not belong here but to the schemas domain. However, there's no way for making the migrations
# cope with both scenarios at the same time: a new db from scratch vs a pre-existing db.
# There's a clear race condition here and placing the "drop default" inside data is the only way around.
ALTER TABLE `sport_types` ALTER COLUMN `code` DROP DEFAULT;
