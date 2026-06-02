INSERT INTO
    ingredient_prices(ingredient_id, amount, international_system_unit, price, currency)
VALUES
    (28, 10.000, 'MG', 11, 'EUR'),
    (29, 10.000, 'MG', 10, 'EUR'),
    (30, 10.000, 'MG', 9, 'EUR'),
    (31, 10.000, 'MG', 19, 'EUR'),
    (32, 10.000, 'MG', 9, 'EUR'),
    (33, 10.000, 'MG', 11, 'EUR'),
    (34, 10.000, 'MG', 9, 'EUR'),
    (35, 10.000, 'MG', 15, 'EUR'),
    (36, 10.000, 'MG', 9, 'EUR');

# Back up unitless/zero values
INSERT INTO
    ingredient_prices(ingredient_id, amount, international_system_unit, price, currency)
VALUES
    (28, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (29, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (30, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (31, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (32, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (33, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (34, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (35, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (36, 0.000, 'UNITLESS', 0.00, 'EUR');





