import * as angular from 'angular';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import { Toast, UIRouterState, UserManager } from 'src/app/ajs-upgraded-providers';
import { BundleService } from 'src/app/core/services/bundle.service';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {

  public isMobile: any = false;
  public hasBlendExternalReference: boolean = false;
  public bundles: any[];
  public bannerContent: any;
  public bannerTitle: string = '';
  public discountCode: string = '';

  private slideIndex = 0;
  private goals = ['energie', 'stress', 'darmen'];
  private writingSpeed = 100;
  private currentCharacter = 0;
  private currentWord = 0;

  constructor(
    private bundleService: BundleService,
    private contentService: ContentService,
    @Inject(UIRouterState) private $state,
    @Inject(Toast) private toast,
    @Inject(UserManager) private UserManager) {}

  public startQuiz = function () {
    this.$state.go("quiz-v2");
  };

  public ngOnInit(): void {
    this.hasBlendExternalReference = this.UserManager.getBlendExternalReference() !== undefined;

    if (this.isIE()) {
      this.toast.show("Internet Explorer wordt niet ondersteund door Viteezy, omdat deze browser niet voldoet aan onze veiligheidsstandaard. Wij raden u aan om over te stappen op een andere browser, bijvoorbeeld Google Chrome of Safari.", "error", 50000);
    }
    
    this.contentService.getByCode("homepage-banner").subscribe(response => {
      this.bannerContent = response;
      // Extract title and code separately
      if (response?.title) {
        const codeSeparator = ' | Code:';
        const codeIndex = response.title.indexOf(codeSeparator);
        if (codeIndex !== -1) {
          // Split title and code
          this.bannerTitle = response.title.substring(0, codeIndex);
          // Extract the code part (everything after the separator)
          const codePart = response.title.substring(codeIndex + codeSeparator.length);
          this.discountCode = codePart.trim();
        } else {
          this.bannerTitle = response.title;
          this.discountCode = '';
        }
      }
    });
    
    this.writeGoal();

    if (this.mobileCheck()) {
      this.isMobile = true;
      this.showSlides(this.slideIndex = 1);
      const interval = setInterval(() => {
        if (this.$state.current.name === "homepage") {
          this.showSlides(this.slideIndex += 1);
        } else {
          clearInterval(interval);
        }
      }, 2500);
    }

    this.bundleService.getBundles().subscribe(response => {
      this.bundles = response.filter(bundle => bundle.code === "energy-bundle" || bundle.code === "gut-bundle" || bundle.code === "super-woman-bundle" || bundle.code === "daily-bundle");
    });
  }

  public seeBlend = function () {
    this.$state.go("blend", { blendStep: 1 });
  };

  private isIE = () => {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf('MSIE ');
    let trident = ua.indexOf('Trident/');

    return (msie > 0 || trident > 0);
  };

  private removeGoal = () => {
    let elem = document.getElementById('target');
    if (elem != null) {
      if (elem.textContent.length > 0) {
        elem.textContent = elem.textContent.slice(0, -1);
        window.setTimeout(this.removeGoal, this.writingSpeed);
      } else {
        this.currentCharacter = 0;
        if (this.goals[this.currentWord] === this.goals[this.goals.length - 1]) {
          this.currentWord = 0;
        } else {
          this.currentWord++;
        }
        window.setTimeout(this.writeGoal, this.writingSpeed);
      } 
    }
  };

  private writeGoal = () => {
    let elem = document.getElementById('target');
    if (elem != null) {
      elem.textContent = elem.textContent + this.goals[this.currentWord].charAt(this.currentCharacter);
      this.currentCharacter++;
      if (this.currentCharacter < this.goals[this.currentWord].length) {
        window.setTimeout(this.writeGoal, this.writingSpeed);
      } else {
        setTimeout(() => {
          window.setTimeout(this.removeGoal, this.writingSpeed);
        }, 1000);
      } 
    }
  };

  private showSlides = (index) => {
    let i;
    let slides = Array.from(document.getElementsByClassName("magazine-item") as HTMLCollectionOf<HTMLElement>);
    if (index > slides.length) { this.slideIndex = 1 }
    if (index < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[this.slideIndex - 1].style.display = "block";
  }

  private mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor);
    return check;
  };

}

angular.
  module('home', [])
    .directive('home', downgradeComponent({component: HomeComponent}) as angular.IDirectiveFactory);
