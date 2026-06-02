"use strict";

angular.module("app.static.ingredient-reason", [])
  .service("IngredientReason", function () {

    const IRON = "iron";
    const VITAMIN_B_12 = "vitamin-b12";
    const VITAMIN_C = "vitamin-c";
    const VITAMIN_D = "vitamin-d";
    const MAGNESIUM = "magnesium";
    const ZINC = "zinc";
    const GREEN_TEA_EXTRACT = "green-tea-extract";
    const KURKUMA = "kurkuma";
    const FISH_OIL = "fish-oil";
    const OMEGA_THREE_VEGAN = "omega-three-vegan";
    const CRANBERRY = "cranberry";
    const SLEEP_FORMULA = "sleep-formula";
    const ENERGY_FORMULA = "energy-formula";
    const STRESS_FORMULA = "stress-formula";
    const PRENATAL_FORMULA = "prenatal-multi";
    const DETOX_FORMULA = "detox-formula";
    const HAIR_AND_NAIL_FORMULA = "hair-and-nail-formula";
    const SKIN_FORMULA = "skin-formula";
    const LIBIDO_FORMULA = "libido-formula";
    const GUT_SUPPORT = "gut-support";
    const HORMONE_CONTROL = "hormone-control";
    const BRAIN_BOOST = "brain-boost";

    this.setIngredient = (ingredient) => {
      this.ingredient = ingredient;
    };

    this.getIngredient = () => {
      return this.ingredient;
    };

    this.getIngredientReasonDescription = () => {
      if (!this.ingredient.explanation) {
        this.ingredient.explanation = [''];
      }

      let description = '';
      switch (this.ingredient.code) {
        case CRANBERRY:
          switch (this.ingredient.explanation[0]) {
            case 'Je vindt het een uitdaging voldoende fruit te eten':
              description = 'Cranberries staan voornamelijk bekend als middel tegen blaasontsteking. Dit cranberry tablet bevat tevens vitamine C en zorgt tevens voor een goede weerstand. Vitamine C helpt het immuunsysteem. Het eten van voldoende fruit is essentieel voor een goede weerstand.';
              break;
            case 'Je geeft aan regelmatig last te hebben van een blaasontsteking':
              description = 'Cranberries staan voornamelijk bekend als middel tegen blaasontsteking. Cranberry bevat, naast vitamine C, zogenoemde proanthocyanidinen. Proanthocyanidinen zorgen ervoor dat bacteriën zich niet aan de blaaswand kunnen hechten.'
              break;
            default:
              this.ingredient.explanation = ['Cranberry ondersteunt de gezondheid van de blaas'];
              description = 'Cranberries staan voornamelijk bekend als middel tegen blaasontsteking. Dit cranberry tablet bevat tevens vitamine C en zorgt tevens voor een goede weerstand. Vitamine C helpt het immuunsysteem. Het eten van voldoende fruit is essentieel voor een goede weerstand.';
              break;
          }
          break;
        case GREEN_TEA_EXTRACT:
          switch (this.ingredient.explanation[0]) {
            case 'Je geeft aan dat je graag wilt afvallen':
              description = 'Groene thee is van belang voor de vetverbranding in het lichaam. Tijdens het afvallen kan dit ondersteunend werken. Daarnaast ondersteunt groene thee de energiehuishouding in je lichaam, voor een fit gevoel tijdens het afvallen.';
              break;
            default:
              this.ingredient.explanation = ['Groene thee extract voor de vetverbranding'];
              description = 'Groene thee is van belang voor de vetverbranding in het lichaam. Tijdens het afvallen kan dit ondersteunend werken. Daarnaast ondersteunt groene thee de energiehuishouding in je lichaam voor een fit gevoel tijdens het afvallen.';
              break;
          }
          break;
        case IRON:
          switch (this.ingredient.explanation[0]) {
            case 'Je hebt aangegeven dat je zwanger bent of borstvoeding geeft':
              description = 'Dit ijzer supplement bevat 14 mg ijzer, 100% van de aanbevolen dagelijkse hoeveelheid. Een geschikte dosering tijdens de zwangerschap, want dan kun je wel wat extra ijzer gebruiken. Je lichaam maakt namelijk meer dan één liter bloed aan tijdens de zwangerschap. Hiervoor is extra ijzer nodig.';
              break;
            case 'Je hebt aangegeven dat je relatief weinig energie hebt':
              description = 'IJzer ondersteunt het energie niveau, want het helpt energie vrij te maken uit eiwitten, koolhydraten en vetten die je via de voeding binnenkrijgt. IJzer draagt tevens bij tot de vermindering van vermoeidheid en moeheid.';
              break;
            case 'Je geeft aan dat je huisarts je ijzer aanbeveelt':
              description = 'Als je een ijzertekort hebt, merk je dat meestal niet gelijk. Pas als het lichaam de ijzervoorraad heeft verbruikt ontstaan er klachten, zoals vermoeidheid en een bleke huid. IJzer heeft een gunstige invloed op de vermindering van vermoeidheid en moeheid en ondersteunt het energieniveau.';
              break;
            case 'Je geeft aan dat je nooit vlees eet':
              description = 'Onderzoek toont aan dat een ijzer tekort minder vaak voorkomt bij mensen die regelmatig vlees eten. Vlees is namelijk het product met de meest toegangbare vorm van ijzer, heemijzer. IJzer heeft een gunstige invloed op de vermindering van vermoeidheid en moeheid en ondersteunt het energieniveau.'
              break;
            default:
              this.ingredient.explanation = ['IJzer ondersteunt het energieniveau'];
              description = 'IJzer ondersteunt het energie niveau, want het helpt energie vrij te maken uit eiwitten, koolhydraten en vetten die je via de voeding binnenkrijgt. IJzer draagt tevens bij aan de vermindering van vermoeidheid en moeheid.';
              break;
          }
          break;
        case KURKUMA:
          switch (this.ingredient.explanation[0]) {
            case 'Je geeft aan dat je veel stress ervaart':
            case 'Je geeft aan dat je graag stress wilt verminderen':
              description = 'Recente onderzoeken suggereren dat kurkuma een positief effect kan hebben op de stemming en de reactie op stress. Meer klinische studies moeten worden uitgevoerd om deze resultaten te bevestigen, maar de eerste klinische onderzoeken zijn veelbelovend.';
              break;
            default:
              this.ingredient.explanation = ['De vele voordelen van Kurkuma'];
              description = 'Recente onderzoeken suggereren dat kurkuma een positief effect kan hebben op de stemming en de reactie op stress. Meer klinische studies moeten worden uitgevoerd om deze resultaten te bevestigen, maar de eerste klinische onderzoeken zijn veelbelovend.';
              break;
          }
          break;
        case MAGNESIUM:
          switch (this.ingredient.explanation[0]) {
            case 'Je hebt aangegeven dat je graag stress wilt verminderen':
              description = 'Magnesium draagt bij aan een heldere geest en is gunstig voor een goede geestelijke balans. Stress zorgt ervoor dat je lichaam meer magnesium gebruikt dan normaal, waardoor je magnesiumvoorraad afneemt';
              break;
            case 'Je hebt aangegeven dat je relatief weinig slaapt':
              description = 'Magnesium heeft een positieve invloed op de werking van het zenuwstelsel. Magnesium draagt ook bij aan een heldere geest.';
              break;
            case 'Je hebt aangegeven dat je vaak sport':
            case 'Je geeft aan vaak te sporten':
            case 'Je geeft aan intensief te trainen':
              description = 'Wanneer je vaak sport, is het belangrijk om genoeg magnesium binnen te krijgen. Je lichaam vraagt namelijk veel energie bij het sporten. Magnesium is belangrijk voor het behoud van de spieren. ';
              break;
            case 'Je geeft aan meer dan vier koppen koffie per dag te drinken':
              description = 'Er zijn meerdere onderzoeken die aantonen dat wanneer je koffie drinkt, de darmwand minder magnesium kan opnemen. Magnesium ondersteunt het energieniveau, is goed voor de spieren en is goed voor het geheugen. Ons lichaam kan zelf geen magnesium aanmaken, dus als je veel koffie drinkt, kun je overwegen om magnesium te slikken. ';
              break;
            default:
              this.ingredient.explanation = ['De vele voordelen van Magnesium '];
              description = 'Magnesium heeft een positieve invloed op de werking van het zenuwstelsel. Magnesium draagt ook bij aan een heldere geest. Wanneer je vaak sport, is het tevens belangrijk om genoeg magnesium binnen te krijgen. Je lichaam vraagt namelijk veel energie bij het sporten.';
              break;
          }
          break;
        case VITAMIN_B_12:
          switch (this.ingredient.explanation[0]) {
            case 'Je hebt aangegeven dat je ouder bent dan 55 jaar':
              description = 'Als je ouder bent dan 55 jaar, verloopt de opname van Vitamine B12 vaak minder efficiënt. De productie van maagsap neem vaak af als je ouder wordt en hierdoor wordt  vitamine B12 minder goed opgenomen. Hierdoor is het raadzaam om extra Vitamine B12 te slikken.';
              break;
            case 'Je hebt aangegeven dat je vegetariër bent':
              description = 'Vitamine B12 wordt voornamelijk verkregen uit dierlijke producten (denk aan vlees vis, melk, eieren, kaas en yoghurt). Vegetariërs krijgen mogelijk niet genoeg vitamine B12 aangezien zij minder van deze producten binnenkrijgen.';
              break;
            case 'Je hebt aangegeven dat je veganist bent':
              description = 'Vitamine B12 wordt voornamelijk verkregen uit dierlijke producten (denk aan vlees vis, melk, eieren, kaas en yoghurt). Veganisten krijgen mogelijk niet genoeg vitamine B12 aangezien zij minder deze producten niet binnenkrijgen.';
              break;
            case 'Je geeft aan een gebrek aan concentratie en focus te hebben':
              description = 'Vitamine B12 is een belangrijke stof voor de aanmaak van rode bloedcellen en zenuwcellen in het lichaam. Een gebrek aan focus en concentratie kan liggen aan externe prikkels maar ook aan een vitamine B12 tekort. Vitamine B12 is goed voor het concentratievermogen en het geheugen. ';
              break;
            case 'Je geeft aan dat je nooit vlees eet':
              description = 'Vitamine B12 wordt voornamelijk verkregen uit dierlijke producten (denk aan vlees, vis, melk, eieren, kaas en yoghurt). Indien je weinig vlees eet krijg je mogelijk niet genoeg vitamine B12 binnen. Vitamine B12 draagt bij aan het normale functioneren van het immuunsysteem.';
              break;
            case 'Je geeft aan dat je veganistisch bent':
              description = 'Vitamine B12 wordt voornamelijk verkregen uit dierlijke producten (denk aan vlees vis, melk, eieren, kaas en yoghurt). Veganisten krijgen mogelijk niet genoeg vitamine B12 aangezien zij minder van deze producten binnenkrijgen. Vitamine B12 draagt bij aan het normale functioneren van het immuunsysteem.';
              break;
            case 'Je geeft aan dat je vegetarisch bent':
              description = 'Vitamine B12 wordt voornamelijk verkregen uit dierlijke producten (denk aan vlees vis, melk, eieren, kaas en yoghurt). Vegetariërs krijgen mogelijk niet genoeg vitamine B12 aangezien zij minder van deze producten binnenkrijgen. Vitamine B12 draagt bij aan het normale functioneren van het immuunsysteem.';
              break;
            default:
              this.ingredient.explanation = ['Vitamine B12 ondersteunt het immuunsysteem'];
              description = 'Vitamine B12 wordt voornamelijk verkregen uit dierlijke producten (denk aan vlees, vis, melk, eieren, kaas en yoghurt). Mensen die weinig vlees eten krijgen mogelijk niet genoeg vitamine B12.';
              break;
          }
          break;
        case VITAMIN_C:
          switch (this.ingredient.explanation[0]) {
            case 'Je vindt het een uitdaging voldoende groente te eten':
              description = 'Veel Nederlanders eten niet genoeg groente. Volwassenen krijgen het advies om minimaal 250 gram groente per dag te eten. Groente zit boordevol vitamine C, dus als je er niet genoeg van eet, kun je overwegen om vitamine C te slikken.';
              break;
            case 'Je geeft aan dat je rookt':
              description = 'Extra vitamine C is verstandig voor rokers. Zo hebben mensen die roken meer vitamine C nodig dan de dagelijks aanbevolen hoeveelheid. Door het roken wordt er meer van deze vitamine afgebroken. Hierdoor is het raadzaam om extra vitamine C te slikken.';
              break;
            case 'Je geeft aan dat je ouder bent dan 65':
              description = 'Voor ouderen kan een sterk immuunsysteem van groot belang zijn. Naarmate je ouder wordt, wordt je kwetsbaarder voor ziektes en infecties. Het immuunsysteem houdt ziekteverwekkers tegen en beschermt tegen infecties. Vitamine C heeft een positieve invloed op het immuunsysteem en ondersteunt de afweer van het lichaam.';
              break;
            case 'Je geeft aan nauwelijks fruit te eten':
              description = 'Veel Nederlanders eten niet genoeg fruit. Fruit zit boordevol vitamine C. Ons lichaam kan zelf geen vitamine C aanmaken, dus als je onvoldoende fruit eet, kun je overwegen om extra vitamine C te slikken. Vitamine C ondersteunt het immuunsysteem en zorgt mede voor een goede weerstand. ';
              break;
            case 'Je geeft aan nauwelijks groente te eten':
              description = 'Veel Nederlanders eten niet genoeg groente. Groente zit boordevol vitamine C. Ons lichaam kan zelf geen vitamine C aanmaken, dus als je onvoldoende groente eet, kun je overwegen om extra vitamine C te slikken. Vitamine C ondersteunt het immuunsysteem en zorgt mede voor een goede weerstand';
              break;
            case 'Je geeft aan dat weerstand een belangrijk onderwerp is voor je':
            case 'Je geeft aan vaak op drukke plekken te komen':
            case 'Je geeft aan vatbaar te zijn voor verkoudheid of griep':
              description = 'Het immuunsysteem beschermt het lichaam tegen lichaamsvreemde stoffen waar het continu aan bloot wordt gesteld, zoals bacteriën, virussen en gifstoffen. Vitamine C helpt het natuurlijk immuunsysteem van de lichaamscellen en ondersteunt de afweer van het lichaam.';
              break;
            case 'Je geeft aan nauwelijks eiwitten te eten':
              description = 'Eiwitten zijn essentieel voor de groei en ontwikkeling van het lichaam. Een tekort hieraan kan gevolgen hebben voor je gezondheid, waaronder een verminderde weerstand en minder sterke botten. Vitamine C heeft een positieve invloed op het immuunsysteem en draagt bij aan de instandhouding van sterke botten. ';
              break;
            default:
              this.ingredient.explanation = ['Vitamine C ondersteunt het immuunsysteem'];
              description = 'Veel Nederlanders eten niet genoeg groente. Volwassenen krijgen het advies om minimaal 250 gram groente per dag te eten. Groente zit boordevol vitamine C, dus als je er niet genoeg van eet, kun je overwegen om vitamine C te slikken.';
              break;
          }
          break;
        case VITAMIN_D:
          switch (this.ingredient.explanation[0]) {
            case 'Je geeft aan dat je minder dan 30 minuten direct zonlicht krijgt':
              description = 'In de winter heeft bijna 60% van de Nederlanders een vitamine D tekort. In de wintermaanden is de zon in Nederland te zwak om voldoende vitamine D aanmaak in de huid mogelijk te maken. Vitamine D ondersteunt het immuunsysteem.';
              break;
            case 'Je geeft aan dat je vegetarisch bent':
              description = 'De voedingsmiddelen die rijk zijn aan vitamine D zijn vooral de dierlijke voedingsmiddelen zoals: vette vis, vlees en eieren. Indien je weinig dierlijke producten eet krijg je mogelijk niet genoeg vitamine D binnen. Vitamine D helpt de normale werking van het immuunsysteem.';
              break;
            default:
              this.ingredient.explanation = ['Zonlicht is de belangrijkste bron van Vitamine D'];
              description = 'In de winter heeft bijna 60% van de Nederlanders een vitamine D tekort. Veel mensen komen te weinig buiten om voldoende natuurlijke vitamine D aan te maken. In de wintermaanden is de zon in Nederland te zwak om voldoende vitamine D aanmaak in de huid mogelijk te maken';
              break;
          }
          break;
        case ZINC:
          switch (this.ingredient.explanation[0]) {
            case 'Je geeft aan dat je zwanger bent of borstvoeding geeft':
              description = 'Zink speelt tijdens de zwangerschap een belangrijke rol bij diverse belangrijke processen.  Zink is ondermeer nodig bij de opbouw van eiwitten, de groei en ontwikkeling van weefsel, en een goede werking van het afweer- en immuunsysteem.';
              break;
            case 'Je geeft aan dat weerstand een belangrijk onderwerp is voor je':
            case 'Je geeft aan vaak op drukke plekken te komen':
            case 'Je geeft aan vatbaar te zijn voor verkoudheid of griep':
              description = 'Het immuunsysteem is een onmisbaar onderdeel van het lichaam. Het houdt ziekteverwekkers tegen en beschermt tegen infecties. Zink heeft een positieve invloed op het immuunsysteem en draagt bij aan een normale werking van het immuunsysteem. ';
              break;
            case 'Je geeft aan nauwelijks eiwitten te eten':
              description = 'Eiwitten zijn essentieel voor de groei en ontwikkeling van het lichaam. Een tekort hieraan kan gevolgen hebben voor je gezondheid, waaronder een verminderde weerstand en het verlies van spieren. Zink helpt bij het opbouwen van lichaamseiwit en draagt bij tot een normale eiwit synthese. ';
              break;
            case 'Je geeft aan in de komende jaren een kinderwens te hebben':
              description = 'Bij één op de drie stellen die het niet lukt om binnen een jaar zwanger te worden, ligt de oorzaak bij de vruchtbaarheid van de man. Meestal is de man wel vruchtbaar, maar is de kwaliteit van het sperma niet optimaal. Zink is goed voor de vruchtbaarheid van de man en draagt bij aan de kwaliteit van het sperma.';
              break;
            default:
              this.ingredient.explanation = ['Zink is essentieel voor het menselijke lichaam'];
              description = 'Zink speelt onder andere tijdens de zwangerschap een belangrijke rol bij diverse belangrijke processen.  Zink is ondermeer nodig bij de opbouw van eiwitten, de groei en ontwikkeling van weefsel en een goede werking van het afweer- en immuunsysteem.';
              break;
          }
          break;
        case FISH_OIL:
          switch (this.ingredient.explanation[0]) {
            case 'Je geeft aan nooit of nauwelijks vette vis te eten':
              description = 'De Gezondheidsraad adviseert om één keer per week te vis eten en dan vooral vette vis. Vette vis bevat namelijk veel omega 3 vetzuren. Als je nooit vette vis eet, is visolie een goed alternatief als aanvulling op je voeding.';
              break;
            case 'Je geeft aan last te hebben van acne op je borst of rug':
            case 'Je geeft aan last te hebben van acne op je wangen, neus of voorhoofd':
              description = 'Je huid is een uiterlijke indicator van je innerlijke gezondheid. Problemen met je huid zijn vaak reactie op onstekingsprocessen of een onbalans in je lichaam. Omega 3 heeft een ontstekingsremmende werking.';
              break;
            case 'Je geeft aan meer dan drie keer per week vlees te eten':
              description = 'Vlees is een goede bron van eiwitten. Ons lichaam heeft eiwitten nodig om goed te functioneren. Vlees bevat veel arachidonzuur dat een belangrijke rol bij ontstekingen speelt. Ontstekingsremmende voeding is onder andere Omega 3 (vis, noten), groenten en fruit. Visolie is een effectieve bron van omega 3. ';
              break;
            case 'Je geeft aan dat je nooit vis eet':
              description = 'De Gezondheidsraad adviseert om één keer per week vis te eten en dan vooral vette vis. Visolie is een goed alternatief voor mensen die nooit vis eten. In vette vis zitten namelijk veel omega 3 vetzuren, zoals DHA. DHA is goed voor de hersenen. ';
              break;
            case 'Je geeft aan moeite te hebben met focussen':
            case 'Je geeft aan een gebrek aan concentratie te hebben':
            case 'Je geeft aan dat je soms niet op woorden kan komen':
            case 'Je geeft aan vergeetachtigheid te ervaren':
            case 'Je geeft aan een gebrek aan motivatie te hebben':
            case 'Je geeft aan je neerslachtig te voelen':
            case 'Je geeft aan dat je regelmatig piekert':
            case 'Je geeft aan angst gevoelens te ervaren':
            case 'Je geeft aan dat je scherp wilt blijven':
            case 'Je geeft aan te willen focussen op je geheugen':
            case 'Je geeft aan te willen focussen op je mentale fitheid':
            case 'Je geeft aan te willen focussen op je concentratie':
              description = 'DHA is het omega 3 vetzuur wat goed is voor onze hersenen. Het is dan ook niet voor niets een belangrijke bouwsteen voor je brein. Visolie wordt ook wel de basis genoemd van de hersenen. In combinatie met de Brain Boost kan je naast het onderhouden van de basis, focussen op het ondersteunen van specifieke functies van de hersenen.';
              break;
            default:
              this.ingredient.explanation = ['DHA is goed voor de hersenen*'];
              description = 'De Gezondheidsraad adviseert om één keer per week te vis eten en dan vooral vette vis. In vette vis zitten namelijk veel omega 3 vetzuren. Als je nooit vette vis eet, is visolie een goed alternatief als aanvulling op je voeding.';
              break;
          }
          break;
        case OMEGA_THREE_VEGAN:
          switch (this.ingredient.explanation[0]) {
            case 'Je hebt aangegeven veganistisch te zijn':
              description = 'De Gezondheidsraad adviseert om één keer per week vis te eten en dan vooral vette vis. In vette vis zitten namelijk veel omega 3 vetzuren. Algenolie is een geweldig alternatief voor visolie voor vegetariërs of veganisten die EPA en DHA in hun voeding willen opnemen.';
              break;
            case 'Je geeft aan last te hebben van acne op je borst of rug':
            case 'Je geeft aan last te hebben van acne op je wangen, neus of voorhoofd':
              description = 'Je huid is een uiterlijke indicator van je innerlijke gezondheid. Problemen met je huid zijn vaak reactie op onstekingsprocessen of een onbalans in je lichaam. Omega 3 heeft een ontstekingsremmende werking.';
              break;
            case 'Je geeft aan dat je nooit vis eet':
            case 'Je geeft aan dat je veganistisch bent':
            case 'Je geeft aan dat je vegetarisch bent':
              description = 'De Gezondheidsraad adviseert om één keer per week vis te eten en dan vooral vette vis. Algenolie is een goed alternatief voor visolie voor mensen die nooit vis eten. In vette vis zitten namelijk veel omega 3 vetzuren, zoals DHA. DHA is goed voor de hersenen. ';
              break;
            case 'Je geeft aan moeite te hebben met focussen':
            case 'Je geeft aan een gebrek aan concentratie te hebben':
            case 'Je geeft aan dat je soms niet op woorden kan komen':
            case 'Je geeft aan vergeetachtigheid te ervaren':
            case 'Je geeft aan een gebrek aan motivatie te hebben':
            case 'Je geeft aan je neerslachtig te voelen':
            case 'Je geeft aan dat je regelmatig piekert':
            case 'Je geeft aan angst gevoelens te ervaren':
            case 'Je geeft aan dat je scherp wilt blijven':
            case 'Je geeft aan te willen focussen op je geheugen':
            case 'Je geeft aan te willen focussen op je mentale fitheid':
            case 'Je geeft aan te willen focussen op je concentratie':
              description = 'DHA is het omega 3 vetzuur wat goed is voor onze hersenen. Het is dan ook niet voor niets een belangrijke bouwsteen voor je brein. Algenolie wordt ook wel de basis genoemd van de hersenen. In combinatie met de Brain Boost kan je naast het onderhouden van de basis, focussen op het ondersteunen van specifieke functies van de hersenen.';
              break;
            default:
              this.ingredient.explanation = ['Plantaardige omega-3'];
              description = 'De Gezondheidsraad adviseert om één keer per week vis te eten en dan vooral vette vis. In vette vis zitten namelijk veel omega 3 vetzuren. Algenolie is een geweldig alternatief voor visolie voor vegetariërs of veganisten die EPA en DHA in hun voeding willen opnemen.';
              break;
          }
          break;
        case SLEEP_FORMULA:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan dat slaap een belangrijk onderwerp is voor je":
              description = "De vele positieve effecten van een goede nacht slaap zijn veel onderzocht. Toch slapen veel mensen niet de benodigde uren en zijn er natuurlijke hulpmiddelen die slaap kunnen ondersteunen. Zoals valeriaan, dat je kan helpen ontspannen en de nachtrust kan bevorderen.* ";
              break;
            case "Je geeft aan je libido te willen verbeteren":
              description = "Recent onderzoek geeft aan dat onvoldoende slaap invloed heeft op vele aspecten van de menselijke gezondheid, waaronder je libido. Een van de oorzaken van een verlaagd libido zou het te weinig of slecht slapen kunnen zijn. ";
              break;
            case "Je geeft aan moeite te hebben met in slaap vallen":
              description = "Moeite hebben met in slaap vallen kan liggen aan je melatonine niveau. Je lichaam begint 's avonds melatonine aan te maken om slaap op te wekken. 5-HTP ondersteunt dit proces op een natuurlijke manier waardoor je bioritme niet wordt verstoord. ";
              break;
            case "Je geeft aan dat je vaak moe wakker wordt":
              description = "Normaal gezien stopt je lichaam met het aanmaken van melatonine als het licht wordt. Is dit niet het geval, dan kun je moe wakker worden. 5-HTP ondersteunt de melatonine balans op een natuurlijke manier waardoor je bioritme niet wordt verstoord. ";
              break;
            case "Je geeft aan minder dan 7 uur te slapen":
            case "Je geeft aan minder dan 5 uur te slapen":
              description = "Als je minder dan 7 uur slaapt, neemt het functionerend vermogen van je lichaam af. Er zijn natuurlijke hulpmiddelen die een goede slaap kunnen ondersteunen, zoals valeriaan dat je kan helpen ontspannen en de nachtrust kan bevorderen.*";
              break;
            default:
              this.ingredient.explanation = ['Sleep-Well'];
              description = 'De vele positieve effecten van een goede nacht slaap zijn veel onderzocht. De Sleep-Well bevat valeriaan dat een goede nachtrust kan ondersteunen.*';
              break;
          }
          break;
        case ENERGY_FORMULA:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan dat energie een belangrijk onderwerp voor je is":
              description = "Een gebrek aan energie kan je dagelijkse activiteit beïnvloeden en je minder productief maken. Onze Energy Assistant activeert de natuurlijke energie in het lichaam en ondersteunt het energieniveau. ";
              break;
            case "Je geeft aan je futloos te voelen":
              description = "Veel mensen voelen zich regelmatig moe en futloos. Viteezy Energy Assistant activeert de natuurlijke energie in het lichaam. De verschillende B vitamines (B2, B3 B6 en B12) dragen bij aan extra energie bij vermoeidheid. ";
              break;
            case "Je geeft aan vaak een middag dip te hebben":
              description = "Weinig energie in de middaguren heeft vaak te maken met een dip in de energiebalans. De verschillende B vitamines (B2, B3 B6 en B12) bevorderen de energiestofwisseling. Dit draagt bij aan extra energie bij vermoeidheid. ";
              break;
            case "Je geeft aan dat je energielevel veel fluctueert":
              description = "Een fluctuerend energielevel heeft vaak te maken met een wisselende energiebalans. De verschillende B vitamines (B2, B3 B6 en B12) bevorderen de energiestofwisseling. Dit draagt bij aan extra energie bij vermoeidheid. ";
              break;
            default:
              this.ingredient.explanation = ['Energy Assistant'];
              description = 'Een gebrek aan energie kan je dagelijkse activiteit beïnvloeden en je minder productief maken. Onder andere de ijzer, magnesium en vitamine B2 in de Energy Assistant activeren de natuurlijke energie in het lichaam en ondersteunen het energieniveau.';
              break;
          }
          break;
        case STRESS_FORMULA:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan dat stress een belangrijk onderwerp voor je is":
              description = "Meer dan 1 miljoen Nederlanders ervaren stress. Als je gestrest bent, verbruikt je lichaam in hoog tempo veel voedingsstoffen, waaronder vitamines. Recent wetenschappelijk onderzoek laat zien dat Ashwaganda stress kan verminderen en het uithoudingsvermogen kan verbeteren.";
              break;
            case "Je geeft aan je libido te willen verbeteren":
              description = "Recent onderzoek geeft aan, dat stress invloed heeft op vele aspecten van de menselijke gezondheid, waaronder je libido. Een van de oorzaken van een verlaagd libido zou langdurige stress kunnen zijn. ";
              break;
            case "Je geeft aan veel stress te ervaren":
              description = "Meer dan 1 miljoen Nederlanders ervaren stress. Als je gestrest bent verbruikt je lichaam in hoog tempo veel voedingsstoffen, waaronder vitamines. Recent wetenschappelijk onderzoek laat zien dat Ashwaganda stress kan verminderen en het uithoudingsvermogen kan verbeteren.";
              break;
            case "Je geeft aan hartkloppingen te hebben na een periode van stress":
            case "Je geeft aan kortademig te zijn na een periode van stress":
            case "Je geeft aan hyper te zijn na een stressvolle dag":
              description = "Dankzij stress maakt je lichaam adrenaline vrij, een hormoon dat tijdelijk je ademhaling en hartslag versnelt en je bloeddruk verhoogt. Recent wetenschappelijk onderzoek laat zien dat Ashwaganda stress kan verminderen.";
              break;
            case "Je geeft aan opgebrand te zijn na een stressvolle dag":
              description = "Vermoeidheid is één van de meest voorkomende klachten bij mensen die veel stress ervaren of een burn-out hebben. Doordat je continu stress ervaart, rust je lijf niet meer uit en zul je (zeer zware) vermoeidheid ervaren. Vitamine B12 helpt om vermoeidheid te verminderen.";
              break;
            case "Je geeft aan last van je spieren te hebben na een periode van stress":
              description = "Ons lichaam reageert op stress. Stress heeft invloed op de spanning van de spieren. Te veel spanning kan voor overbelasting zorgen met stijve spieren zoals in de nek of rug als gevolg. Magnesium speelt een rol bij het behouden van soepele spieren.";
              break;
            case "Je geeft aan slaapproblemen te hebben na een periode van stress":
              description = "Dankzij stress maakt je lichaam adrenaline vrij, een hormoon dat tijdelijk je ademhaling en hartslag versnelt en je bloeddruk verhoogt. Dit kan van invloed zijn op de kwaliteit van je slaap. Recent wetenschappelijk onderzoek laat zien dat Ashwaganda stress kan verminderen. ";
              break;
            case "Je geeft aan buikpijn te hebben na een periode van stress":
              description = "Buikpijn door stress wordt veroorzaakt doordat in een stressreactie de stofwisseling deels of volledig stil kan komen te liggen. Hierdoor kan voedsel niet goed worden verteerd. Dit kan zorgen voor verstoppingen of brandend maagzuur en krampen. Recent wetenschappelijk onderzoek laat zien dat Ashwaganda stress kan verminderen. ";
              break;
            case "Je geeft aan hoofdpijn te hebben na een periode van stress":
              description = "Veel Nederlanders hebben last van hoofdpijn door stress. Spanningshoofdpijn kan je het dagelijkse leven behoorlijk lastig maken. Recent wetenschappelijk onderzoek laat zien dat Ashwaganda stress kan verminderen. ";
              break;
            default:
              this.ingredient.explanation = ['Stress-Less'];
              description = 'Viteezy Stress-Less bevat rhodiola, ginseng en ashwaganda, allen adaptogene kruiden die al eeuwen worden gebruikt om het lichaam te ondersteunen. Daarnaast bevat het zink, wat bijdraagt aan een normale weerstand tegen stress.';
              break;
          }
          break;
        case PRENATAL_FORMULA:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan in de aankomende twee jaar zwanger te willen worden":
              description = "Heb je een kinderwens, dan is het belangrijk dat je voldoende foliumzuur binnenkrijgt. Foliumzuur verhoogt de folaat status van het lichaam. Folaat draagt bij tot de groei van het kind tijdens de zwangerschap. ";
              break;
            case "Je geeft aan dat je zwanger bent":
              description = "Tijdens je zwangerschap is het belangrijk dat je voldoende foliumzuur binnenkrijgt. Foliumzuur verhoogt de folaat status van het lichaam. Folaat draagt bij tot de groei van het kind tijdens de zwangerschap. ";
              break;
            case "Je geeft aan dat je borstvoeding geeft":
              description = "Een bevalling en de kraamtijd zijn heel bijzonder, maar ook vermoeiend. Je lichaam krijgt veel te verduren en kan daarom wel wat extra vitamines gebruiken. Vitamine B2, B3, B5, B6, B12 en ijzer houden je energieniveau op peil. Vitamine C draagt bij aan de instandhouding van de normale werking van het immuunsysteem na zware lichamelijke inspanning.";
              break;
            default:
              this.ingredient.explanation = ['Prenatal'];
              description = 'Viteezy Prenatal bevat maar liefst 22 vitaminen en mineralen en is speciaal ontwikkeld voor vrouwen met een kinderwens, die zwanger zijn of borstvoeding geven.';
              break;
          }
          break;
        case DETOX_FORMULA:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan meer dan drie keer per week vis te eten":
              description = "Dankzij milieuverontreiniging komen er zware metalen in het water. Deze schadelijke metalen komen via de consumptie van vis in ons lichaam terecht. Chlorella en spirulina staan erom bekend dat het deze zware metalen aan zich bindt, waardoor deze via de normale spijsverteringskanalen het lichaam verlaten.";
              break;
            case "Je geeft aan dat je vaak alcohol drinkt":
              description = "Je lever is één van de belangrijkste organen in je lichaam. Door teveel alcoholconsumptie kan je lever beschadigd raken en zo minder goed werken. Mariadistel ondersteunt de reinigende werking van de lever.*";
              break;
            case "Je geeft aan dat je rookt":
              description = "Dagelijkse nicotine inname zorgt ervoor dat je lever hard moet werken om deze schadelijke stof uit je lichaam te krijgen. Mariadistel ondersteunt de reinigende werking van de lever.*";
              break;
            default:
              this.ingredient.explanation = ['Detox'];
              description = 'Deze nauwkeurig samengestelde formule bevat krachtige kruiden uit de natuur, waaronder verschillende algen. Chlorella draagt bij aan de instandhouding van de normale leverfunctie.*.';
              break;
          }
          break;
        case HAIR_AND_NAIL_FORMULA:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan dat haar en nagels een belangrijk onderwerp voor je zijn":
              description = "Gezond haar en sterke nagels zijn een teken van goede gezondheid. Vermoeidheid en stress kunnen het uiterlijk van je haar en nagels beïnvloeden. Biotine houdt je haren sterk en draagt bij aan het behoud van glanzend haar. Zink draagt bij aan het behoud van normale nagels.";
              break;
            case "Je geeft aan dat je haar dunner wordt":
              description = "Veel mannen en vrouwen krijgen na verloop van tijd last van dunnere haren. Biotine houdt je haren sterk en draagt bij aan het behoud van glanzend haar. ";
              break;
            case "Je geeft aan dat je haar droog is":
              description = "Droog haar ontstaat doordat er vocht mist in het haar. Wanneer uitgedroogd haar beschadigd is, kan het vaak tot gespleten haarpunten leiden. Biotine bevordert de conditie van je haar en draagt bij aan behoud van glanzend haar. ";
              break;
            case "Je geeft aan dat je haar beschadigd is":
              description = "Beschadigd haar is vaak droog, dof en moeilijk in model te brengen. Bij beschadigd haar zijn de haarpunten gespleten en kunnen bij de minste weerstand al afbreken. Biotine bevordert de conditie van je haar en draagt bij aan behoud van glanzend haar.";
              break;
            case "Je geeft aan dat je haar langzaam groeit":
              description = "Langzaam groeiend haar kan een indicatie zijn van beschadigd haar. Bij beschadigd haar zijn de haarpunten gespleten en kunnen bij de minste weerstand al afbreken. Zink en selenium dragen bij aan normale haargroei. ";
              break;
            case "Je geeft aan sterkere nagels te willen":
            case "Je geeft aan langere nagels te willen":
            case "Je geeft aan de conditie van je nagels te willen verbeteren":
              description = "Zwakke beschadigde nagels, die snel scheuren en breken, kunnen een signaal zijn dat je bepaalde voedingsstoffen tekort komt. Naast goede verzorging van je nagels, draagt het supplement zink bij aan het behoud van normale nagels.";
              break;
            default:
              this.ingredient.explanation = ['Hair & Nail Boost'];
              description = 'Gezond haar en sterke nagels zijn een teken van goede gezondheid. Vermoeidheid en stress kunnen het uiterlijk van je haar en nagels beïnvloeden.';
              break;
          }
          break;
        case SKIN_FORMULA:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan dat huid een belangrijk onderwerp is voor je":
              description = "Je huid is een uiterlijke indicator van je innerlijke gezondheid. Problemen met je huid zijn vaak een reactie op onstekingsprocessen of een onbalans in je lichaam. Biotine helpt bij de verzorging van de huid van binnenuit. ";
              break;
            case "Je geeft aan dat je huid droog is":
              description = "Heb je een droge huid, dan is het belangrijk dat je je huidbarrière sterk en gezond maakt. Een sterke barrière voorkomt dat er te veel vocht verdampt en maakt je huid weerbaarder. Biotine helpt bij het gezond houden van de huid. ";
              break;
            case "Je geeft aan dat je huid vet is":
              description = "Een vette huid produceert te veel talg. Dit zorgt voor een vettig aanvoelende en glimmende huid. Naast erfelijkheid, hormonen en stress kunnen voeding en verzorgingsproducten ook invloed hebben. Biotine helpt bij het gezond houden van de huid.";
              break;
            case "Je geeft aan dat je huid onrustig is":
              description = "Je huid is een uiterlijke indicator van je innerlijke gezondheid. Problemen met je huid zijn vaak reactie op onstekingsprocessen of een onbalans in je lichaam. Biotine helpt bij de verzorging van de huid van binnenuit. ";
              break;
            case "Je geeft aan dat je huid dof is":
              description = "Een stralende huid ontstaat als de huid gezond, goed doorbloed en het huidoppervlak glad is. Biotine helpt bij het gezond houden van de huid. Vitamine C helpt bij de verzorging van de huid van binnenuit.";
              break;
            case "Je geeft aan last te hebben van acne":
              description = "Je huid is een uiterlijke indicator van je innerlijke gezondheid. Problemen met je huid zijn vaak een reactie op onstekingsprocessen of een onbalans in je lichaam. Biotine helpt bij de verzorging van de huid van binnenuit. ";
              break;
            case "Je geeft aan last te hebben van pigmentvlekken":
              description = "Pigmentvlekken zijn opeenhopingen van pigment, ook wel melanine genoemd. Vaak ontstaan pigmentvlekken door blootstelling aan zonlicht, maar ook hormonen en erfelijke gevoeligheid kunnen een rol spelen. Vitamine C kan de productie van melanine onderdrukken. ";
              break;
            case "Je geeft aan dat je rimpels hebt":
            case "Je geeft aan dat de elasticiteit van je huid afneemt":
            case "Je geeft aan je zorgen te maken om huidveroudering":
              description = "Collageen is een eiwit en vormt de basis van alle weefsels in je lichaam. Je huid bestaat voor wel 80% uit collageen. Het is ook verantwoordelijk voor de stevigheid en elasticiteit van je huid. Vitamine C is van belang voor de vorming van collageen wat de huid verstevigt. ";
              break;
            default:
              this.ingredient.explanation = ['Skin Support'];
              description = 'Je huid is een uiterlijke indicator van je innerlijke gezondheid. De Skin Support van Viteezy bevat veel belangrijke nutriënten, zoals biotine, hyaluronzuur en vitamine C, die ondersteunend zijn voor je huid.';
              break;
          }
          break;
        case LIBIDO_FORMULA:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan dat libido een belangrijk onderwerp is voor je":
              description = "Een laag libido voor mannen of vrouwen kan als problematisch worden ervaren. Maca staat bekend om de positieve invloed op het seksuele verlangen. ";
              break;
            case "Je geeft aan last te hebben van acne op je kin of kaaklijn":
              description = "Acne op je kin of kaaklijn wijst vaak op een ongebalanceerde hormoonhuishouding. Maca en ashwaganda zijn beide adaptogenen, die een verstoorde hormoonbalans helpen in evenwicht te brengen. ";
              break;
            default:
              this.ingredient.explanation = ['Maca Power'];
              description = 'Viteezy Maca Power is zorgvuldig samengesteld uit de krachtigste stoffen uit de natuur.';
              break;
          }
          break;
        case GUT_SUPPORT:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan dat spijsvertering een belangrijk onderwerp is voor je":
              description = "Een goede spijsvertering is een teken van een goede eet en levensstijl. Verschillende factoren kunnen invloed hebben op je spijsvertering. Onze probiotica bevat maar liefst 7 verschillende bacteriële stammen.";
              break;
            case "Je geeft aan een onregelmatige stoelgang te hebben":
              description = "Een onregelmatige stoelgang kan verschillende oorzaken hebben, zowel je dieet of je levensstijl. Voor een regelmatige stoelgang is het van groot belang dat de darmflora in balans zijn. Probiotica zijn goede bacteriën die van nature in onze darmen voorkomen";
              break;
            case "Je geeft aan winderigheid te ervaren":
              description = "Als je darmflora verstoort is kun je meer gas produceren. Een slechte vertering van je voeding kan gasvorming veroorzaken. Probiotica zijn goede bacteriën die van nature in onze darmen voorkomen.";
              break;
            case "Je geeft aan een opgeblazen gevoel te hebben":
              description = "Een opgeblazen gevoel wordt veroorzaakt door gas in het darmstelsel. De gasvorming ontstaat door slechte darmbacteriën en door lucht die je inslikt. Probiotica zijn goede bacteriën die van nature in onze darmen voorkomen.";
              break;
            case "Je geeft aan boeren te ervaren":
              description = "Boeren wordt veroorzaakt door het ‘ontluchten’ van gas in het darmstelsel. De gasvorming ontstaat door slechte darmbacteriën en door lucht die je inslikt. Probiotica zijn goede bacteriën die van nature in onze darmen voorkomen.";
              break;
            case "Je geeft aan dat je een slechte spijsvertering ervaart":
              description = "Een slechte spijsvertering kan verschillende oorzaken hebben, zowel je dieet of je levensstijl. Voor een goede spijsvertering is het van groot belang dat de darmflora in balans zijn. Probiotica zijn goede bacteriën die van nature in onze darmen voorkomen.";
              break;
            default:
              this.ingredient.explanation = ['Gut Support'];
              description = 'Een goede spijsvertering is een teken van een goede eet en levensstijl. Verschillende factoren kunnen invloed hebben op je spijsvertering. Onze probiotica bevat maar liefst 7 verschillende bacteriële stammen.';
              break;
          }
          break;
        case BRAIN_BOOST:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan dat hersenen een belangrijk onderwerp is voor je":
              description = "B-vitamines zijn de juiste vitamines voor je brein. Elk van deze B vitamines is specifiek uitgekozen om bij te dragen aan een functie van het brein.";
              break;
            case "Je geeft aan moeite te hebben met focussen":
              description = "Vitamine B1, B3, B6, B11 en B12 zijn goed voor het geheugen, je concentratie en het leervermogen. Al deze essentiële B-vitamines zijn opgenomen in deze formule.";
              break;
            case "Je geeft aan een gebrek aan concentratie te hebben":
              description = "Vitamine B1, B3, B6, B11 en B12 zijn goed voor de concentratie, je geheugen en het leervermogen. Al deze essentiële B-vitamines zijn opgenomen in deze formule.";
              break;
            case "Je geeft aan dat je soms niet op woorden kan komen":
              description = "Om optimaal te presteren is het belangrijk om scherp te blijven gedurende de dag. Vitamine B2 helpt om vermoeidheid te verminderen en Vitamine B1 is goed voor het concentratievermogen.";
              break;
            case "Je geeft aan vergeetachtigheid te ervaren":
              description = "Vitamine B1, B3, B6, B11 en B12 zijn goed voor het geheugen, je concentratie en het leervermogen. Al deze essentiële B-vitamines zijn opgenomen in deze formule.";
              break;
            case "Je geeft aan een gebrek aan motivatie te hebben":
              description = "Een gebrek aan motivatie kennen we allemaal wel eens van tijd tot tijd. Het is hier van belang om een concreet doel voor je zelf te stellen. Daarnaast is vitamine B1 gunstig voor een goede geestelijke balans.";
              break;
            case "Je geeft aan je neerslachtig te voelen":
              description = "Iedereen voelt zich weleens vermoeid of neerslachtig. Goed slapen en een gezonde levensstijl zijn welbekende middelen tegen een neerslachtig gevoel. Daarnaast is de Vitamine B12 in deze formule goed voor de gemoedstoestand.";
              break;
            case "Je geeft aan dat je regelmatig piekert":
              description = "Iedereen kent het gevoel wel, slecht slapen door het piekeren. Een gezonde levensstijl en het vermijden van stresssituaties zijn welbekende middelen tegen piekeren.  Daarnaast is de Vitamine B12 in deze formule goed voor de gemoedstoestand";
              break;
            case "Je geeft aan angst gevoelens te ervaren":
              description = "Angst gevoelens kunnen ontstaan door veel redenen. Het is van belang om hier de juiste specialistische kennis bij te betrekken. Daarnaast zit er in deze formule vitamine B5. Panthotheenzuur (vitamine B5), ondersteunt in spannende tijden";
              break;
            case "Je geeft aan dat je scherp wilt blijven":
              description = "Om optimaal te presteren is het belangrijk om scherp te blijven gedurende de dag. Vitamine B2 helpt om vermoeidheid te verminderen en Vitamine B1 is goed voor het concentratievermogen.";
              break;
            case "Je geeft aan te willen focussen op je geheugen":
              description = "Vitamine B1, B3, B6, B11 en B12 zijn goed voor het geheugen, je concentratie en het leervermogen. Al deze essentiële B-vitamines zijn opgenomen in deze formule.";
              break;
            case "Je geeft aan te willen focussen op je mentale fitheid":
              description = "Mentale fitheid is de fitheid van je geest. Als je aan fitheid denkt, denk je al snel aan je lijf. Vaak vergeten mensen de verzorging van hun geest, terwijl dat nét zo belangrijk is. Vitamine B1, B6 en B12 zijn gunstig voor een goede geestelijke balans.";
              break;
            case "Je geeft aan te willen focussen op je concentratie":
              description = "Vitamine B1, B3, B6, B11 en B12 zijn goed voor de concentratie, je geheugen en het leervermogen. Al deze essentiële B-vitamines zijn opgenomen in deze formule.";
              break;
            default:
              this.ingredient.explanation = ['Brain Boost'];
              description = 'B-vitamines zijn de juiste vitamines voor je brein. Elk van deze B vitamines is specifiek uitgekozen om bij te dragen aan een functie van het brein.';
              break;
          }
          break;
        case HORMONE_CONTROL:
          switch (this.ingredient.explanation[0]) {
            case "Je geeft aan dat menstruatie een belangrijk onderwerp is voor je":
              description = "De menstruatiecyclus vindt plaats onder invloed van verschillende hormonen. De zink in onze formule draagt bij aan een normale hormoonhuishouding. Daarnaast ondersteunt Vitex agnus castus een normale menstruatie*.";
              break;
            case "Je geeft aan kramp te ervaren tijdens je menstruatie":
              description = "Menstruatiekrampen worden veroorzaakt door het samentrekken van de baarmoeder. Rust en warmte kunnen de klachten helpen verminderen. Daarnaast ondersteunt Vitex agnus castus een normale menstruatie*.";
              break;
            case "Je geeft aan fysieke ongemakken te ervaren tijdens je menstruatie":
              description = "Fysieke ongemakken worden vaak ervaren tijdens de menstruatie. Dit komt niet alleen door een schommeling van hormonen maar ook door het samentrekken van de baarmoeder. Vitex agnus castus ondersteunt een normale menstruatie*.";
              break;
            case "Je geeft aan een opgeblazen gevoel te ervaren tijdens je menstruatie":
              description = "Door het schommelen van hormonen kunnen je darmen trager werken en zal je lichaam vocht vasthouden. Dit geeft een opgeblazen gevoel. Voldoende water drinken zorgt ervoor dat je lichaam minder vocht ontrekt uit je darmen. Daarnaast draagt de zink in onze formule bij aan een normale hormoonhuishouding.";
              break;
            case "Je geeft aan eetbuien te ervaren tijdens je menstruatie":
              description = "Doordat de hormonen schommelen in het lichaam tijdens de cyclus krijg je een laag niveau van oestrogeen. Daardoor wordt er ook te weinig serotonine aangemaakt. Hierdoor kan je eetbuien ervaren. De zink in onze formule draagt bij aan een normale hormoonhuishouding.";
              break;
            case "Je geeft aan puistjes te krijgen rondom je menstruatie":
              description = "Meestal ontstaan hormonale puistjes net voor je menstruatie. Dit komt veelal door een schommeling in je hormonen tijdens de cyclus. De zink in onze formule draagt bij aan een normale hormoonhuishouding.";
              break;
            case "Je geeft aan stemmingswisselingen te ervaren rondom je menstruatie":
              description = "Ongeveer 2 weken voor de menstruatie daalt het oestrogeengehalte en stijgt het progesteronniveau. Deze hormoonschommelingen kunnen voor stemmingswisselingen zorgen. De zink in onze formule draagt bij aan een normale hormoonhuishouding.";
              break;
            case "Je geeft aan je futloos te voelen rondom je menstruatie":
              description = "Ongeveer 2 weken voor de menstruatie daalt het oestrogeengehalte en stijgt het progesteronniveau. Deze hormoonschommelingen kunnen voor futloosheid zorgen. De vitamine B6 in onze formule activeert de natuurlijke energie in je lichaam en de zink draagt bij aan een normale hormoonhuishouding.";
              break;
            case "Je geeft aan je prikkelbaar te voelen rondom je menstruatie":
              description = "Ongeveer 2 weken voor de menstruatie daalt het oestrogeengehalte en stijgt het progesteronniveau. Deze hormoonschommelingen kunnen voor prikkelbaarheid zorgen. De zink in onze formule draagt bij aan een normale hormoonhuishouding.";
              break;
            case "Je geeft aan je gespannen te voelen rondom je menstruatie":
              description = "Ongeveer 2 weken voor de menstruatie daalt het oestrogeengehalte en stijgt het progesteronniveau. Deze hormoonschommelingen kunnen je gespannen maken. De zink in onze formule draagt bij aan een normale hormoonhuishouding.";
              break;
            case "Je geeft aan klachten te ervaren die horen bij de overgang":
              description = "";
              break;
            default:
              this.ingredient.explanation = ['Hormone Control'];
              description = 'De menstruatiecyclus vindt plaats onder invloed van verschillende hormonen. De zink in onze formule draagt bij aan een normale hormoonhuishouding. Daarnaast ondersteunt Vitex agnus castus een normale menstruatie*.';
              break;
          }
          break;
      }
      return description;
    };

  });
