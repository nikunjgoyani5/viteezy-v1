INSERT INTO products (name, category, description, code, url, is_vegan, is_active)
VALUES
("(No) Stress Balance Bundel", "Stress", "Is je lontje korter dan je eigenlijk wil? Ben je uitgeblust na een dag? Opgejaagd of een onrustig gevoel? Wil je (ook) dat jouw balans terugkomt en ontspanning weer een onderdeel wordt van jouw leven? Laat je lichaam herstellen met de (No) Stress Balance Bundel. De krachtige, met zorg geselecteerde combinatie helpt jou van binnenuit.", "stress-bundle", "stress", true, true),
("Energy Bundel", "Vermoeidheid", "Zeg dag tegen inkakkers. Met de Energy Bundel kan jij de wereld aan en is je middagdip verleden tijd. De meest krachtige ingrediënten uit de natuur zijn gebundeld in een dagelijkse samenstelling om jouw energieniveau op pijl te houden.", "energy-bundle", "energie", true, true),
("Vegan Support Bundel", null, "Het is niet altijd gemakkelijk om vegan te zijn. Door deze lifestyle keuze kan het zijn dat je bepaalde vitamines misloopt. Wij zorgen ervoor dat je door kan blijven gaan, zonder hier last van te krijgen. Bouw een sterke basis met essentiële voedingsstoffen voor vegetariërs, alles in één handige dagelijkse verpakking.", "vegan-bundle", "vegan", true, true),
("Happy Gut Bundel", "Opgeblazen buik", "We hebben het dagelijks al druk genoeg. Het in balans houden van de miljarden levende micro-organismen in onze microbioom, is een flinke taak erbij. De Happy Gut bundel, samengesteld met essentiële natuurlijke vitamines voor je darmen neemt deze zorg voor je weg.", "gut-bundle", "gut", true, true),
("Daily Essentials Bundel", "Weerstand", "Geen tijd voor een verminderde weerstand? We got you! Een druk en actief leven, voor jezelf willen zorgen zonder dat je er uren bij stil moet staan. Wij nemen de zorgen weg en creëren een boost voor jouw immuunsysteem en weerstand dankzij de Daily Essentials bundel. Een speciale samenstelling met dagelijkse toevoeging van vitamine voor iedereen die het allerbeste voor zichzelf wil.", "daily-bundle", "daily", true, true),
("All Day Glow Bundel", null, "We verzorgen ons haar en onze huid vaak alleen van buitenaf. Maar echte schoonheid begint van binnenuit. Met de All Day Glow Bundel laat jij jezelf dankzij de krachtige en natuurlijke ingrediënten, van buiten stralen. Een vegan samenstelling om jouw lichaam te voeden, daar waar nodig is. Voel je op je best en glow all day.", "all-day-bundle", "all-day", true, true),
("Superwoman Bundel", null, "Om optimaal te blijven bloeien, kunnen we altijd wel een extra boost gebruiken. Een met zorg geselecteerde samenstelling in een handig dagelijks zakje komt dan goed van pas. Het bevat essentiële vitamines en mineralen die wij als powervrouwen dagelijks nodig hebben om wonderen te verrichten.", "super-woman-bundle", "vrouw", true, true);

INSERT INTO product_ingredients (product_id, ingredient_id)
VALUES (1, 30), (1, 5), (1, 19),
(2, 29), (2, 3), (2, 19),
(3, 2), (3, 20), (3, 37),
(4, 1), (4, 19), (4, 37),
(5, 3), (5, 4), (5, 6), (5, 19),
(6, 4), (6, 33), (6, 34),
(7, 1), (7, 4), (7, 39);