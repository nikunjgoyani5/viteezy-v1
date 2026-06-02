update ingredient_units
set pharmacist_unit = 38.00, pharmacist_size = "groot", modification_timestamp = NOW()
where pharmacist_code in (5567805, 5567810, 5567811);