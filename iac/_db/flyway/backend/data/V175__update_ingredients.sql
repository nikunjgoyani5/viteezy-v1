UPDATE ingredients SET is_vegan = true;
UPDATE ingredients SET is_vegan = false WHERE code in ("vitamin-d", "fish-oil");

UPDATE ingredients SET claim = "Niet geschikt voor personen onder de 18 jaar. Buiten het bereik van kinderen houden. Raadpleeg in het geval van doktersbehandeling, zwangerschap of het geven van borstvoeding altijd eerst je arts of apotheker voordat je een voedingssupplement in gebruikneemt. Stop het gebruik onmiddellijk en raadpleeg een arts als er overgevoeligheidsreacties optreden. Voedingssupplementen zijn geen vervanging voor gevarieerde, evenwichtige voeding en een gezonde leefstijl.";

UPDATE ingredients SET type = "Capsule";
UPDATE ingredients SET type = "Softgel" WHERE code in ("vitamin-d", "fish-oil", "omega-three-vegan");
UPDATE ingredients SET type = "Tablet" WHERE code in ("iron", "vitamin-b12", "vitamin-c", "magnesium", "zinc", "green-tea-extract", "cranberry", "brain-boost");

UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), magnesiumstearaat (antiklontermiddel), carboxymethylcellulose natrium (bevochtigingsmiddel), HPMC (coating), IJzeroxide rood (kleuren)." WHERE code = "iron";
UPDATE ingredients SET excipients = "Mannitol (verstevigingsmiddel), isomalt (verstevigingsmiddel), crospovidon (bevochtigingsmiddel), magnesiumstearaat (antiklontermiddel), siliciumdioxide (antiklontermiddel), vitaminen, aardbeiensmaak (smaakversterker), steviosiden (zoetstof)." WHERE code = "vitamin-b12";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), maltodextrine (vulstof), siliciumdioxide (antiklontermiddel), magnesiumstearaat (antiklontermiddel), wijnsteenzuur (antioxidant) hydroxypropylmethyl cellulose (capsulehuls, verdikkingsmiddel), polyvinylalcohol (verdikkingsmiddel), talk (antiklontermiddel)." WHERE code = "vitamin-c";
UPDATE ingredients SET excipients = "Gelatine (rund)(verstevigingsmiddel), glycerol (geleermiddel), water." WHERE code = "vitamin-d";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), carboxymethyl zetmeel natrium (verdikkingsmiddel), magnesiumstearaat (antiklontermiddel), cellulose (verdikkingsmiddel)." WHERE code = "magnesium";
UPDATE ingredients SET excipients = "Calciumcarbonaat (vulstof), microkristallijne cellulose (vulstof), calciumfosfaat (dibasisch, watervrij)(vulstof)), stearinezuur (antiklontermiddel), magnesiumstearaat (antiklontermiddel), siliciumdioxide (antiklontermiddel), natriumcarboxymethylcellulose (verdikkingsmiddel), cellulose (coating, verdikkingsmiddel), glycerol (geleermiddel), carnaubawas (glansmiddel)." WHERE code = "zinc";
UPDATE ingredients SET excipients = "Calciumcarbonaat (vulstof), microkristallijne cellulose (vulstof), croscarmellose natrium (bevochtigingsmiddel), magnesiumstearaat (antiklontermiddel), maiszetmeel (vulstof), siliciumdioxide (antiklontermiddel), carboxymethylcellulose (bevochtigingsmiddel)." WHERE code = "green-tea-extract";
UPDATE ingredients SET excipients = "Cellulose (capsulehuls, verdikkingsmiddel)" WHERE code = "kurkuma";
UPDATE ingredients SET excipients = "Gelatine (rund)(verstevigingsmiddel), glycerol (geleermiddel), gezuiverd water." WHERE code = "fish-oil";
UPDATE ingredients SET excipients = "Glycerine (geleermiddel), cassave zetmeel (verstevigingsmiddel), water." WHERE code = "omega-three-vegan";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), carboxymethylzetmeel natrium (verdikkingsmiddel), cellulose (coating, verdikkingsmiddel), magnesiumstearaat (antiklontermiddel), ijzeroxide rood (kleuren)." WHERE code = "cranberry";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), siliciumdioxide (antiklontermiddel), cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "sleep-formula";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), siliciumdioxide (antiklontermiddel), cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "energy-formula";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), siliciumdioxide (antiklontermiddel), cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "stress-formula";
UPDATE ingredients SET excipients = "Siliciumdioxide (antiklontermiddel), cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "prenatal-multi";
UPDATE ingredients SET excipients = "Siliciumdioxide (antiklontermiddel), cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "detox-formula";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), siliciumdioxide (antiklontermiddel), cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "hair-and-nail-formula";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "skin-formula";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), siliciumdioxide (antiklontermiddel), cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "libido-formula";
UPDATE ingredients SET excipients = "Cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "gut-support";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), magnesiumstearaat (antiklontermiddel), siliciumdioxide (antiklontermiddel)." WHERE code = "brain-boost";
UPDATE ingredients SET excipients = "Microkristallijne cellulose (vulstof), siliciumdioxide (antiklontermiddel), cellulose (capsulehuls, verdikkingsmiddel)." WHERE code = "hormone-control";