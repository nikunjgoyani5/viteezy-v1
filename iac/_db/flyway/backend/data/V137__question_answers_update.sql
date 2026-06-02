UPDATE stress_level_conditions SET subtitle = 'Snellere ademhaling' WHERE code = 'short-of-breath';
UPDATE stress_level_conditions SET subtitle = 'Vastzittende spieren' WHERE code = 'problems-with-muscles';
UPDATE stress_level_conditions SET subtitle = 'Moeite met in slaap vallen en/of doorslapen' WHERE code = 'sleep-problems';
UPDATE stress_level_conditions SET subtitle = 'Aangespannen of gevoelige buik' WHERE code = 'stomach-ache';
UPDATE stress_level_conditions SET subtitle = 'Drukkend gevoel in of op je hoofd' WHERE code = 'headache';
UPDATE stress_level_conditions SET subtitle = 'Versnelde hartslag' WHERE code = 'palpitations';

UPDATE hair_types SET subtitle = 'Mag wat voller zijn' WHERE code = 'getting-thinner';
UPDATE hair_types SET subtitle = 'Is droog' WHERE code = 'dry';
UPDATE hair_types SET subtitle = 'Heeft gespleten punten' WHERE code = 'damaged';
UPDATE hair_types SET subtitle = 'Is nooit zo lang als je wenst' WHERE code = 'slow-growing';

UPDATE skin_types SET name = 'Trekkend' WHERE code = 'dry';
UPDATE skin_types SET name = 'Glimmend' WHERE code = 'fat';

UPDATE skin_problems SET name = 'Puistjes' WHERE code = 'acne';
UPDATE skin_problems SET name = 'Verkleuringen' WHERE code = 'pigment-spots';
UPDATE skin_problems SET name = 'Lijntjes' WHERE code = 'wrinkles';
UPDATE skin_problems SET name = 'Mindere elasticiteit' WHERE code = 'elasticity';
UPDATE skin_problems SET name = 'Veroudering' WHERE code = 'skin-aging';

UPDATE lose_weight_challenges SET subtitle = NULL WHERE code = 'overall-nutrition';
UPDATE lose_weight_challenges SET name = 'Zwangerschap' WHERE code = 'pregnancy-kilos';

UPDATE allergy_types SET name = 'Soja' WHERE code = 'soy';
UPDATE allergy_types SET name = 'Pollen' WHERE code = 'hay-fever';