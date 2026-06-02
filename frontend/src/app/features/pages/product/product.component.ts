import * as angular from 'angular';
import { Component, Inject } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

import { BlendService } from 'src/app/core/services/blend.service';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { UIRouterState, UIRouterStateParams, Toast, UserManager } from 'src/app/ajs-upgraded-providers';
import { StrapiService } from 'src/app/core/services/strapi.service';
import { pushGa4EcommerceEvent } from 'src/app/core/utils/ga4-tracking';

declare var window: any;

@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  public checkout: boolean = false;
  public ingredient: any;
  public content: any;
  public ingredientAdded: boolean;
  

  constructor(@Inject(UIRouterState) private $state,
              @Inject(UIRouterStateParams) $stateParams,
              @Inject(Toast) private toast,
              @Inject(UserManager) private UserManager,
              private blendService: BlendService,
              private ingredientService: IngredientService,
              private strapiService: StrapiService) {

    this.ingredientService.getAll().subscribe(ingredients => {
      const ingredient = ingredients.filter(ingredient => ingredient.url === $stateParams.product)[0];

      if (!ingredient) {
        $state.go("homepage");
        return;
      }

      this.ingredientService.getById(ingredient.id).subscribe(ingredientDetails => {
        // If ingredient exists but is not active, redirect instead of showing the product page
        if (!ingredientDetails.isActive) {
          this.$state.go("homepage");
          return;
        }

        this.ingredient = ingredientDetails;
        this.trackViewContent(ingredientDetails);

        this.strapiService.getProductPage(ingredientDetails.strapiContentId).subscribe(response => {
          this.content = response.data.attributes;
          this.content.diets = this.content.diets.filter((item) => item.active);
        });
      });
    });
  }

  public ngOnInit(): void {
    this.checkout = this.UserManager.getBlendExternalReference() || undefined;
  }

  public addProduct = () => {
    const createNewBlend = () => this.blendService.createNewEmptyBlend();
    const addNewProduct = (reference) => {
      return this.blendService.submitBlendIngredient(reference, this.ingredient.id);
    };

    if (this.UserManager.getBlendExternalReference()) {
      addNewProduct(this.UserManager.getBlendExternalReference())
        .subscribe(
          () => { 
            this.ingredientAdded = true;
          }, (error) => {
            if (error.status === 409) {
              this.ingredientAdded = true;
              this.toast.show(`${this.ingredient.name} is al toegevoegd`, "error", 2500);
            }
          });
    } else {
      createNewBlend()
        .subscribe(response => {
          this.UserManager.setBlendExternalReference(response.externalReference);
          this.checkout = true;
          addNewProduct(response.externalReference)
            .subscribe(
              () => this.ingredientAdded = true
              , (error) => {
                if (error.status === 409) {
                  this.ingredientAdded = true;
                  this.toast.show(`${this.ingredient.name} is al toegevoegd`, "error", 2500);
                }
              });
        });
    }
  };

  public goToCheckout = () => {
    if (this.UserManager.getBlendExternalReference()) {
      this.$state.go("blend", { blendStep: 2 });
    } else {
      this.toast.show(`Je winkelmandje is leeg`, "error", 2500);
    }
  };

  private trackViewContent = (ingredient: any) => {
    this.ingredientService.getIngredientPrices().subscribe((prices) => {
      const priceRecord = prices.find(price => price.ingredientId === ingredient.id);
      pushGa4EcommerceEvent('view_content', {
        singleItem: {
          item_name: ingredient.name,
          item_id: ingredient.sku ?? ingredient.id,
          price: priceRecord?.price ?? 0,
          quantity: 1,
          code: ingredient.code
        },
        userId: this.UserManager.getCustomerExternalReference()
      });
    });
  };

}

angular.
  module('product', [])
    .directive('product', downgradeComponent({component: ProductComponent}) as angular.IDirectiveFactory);