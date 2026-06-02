INSERT INTO
    ingredient_prices(ingredient_id, amount, international_system_unit, price, currency)
values
    (1,10.000, 'MG',4,'EUR'),
    (2,1.000, 'MG',5,'EUR'),
    (3,1000.000, 'MG',5.00,'EUR'),
    (4,50.000, 'MCG',6.00,'EUR'),
    (5,1000.000, 'MG',7.00,'EUR'),
    (6,204.000, 'MG',5.00,'EUR'),
    (8,450.000, 'MG',5.00,'EUR'),
    (17,605.000, 'MG',9.00,'EUR'),
    (19,500.000, 'MG',11.00,'EUR'),
    (20,500.000, 'MG',13.00,'EUR'),
    (21,1.000, 'MG',5.00,'EUR'),
    (22,300.000, 'G',13.00,'EUR'),
    (22,600.000, 'G',24.00,'EUR'),
    (23,300.000, 'G',15.00,'EUR'),
    (23,600.000, 'G',26.00,'EUR'),
    (24,300.000, 'G',14.00,'EUR'),
    (24,600.000, 'G',25.00,'EUR');

# Back up unitless/zero values
INSERT INTO
    ingredient_prices(ingredient_id, amount, international_system_unit, price, currency)
values
(1,0.000, 'UNITLESS',0.00,'EUR'),
(2,0.000, 'UNITLESS',0.00,'EUR'),
(3,0.000, 'UNITLESS',0.00,'EUR'),
(4,0.000, 'UNITLESS',0.00,'EUR'),
(5,0.000, 'UNITLESS',0.00,'EUR'),
(6,0.000, 'UNITLESS',0.00,'EUR'),
(8,0.000, 'UNITLESS',0.00,'EUR'),
(17,0.000, 'UNITLESS',0.00,'EUR'),
(18,0.000, 'UNITLESS',0.00,'EUR'),
(19,0.000, 'UNITLESS',0.00,'EUR'),
(20,0.000, 'UNITLESS',0.00,'EUR'),
(21,0.000, 'UNITLESS',0.00,'EUR'),
(22,0.000, 'UNITLESS',0.00,'EUR'),
(23,0.000, 'UNITLESS',0.00,'EUR'),
(24,0.000, 'UNITLESS',0.00,'EUR');

