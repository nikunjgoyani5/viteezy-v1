UPDATE present_at_crowded_places SET name = 'Nee' WHERE code = 'no';

UPDATE blend_ingredient_reasons SET description = 'Je geeft aan nauwelijks eiwitten te eten' WHERE code = 'VITAMIN_C_AND_ZINC_NOT_EATING_ENOUGH_PROTEIN';
UPDATE blend_ingredient_reasons SET description = 'Je geeft aan nauwelijks fruit te eten' WHERE code = 'VITAMIN_C_NOT_EATING_ENOUGH_FRUIT';
UPDATE blend_ingredient_reasons SET description = 'Je geeft aan nauwelijks groente te eten' WHERE code = 'VITAMIN_C_NOT_EATING_ENOUGH_VEGETABLE';
UPDATE blend_ingredient_reasons SET description = 'Je geeft aan nauwelijks vezels te eten' WHERE code = 'PROBIOTICA_FIBER';

UPDATE vitamin_intakes SET name = '4+' WHERE code = 'five-plus';

INSERT INTO blend_ingredient_reasons(code, description)
values ('LIBIDO_LOW', 'Je geeft aan dat je libido laag is');

UPDATE genders SET name = 'Genderneutraal' WHERE code = 'gender-neutral';
UPDATE help_goals SET name = 'Een specifiek gezondheidsdoel' WHERE code = 'specific-goal';
UPDATE energy_states SET name = 'Heb ik vaak een middagdip' WHERE code = 'afternoon-dip';
UPDATE nail_improvements SET subtitle = 'Je hebt witte puntjes of droge nagels' WHERE code = 'condition';
UPDATE stress_level_conditions SET subtitle = 'Migraine of drukkend gevoel op hoofd' WHERE code = 'headache';
UPDATE stress_level_conditions SET subtitle = 'Onregelmatige of hoge hartslag' WHERE code = 'palpitations';
UPDATE stress_level_conditions SET subtitle = 'Geen van bovenstaande' WHERE code = 'other';
UPDATE type_of_trainings SET subtitle = 'Bevordert lenigheid' WHERE code = 'flexibility';
UPDATE skin_types SET subtitle = 'Trekkend of schilferend' WHERE code = 'dry';
UPDATE diet_intolerances SET name = 'Lactosevrij' WHERE code = 'lactose-free';
UPDATE diet_intolerances SET name = 'Glutenvrij' WHERE code = 'gluten-free';
UPDATE new_product_availables SET subtitle = 'Jij staat vooraan bij nieuwe producten' WHERE code = 'have-it-first';