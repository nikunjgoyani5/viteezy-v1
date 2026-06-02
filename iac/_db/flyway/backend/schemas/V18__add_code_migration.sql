-- schema migration to add code to tables
ALTER TABLE `genders` ADD `code` varchar(50) NOT NULL DEFAULT UUID();
CREATE UNIQUE INDEX genders_code_uindex ON `genders` (code);

ALTER TABLE `allergies` ADD `code` varchar(50) NOT NULL DEFAULT UUID();
CREATE UNIQUE INDEX allergies_code_uindex ON `allergies` (code);

ALTER TABLE `pregnancies` ADD `code` varchar(50) NOT NULL DEFAULT UUID();
CREATE UNIQUE INDEX pregnancies_code_uindex ON `pregnancies` (code);

ALTER TABLE `amount_of_training` ADD `code` varchar(50) NOT NULL DEFAULT UUID();
CREATE UNIQUE INDEX amount_of_training_code_uindex ON `amount_of_training` (code);

ALTER TABLE `sport_types` ADD `code` varchar(50) NOT NULL DEFAULT UUID();
CREATE UNIQUE INDEX sport_types_code_uindex ON `sport_types` (code);

ALTER TABLE `used_supplements` ADD `code` varchar(50) NOT NULL DEFAULT UUID();
CREATE UNIQUE INDEX used_supplements_code_uindex ON `used_supplements` (code);

ALTER TABLE `vegetable_consumptions` ADD `code` varchar(50) NOT NULL DEFAULT UUID();
CREATE UNIQUE INDEX vegetable_consumptions_code_uindex ON `vegetable_consumptions` (code);

ALTER TABLE `fruit_consumptions` ADD `code` varchar(50) NOT NULL DEFAULT UUID();
CREATE UNIQUE INDEX fruit_consumptions_code_uindex ON `fruit_consumptions` (code);

-- schema migration use snake_case instead of pascal case
ALTER TABLE `used_supplements_answers`
CHANGE `usedSupplement_id` `used_supplement_id`  int(11) NOT NULL;

ALTER TABLE `used_supplements_answers`
DROP INDEX used_supplements_answers_pk_2,
ADD UNIQUE KEY `used_supplements_answers_pk_2` (`quiz_id`, `used_supplement_id`);

ALTER TABLE `used_supplements_answers`
DROP FOREIGN KEY `used_supplements_answers_used_supplements_id_fk`;

ALTER TABLE `used_supplements_answers`
ADD CONSTRAINT `used_supplements_answers_used_supplements_id_fk` FOREIGN KEY (`used_supplement_id`) REFERENCES `used_supplements` (id);
