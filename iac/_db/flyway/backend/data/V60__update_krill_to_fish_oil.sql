UPDATE ingredients SET name = 'Visolie', description = 'fish-oil', code = 'fish-oil', modification_timestamp = NOW()
WHERE code = 'omega-three-krill-oil';

UPDATE blend_ingredient_reasons SET code = 'FISH_OIL_NOT_EATING_ENOUGH_FISH' WHERE code = 'OMEGA_THREE_KRILL_OIL_NOT_EATING_ENOUGH_FISH';