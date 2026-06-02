import * as angular from 'angular';
import { Component, Inject, QueryList, ViewChildren } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import { UIRouterState, UIRouterStateParams, UserManager } from 'src/app/ajs-upgraded-providers';
import { BundleService } from 'src/app/core/services/bundle.service';
import { BlendService } from 'src/app/core/services/blend.service';

@Component({
  selector: 'bundle',
  templateUrl: './bundle.component.html',
  styleUrl: './bundle.component.scss'
})
export class BundleComponent {
  @ViewChildren('slides') slides: QueryList<any> ;
  private bundlePrice = 0;
  private slideIndex = 1;

  public totalPrice: any;

  public dailyPrice: any;

  public months: any;
  public bundle: any;
  public headImages: any;
  public subImage: any;
  public title: any;
  public text: any;

  public STRESS_BUNDLE = 'stress-bundle';
  private ENERGY_BUNDLE = 'energy-bundle';
  private VEGAN_BUNDLE = 'vegan-bundle';
  private GUT_BUNDLE = 'gut-bundle';
  private DAILY_BUNDLE = 'daily-bundle';
  private ALL_DAY_BUNDLE = 'all-day-bundle';
  private SUPER_WOMAN_BUNDLE = 'super-woman-bundle';

  constructor(
    @Inject(UIRouterState) private $state,
    @Inject(UIRouterStateParams) private $stateParams,
    @Inject(UserManager) private UserManager,
    private blendService: BlendService,
    private bundleService: BundleService) {

  }

  public ngOnInit(): void {
    this.bundleService.getBundles().subscribe((response) => {
      this.months = "0";
      this.bundle = response.filter(bundle => bundle.url === this.$stateParams.product)[0];
      this.getContent(this.bundle.code);
      this.bundlePrice = this.bundle.price;
      this.getDailyPrice(this.months);
    });

    addEventListener("scroll", this.fixedOrderButton);
  }
  
  ngAfterViewInit() {
    this.slides.changes.subscribe(t => {
      this.ngForRendered();
    })
  }

  ngForRendered() {
    this.currentSlide(1);
  }

  private getHeadImages = (bundleCode) => {
    return [
      { id: 1, image: `/assets/image/bundle/box/${bundleCode}.webp`, resize: true },
      { id: 2, image: `/assets/image/bundle/capsule/${bundleCode}.jpg`, resize: true },
      { id: 3, image: `/assets/image/bundle/ingredient-list/${bundleCode}.jpg`, resize: false }
    ];
  }

  private getContent = (bundleCode) => {
    switch (bundleCode) {
      case this.STRESS_BUNDLE:
        this.headImages = this.getHeadImages(bundleCode);
        this.subImage = this.headImages[1].image;
        this.title = "Krachtige kruiden";
        this.text = "We combineren de meest krachtige ingrediënten en kruiden om voor jou de perfecte samenstelling te creëren. Van Rhodiola rosea wordt vanwege de adaptogene eigenschappen gedacht dat het gunstig is voor een goede geestelijke balans. * Ashwaganda werkt net als citroenmelisse ontspannend en rustgevend*. Panax Ginseng, draagt bij aan lichamelijk en geestelijk herstel en ondersteunt bij vermoeidheid. * Magnesium bevordert de energiestofwisseling en draagt net als zink bij aan een heldere geest. Waarbij Visolie met essentiële omega 3 vetzuren een rol spelen bij het functioneren van de hersenen.";
        break;
      case this.ENERGY_BUNDLE:
        this.headImages = this.getHeadImages(bundleCode);
        this.subImage = this.headImages[1].image;
        this.title = "B-Vitamines";
        this.text = "Voel je dagelijks fit en energiek met een opwekkende mix van vitamine B12 die helpt bij de aanmaak van rode bloedlichaampjes. Vitamine B3 draagt bij aan fitheid. Vitamine B6 ondersteunt de energiestofwisseling. Rhodiola heeft een adaptogene werking, een natuurlijke stof die het uithoudingsvermogen ondersteunt. * Ginseng en guarana, een natuurlijke bron van cafeïne. Vitamine C dat bijdraagt aan extra energie bij vermoeidheid en visolie als bouwsteen voor de hersenen.";
        break;
      case this.VEGAN_BUNDLE:
        this.headImages = this.getHeadImages(bundleCode);
        this.subImage = this.headImages[1].image;
        this.title = "Algen";
        this.text = "Vegan zijn of vegetarisch eten kan soms wat ongemakken meebrengen. Wij zorgen ervoor dat je vitamines hier in ieder geval geen van zijn. De Algen-olie ondersteunt in het voldoende binnen krijgen van omega 3 vetten. Deze ondersteunen bij de normale hersenfunctie. De toevoeging van pro- en prebiotica zorgen ervoor dat de miljarden essentiële mycrobacteriën in balans blijven zodat jij hier geen ongemakken aan ondervindt. Vitamine B12 welke grotendeels in dierlijke producten zit, speelt een belangrijke rol in de opbouw van je zenuwcellen. Daarbij ondersteunt het je energieniveau, immuunsysteem en is het goed voor je leerprestaties en concentratievermogen.";
        break;
      case this.GUT_BUNDLE:
        this.headImages = this.getHeadImages(bundleCode);
        this.subImage = this.headImages[1].image;
        this.title = "Pre- en probiotica";
        this.text = "Haal je lichaam uit de dagelijkse sleur van kruiden, koffie en alcohol met deze unieke samenstelling voor een Happy Gut. Mix van pre- en probiotica De combinatie zorgt ervoor dat je zowel de levende bacteriën (probiotica) die je nodig hebt in je darmen als de juiste voeding voor die bacteriën (prebiotica) binnen krijgt. Deze Omega 3 bevat actieve vitamine E, zodat jij essentiële vetzuren binnenkrijgt om de omega 6 uit vlees uit te balanceren. Daarnaast helpt ijzer het lichaam om energie vrij te maken uit de eiwitten, koolhydraten en vetten die je via je voeding binnenkrijgt en ondersteunt daardoor het energieniveau.";
        break;
      case this.DAILY_BUNDLE:
        this.headImages = this.getHeadImages(bundleCode);
        this.subImage = this.headImages[1].image;
        this.title = "Weerstand";
        this.text = "Een multivitamine klinkt als de ideale uitkomst. Met gemak ondersteun je jouw immuunsysteem en geef je jouw weerstand een boost. Vitamine C is toegevoegd en draagt naast de ondersteuning van het immuunsysteem bij aan de afweer van het lichaam, behoud van sterke botten en gezonde cellen. Zink is aan antioxidant dat je lichaam beschermt tegen vrije radicalen en oxidatieve schaden. Terwijl Visolie (omega 3) een essentiële rol speelt bij het functioneren van de hersenen. Vitamine D3 draagt bij aan het normale functioneren van het immuunsysteem en is goed voor de werking van spieren. Onmisbaar in deze samenstelling.";
        break;
      case this.ALL_DAY_BUNDLE:
        this.headImages = this.getHeadImages(bundleCode);
        this.subImage = this.headImages[1].image;
        this.title = "Huid, haar en nagels";
        this.text = "Je haar, huid en nagels zijn een uiterlijke indicator van je innerlijke gezondheid. Deze bundel staat dan ook in het teken van je uiterlijke indicator. Biotine, hyaluronzuur en vitamine C – de key om je huid te moisturisen, ofwel vocht in de huid vast te houden en de natuurlijke huid barrière te herstellen. De groene thee is een antioxidant, waardoor het je lichaamscellen helpt te beschermen tegen invloeden van buitenaf. Vitamine A zorgt voor een inwendige huidverzorging, terwijl vitamine B3 zorgt voor het behoud van de normale structuur van je huid.";
        break;
      case this.SUPER_WOMAN_BUNDLE:
        this.headImages = this.getHeadImages(bundleCode);
        this.subImage = this.headImages[1].image;
        this.title = "Hormonen";
        this.text = "Deze Superwoman Bundel is een hoog gedoseerde combinatie van vitamines die specifiek zijn afgestemd op de behoeftes van de vrouw. De hormone control bevat een combinatie van bewezen ingrediënten en de nieuwste kruiden. Ook bevat het zink wat bijdraagt aan een normaal hormoonhuishouding. Daarnaast bevat deze formule Dim en Dong Quai. De vitamine D3 die is toegevoegd helpt de normale werking van het immuunsysteem en zorgt daarmee mede voor een goede weerstand. Ook is ijzer toegevoegd, ijzer helpt vermoeidheid te verminderen.";
        break;
    }
  }

  private fixedOrderButton = () => {
    const orderButton = document.getElementById("order-button");
    if (orderButton == null) {
      return removeEventListener("scroll", this.fixedOrderButton);
    }

    const container = document.getElementById("bundle-plan-options").getBoundingClientRect();
    const isFixed = orderButton.classList.contains("fixed")
    if (container.bottom < 0 && !isFixed) {
      orderButton.classList.add("fixed");
    } else if (container.bottom > 0 && isFixed) {
      orderButton.classList.remove("fixed");
    }
  }

  public getDailyPrice = (months) => {
    if (Number(months) === 0) {
      this.totalPrice = this.bundlePrice * 1.18;
      this.dailyPrice = this.totalPrice / 30;
    } else if (Number(months) === 1) {
      this.totalPrice = this.bundlePrice;
      this.dailyPrice = this.totalPrice / 30;
    } else if (Number(months) === 3) {
      this.totalPrice = (this.bundlePrice * 3) * 0.85;
      this.dailyPrice = this.totalPrice / 90;
    } else {
      this.dailyPrice = this.bundlePrice / 30;
    }
  }

  public showSlides = (index) => {
    let i;
    let slides = Array.from(document.getElementsByClassName("slides") as HTMLCollectionOf<HTMLElement>);
    let carouselDots = Array.from(document.getElementsByClassName("carousel-dot") as HTMLCollectionOf<HTMLElement>);
    if (index > slides.length) { this.slideIndex = 1 }
    if (index < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < carouselDots.length; i++) {
      carouselDots[i].className = carouselDots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    carouselDots[this.slideIndex - 1].className += " active";
  }

  public plusSlides = (index) => {
    this.showSlides(this.slideIndex += index);
  }

  public currentSlide = (index) => {
    this.showSlides(this.slideIndex = index);
  }

  private setSelectedMonths = (months) => {
    sessionStorage.setItem("selectedMonths", months);
  }

  public showIngredients = () => {
    this.showSlides(this.slideIndex = 3);
    const element = document.getElementById("slideshow-container");
    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  public startQuiz = function () {
    removeEventListener("scroll", this.fixedOrderButton);
    this.$state.go("quiz-v2");
  };

  public order = (months) => {
    this.blendService.createBundle(this.bundle.code).subscribe((response) => {
      this.UserManager.setBlendExternalReference(response.externalReference);
      this.setSelectedMonths(months);
      removeEventListener("scroll", this.fixedOrderButton);
      this.$state.go("blend", { blendStep: 3 });
    });
  }

}

angular.
  module('bundle', [])
    .directive('bundle', downgradeComponent({component: BundleComponent}) as angular.IDirectiveFactory);
