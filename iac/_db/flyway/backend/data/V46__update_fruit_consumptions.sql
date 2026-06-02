UPDATE viteezy.fruit_consumptions SET name = '1' WHERE code = 'one-to-two';
UPDATE viteezy.fruit_consumptions SET name = '2' WHERE code = 'three-to-four';
UPDATE viteezy.fruit_consumptions SET name = '3+' WHERE code = 'more-than-five';
UPDATE viteezy.fruit_consumptions SET name = '0' WHERE code = 'none';

UPDATE viteezy.fruit_consumptions SET code = 'one' WHERE code = 'one-to-two';
UPDATE viteezy.fruit_consumptions SET code = 'two' WHERE code = 'three-to-four';
UPDATE viteezy.fruit_consumptions SET code = 'more-than-three' WHERE code = 'more-than-five';