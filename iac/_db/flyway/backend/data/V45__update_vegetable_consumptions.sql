UPDATE viteezy.vegetable_consumptions SET name = '0 - 100' WHERE code = 'zero-to-one-hundred';
UPDATE viteezy.vegetable_consumptions SET name = '100 - 200' WHERE code = 'two-hundred-to-three-hundred';
UPDATE viteezy.vegetable_consumptions SET name = '200 - 300' WHERE code = 'four-hundred-to-five-hundred';
UPDATE viteezy.vegetable_consumptions SET name = '300+' WHERE code = 'more-than-five-hundred';

UPDATE viteezy.vegetable_consumptions SET code = 'one-hundred-to-two-hundred' WHERE code = 'two-hundred-to-three-hundred';
UPDATE viteezy.vegetable_consumptions SET code = 'two-hundred-to-three-hundred' WHERE code = 'four-hundred-to-five-hundred';
UPDATE viteezy.vegetable_consumptions SET code = 'more-than-three-hundred' WHERE code = 'more-than-five-hundred';


