INSERT INTO
    ingredient_prices(ingredient_id, amount, international_system_unit, price, currency)
VALUES
    (37, 10.000, 'MG', 14, 'EUR'),
    (38, 10.000, 'MG', 12, 'EUR'),
    (39, 10.000, 'MG', 14, 'EUR');

# Back up unitless/zero values
INSERT INTO
    ingredient_prices(ingredient_id, amount, international_system_unit, price, currency)
VALUES
    (37, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (38, 0.000, 'UNITLESS', 0.00, 'EUR'),
    (39, 0.000, 'UNITLESS', 0.00, 'EUR');