ALTER TABLE `vitamin_opinions`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `vitamin_opinions` SET subtitle = 'Je weet meer dan de gemiddelde persoon' WHERE code = 'well-informed';
UPDATE `vitamin_opinions` SET subtitle = 'Je wilt je kennis verbreden' WHERE code = 'curious';
UPDATE `vitamin_opinions` SET subtitle = 'Je bent nog niet overtuigd' WHERE code = 'skeptical';

ALTER TABLE `help_goals`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `help_goals` SET subtitle = 'Je wilt ergens aan werken' WHERE code = 'specific-goal';
UPDATE `help_goals` SET subtitle = 'Je wilt goed voor jezelf zorgen' WHERE code = 'total-health';
UPDATE `help_goals` SET subtitle = 'Je wilt iets nieuws proberen' WHERE code = 'discover';

ALTER TABLE `stress_level_at_end_of_days`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `stress_level_at_end_of_days` SET subtitle = 'Rusteloos, moeite met ontspannen' WHERE code = 'hyper';
UPDATE `stress_level_at_end_of_days` SET subtitle = 'Futloos, nergens energie voor' WHERE code = 'burnt-out';

ALTER TABLE `stress_level_conditions`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `stress_level_conditions` SET subtitle = 'Druk op de borst' WHERE code = 'short-of-breath';
UPDATE `stress_level_conditions` SET subtitle = 'Stijve schouders of nek' WHERE code = 'problems-with-muscles';
UPDATE `stress_level_conditions` SET subtitle = 'Moeite met inslapen of doorslapen' WHERE code = 'sleep-problems';
UPDATE `stress_level_conditions` SET subtitle = 'Aangespannen buik' WHERE code = 'stomach-ache';
UPDATE `stress_level_conditions` SET subtitle = 'Migraine, drukkend gevoel op hoofd' WHERE code = 'headache';
UPDATE `stress_level_conditions` SET subtitle = 'Onregelmatige, hoge harstlag' WHERE code = 'palpitations';

ALTER TABLE `type_of_trainings`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `type_of_trainings` SET subtitle = 'Oefeningen waar je sterker van wordt' WHERE code = 'strengthening';
UPDATE `type_of_trainings` SET subtitle = 'Bevat interval training' WHERE code = 'high-intensity';
UPDATE `type_of_trainings` SET subtitle = 'Bevat cardio oefeningen' WHERE code = 'endurance';
UPDATE `type_of_trainings` SET subtitle = 'Bevorderd lenigheid' WHERE code = 'flexibility';

ALTER TABLE `hair_types`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `hair_types` SET subtitle = 'Veel haaruitval tijdens wassen en kammen' WHERE code = 'getting-thinner';
UPDATE `hair_types` SET subtitle = 'Geen natuurlijke glans' WHERE code = 'dry';
UPDATE `hair_types` SET subtitle = 'Gespleten punten, of schade van haarbehandelingen' WHERE code = 'damaged';
UPDATE `hair_types` SET subtitle = 'Het is nooit zo lang als je wenst' WHERE code = 'slow-growing';

ALTER TABLE `nail_improvements`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `nail_improvements` SET subtitle = 'Soms breken je nagels' WHERE code = 'power';
UPDATE `nail_improvements` SET subtitle = 'Het duurt lang voordat ze groeien' WHERE code = 'length';
UPDATE `nail_improvements` SET subtitle = 'Conditie' WHERE code = 'condition';

ALTER TABLE `skin_types`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `skin_types` SET subtitle = 'Trekkende of schilferende huid' WHERE code = 'dry';
UPDATE `skin_types` SET subtitle = 'Glimmend' WHERE code = 'fat';
UPDATE `skin_types` SET subtitle = 'Vlekjes of bultjes' WHERE code = 'restless';
UPDATE `skin_types` SET subtitle = 'Grauw' WHERE code = 'dull';
UPDATE `skin_types` SET subtitle = 'Niet te vet en niet te droog' WHERE code = 'pretty-fine';

ALTER TABLE `skin_problems`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `skin_problems` SET subtitle = 'Puistjes of mee-eters' WHERE code = 'acne';
UPDATE `skin_problems` SET subtitle = 'Donkere plekken of verkleuring' WHERE code = 'pigment-spots';
UPDATE `skin_problems` SET subtitle = 'Kraaiepoten of fronsrimpels' WHERE code = 'wrinkles';
UPDATE `skin_problems` SET subtitle = 'Afname van stevigheid' WHERE code = 'elasticity';
UPDATE `skin_problems` SET subtitle = 'Denk alvast vooruit' WHERE code = 'skin-aging';

ALTER TABLE `lose_weight_challenges`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `lose_weight_challenges` SET subtitle = 'Onvoldoende beweging' WHERE code = 'movement';
UPDATE `lose_weight_challenges` SET subtitle = 'Ongezonde basis' WHERE code = 'overall-nutrition';
UPDATE `lose_weight_challenges` SET subtitle = 'Ongezonde snacks' WHERE code = 'snacks';
UPDATE `lose_weight_challenges` SET subtitle = 'Moeilijk vol te houden' WHERE code = 'discipline';
UPDATE `lose_weight_challenges` SET subtitle = 'Weet niet waar te beginnen' WHERE code = 'insufficient-knowledge';
UPDATE `lose_weight_challenges` SET subtitle = 'Kom niet op oude gewicht' WHERE code = 'pregnancy-kilos';
UPDATE `lose_weight_challenges` SET subtitle = 'Hormonen...' WHERE code = 'menopause';

ALTER TABLE `eastern_medicine_opinions`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `eastern_medicine_opinions` SET subtitle = 'We kunnen veel leren van oude geneeskunde' WHERE code = 'convinced';
UPDATE `eastern_medicine_opinions` SET subtitle = 'Meer informatie nodig voor een mening' WHERE code = 'open-minded';
UPDATE `eastern_medicine_opinions` SET subtitle = 'Alternatieve geneeskunde is onzin' WHERE code = 'skeptical';

ALTER TABLE `new_product_availables`
  add column IF NOT EXISTS `subtitle` varchar(128) after code;

UPDATE `new_product_availables` SET subtitle = 'Jij staat vooraan bij nieuwe dingen' WHERE code = 'have-it-first';
UPDATE `new_product_availables` SET subtitle = 'Jij bent voorzichtig optimistisch' WHERE code = 'knowing-more';
UPDATE `new_product_availables` SET subtitle = 'Wetenschappelijk onderzoek heeft tijd nodig' WHERE code = 'wait';