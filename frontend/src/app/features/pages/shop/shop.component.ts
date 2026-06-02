import * as angular from 'angular';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

import { Toast, UIRouterState, UserManager } from 'src/app/ajs-upgraded-providers';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { BlendService } from 'src/app/core/services/blend.service';
import { StrapiService } from 'src/app/core/services/strapi.service';

declare var window: any;

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ShopComponent {
  public sortPanelOpen: boolean;
  public tagPanelOpen: boolean;
  public categoryPanelOpen: boolean;
  public activeProducts: any[];
  public addedProduct: any;
  public allProducts: any[];
  public filterCategories: any;
  public filterTags: any;
  public filterInput: any;
  public filterVisible = false;
  public sortInput: any;
  public sidebarMenuVisible = true;

  constructor(
    @Inject(UIRouterState) private $state,
    @Inject(Toast) private toast,
    @Inject(UserManager) private UserManager,
    private ingredientService: IngredientService,
    private blendService: BlendService,
    private strapiService: StrapiService) {}

  public ngOnInit(): void {
    this.ingredientService.getAll().subscribe(result => {
      this.activeProducts = result.filter(x => x.isActive);

      this.strapiService.getProductPages().subscribe((response) => {
        this.activeProducts.map(product => {
          product.content = response.data.filter(productPage => productPage.id === product.strapiContentId)[0].attributes;
        });
      });

      this.ingredientService.getIngredientPrices().subscribe((priceResult) => {
        this.activeProducts.map((product) => {
          let foundProduct = priceResult.find(price => product.id === price.ingredientId);
          if (foundProduct) {
            product.amount = foundProduct.amount;
            product.price = foundProduct.price;
            product.internationalSystemUnit = foundProduct.internationalSystemUnit;
          }
        });
      });

      this.activeProducts.map((product) => {
        let foundProduct = this.categories.find(productKey => productKey.key === product.code);
        if (foundProduct) {
          product.category = foundProduct.category;
          product.tags = foundProduct.tags;
        }
      });

      this.allProducts = this.activeProducts;

      this.filterTags = this.categories
        .filter(product => product.tags !== undefined)
        .filter((arr, index, self) => index === self.findIndex((t) => (t.tags === arr.tags)))
        .sort((a, b) => a.tags > b.tags ? 1 : a.tags === b.tags ? 0 : -1)
        .map(filter => ({ tags: filter.tags }));

      this.filterCategories = this.categories
        .filter(product => product.category !== undefined)
        .filter((arr, index, self) => index === self.findIndex((t) => (t.category === arr.category)))
        .sort((a, b) => a.category > b.category ? 1 : a.category === b.category ? 0 : -1)
        .map(filter => ({ category: filter.category }));
    });
  }

  public categories: any = [
    { name: "IJzer", key: "iron", category: "Mineralen", tags: "energie" },
    { name: "Vitamine B12", key: "vitamin-b12", category: "Vitamines", tags: "energie" },
    { name: "Vitamine C", key: "vitamin-c", category: "Vitamines", tags: "weerstand" },
    { name: "Vitamine D", key: "vitamin-d", category: "Vitamines" },
    { name: "Magnesium", key: "magnesium", category: "Mineralen", tags: "slaap" },
    { name: "Zink", key: "zinc", category: "Mineralen", tags: "weerstand" },
    { name: "Groene thee extract", key: "green-tea-extract", category: "Kruiden", tags: "vetverbranding" },
    { name: "Kurkuma", key: "kurkuma", category: "Kruiden", tags: "stress" },
    { name: "Visolie", key: "fish-oil", category: "Specialiteiten", tags: "huid" },
    { name: "Omega 3 vegan", key: "omega-three-vegan", category: "Specialiteiten", tags: "huid" },
    { name: "Cranberry", key: "cranberry", category: "Kruiden", urlPath: "cranberry" },
    { name: "Sleep-Well", key: "sleep-formula", category: "Specialiteiten", tags: "slaap" },
    { name: "Energy Assistant", key: "energy-formula", category: "Specialiteiten", tags: "energie" },
    { name: "Stress-Less", key: "stress-formula", category: "Specialiteiten", tags: "stress" },
    { name: "Prenatal", key: "prenatal-multi", category: "Specialiteiten", tags: "zwangerschap" },
    { name: "Detox", key: "detox-formula", category: "Specialiteiten", tags: "detox" },
    { name: "Hair & Nail Boost", key: "hair-and-nail-formula", category: "Specialiteiten", tags: "haar-nagel" },
    { name: "Skin Support", key: "skin-formula", category: "Specialiteiten", tags: "huid" },
    { name: "Maca Power", key: "libido-formula", category: "Specialiteiten", tags: "libido" },
    { name: "Gut Support", key: "gut-support", category: "Specialiteiten", tags: "maag-en-darm" },
    { name: "Brain Boost", key: "brain-boost", category: "Specialiteiten", tags: "brein" },
    { name: "Hormone Control", key: "hormone-control", category: "Specialiteiten", tags: "hormonen" }
  ];

  public sortValues: any = [
    { title: "Naam (A-Z)", value: "a-z" },
    { title: "Naam (Z-A)", value: "z-a" },
    { title: "Prijs (laag - hoog)", value: "price-low-high" },
    { title: "Prijs (hoog - laag)", value: "price-high-low" }
  ];

  public filterProducts() {
    this.activeProducts = this.allProducts.filter(product => (product.name.toLowerCase().includes(this.filterInput.toLowerCase())));
  }

  public openFilterPanel = () => {
    (<HTMLElement>document.querySelector('.filter-panel')).style.display = 'block';
  }

  public hideFilterPanel = () => {
    (<HTMLElement>document.querySelector('.filter-panel')).style.display = 'none';
  }

  private mobileCheck = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  public foldFilters = () => {
    this.tagPanelOpen = false;
    this.categoryPanelOpen = false;
    if (this.mobileCheck()) {
      this.hideFilterPanel();
    }
  }

  public resetFilter = () => {
    this.filterTags.forEach(filter => {
      filter.selected = false;
    });
    this.filterProductsByTag();
    this.filterCategories.forEach(filter => {
      filter.selected = false;
    });
    this.filterProductsByCategory();
  };

  public sortProducts() {
    if (this.sortInput == "a-z") {
      this.activeProducts = this.activeProducts.sort((a, b) => a.content.title > b.content.title ? 1 : a.content.title === b.content.title ? 0 : -1);
    } else if (this.sortInput == "z-a") {
      this.activeProducts = this.activeProducts.sort((a, b) => a.content.title < b.content.title ? 1 : a.content.title === b.content.title ? 0 : -1);
    } else if (this.sortInput == "price-low-high") {
      this.activeProducts = this.activeProducts.sort((a, b) => a.price > b.price ? 1 : a.price === b.price ? 0 : -1);
    } else if (this.sortInput == "price-high-low") {
      this.activeProducts = this.activeProducts.sort((a, b) => a.price < b.price ? 1 : a.price === b.price ? 0 : -1);
    }
  }

  public filterProductsByCategory = () => {
    let selectedCategories = this.filterCategories.filter(filter => filter.selected).map(filter => filter.category);
    if (selectedCategories.length) {
      this.activeProducts = this.allProducts.filter(product => selectedCategories.includes(product.category));
    } else {
      this.activeProducts = this.allProducts;
    }
  };

  public filterProductsByTag = () => {
    let selectedTags = this.filterTags.filter(category => category.selected).map(category => category.tags);
    if (selectedTags.length) {
      this.activeProducts = this.allProducts.filter(product => selectedTags.includes(product.tags));
    } else {
      this.activeProducts = this.allProducts;
    }
  };

  public addProduct = (selectedProduct) => {
    const foundApiProduct = this.activeProducts.filter(product => product.code === selectedProduct.code)[0];
    const createNewBlend = () => this.blendService.createNewEmptyBlend();
    const addNewProduct = (reference) => {
      return this.blendService.submitBlendIngredient(reference, foundApiProduct.id);
    };

    if (this.UserManager.getBlendExternalReference()) {
      this.blendService.getBlendIngredientsByExternalReference(this.UserManager.getBlendExternalReference())
        .subscribe((blendIngredients) => {
          if (!blendIngredients.map(ingredient => ingredient.ingredientId).includes(foundApiProduct.id)) {
            addNewProduct(this.UserManager.getBlendExternalReference())
              .subscribe(() => {
                this.addedProduct = foundApiProduct;
              });
          } else {
            this.toast.show(`${selectedProduct.name} is al toegevoegd`, "error");
          }
        });
    } else {
      createNewBlend()
        .subscribe(response => {
          this.UserManager.setBlendExternalReference(response.externalReference);
          addNewProduct(response.externalReference)
            .subscribe(() => {
              this.addedProduct = foundApiProduct;
            }, (error) => {
              if (error.status === 409) {
                this.toast.show(`${selectedProduct.name} is al toegevoegd`, "error");
              }
            });
        });
    }
  };

  public toggleSidebarMenu = () => {
    this.sidebarMenuVisible = !this.sidebarMenuVisible;
  };

  public visitProductPage = (product) => {
    this.$state.go('product', { product: product.url });
  };

  public redirectBlend = () => {
    this.$state.go("blend", { blendStep: 2 });
  };

  public startQuiz = function () {
    this.$state.go("quiz-v2");
  };

}

angular.
  module('shop', [])
    .directive('shop', downgradeComponent({component: ShopComponent}) as angular.IDirectiveFactory);
