import { Component, Inject } from '@angular/core';
import { BlendManager, Toast, UserManager } from 'src/app/ajs-upgraded-providers';
import { BlendService } from 'src/app/core/services/blend.service';
import { IngredientDialogComponent } from 'src/app/features/dialogs/ingredient/ingredient.component';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { StrapiService } from 'src/app/core/services/strapi.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { pushGa4EcommerceEvent } from 'src/app/core/utils/ga4-tracking';

declare var window: any;

@Component({
  selector: 'additional-products',
  templateUrl: './additional-products.component.html',
  styleUrl: './additional-products.component.scss'
})
export class AdditionalProductsComponent {
  allIngredients: any[];
  availableIngredients: any[];
  blendIngredients: any[];
  prices: any[];
  productpages: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(UserManager) private UserManager,
    @Inject(BlendManager) private BlendManager,
    @Inject(Toast) private toast,
    private ingredientService: IngredientService,
    private paymentService: PaymentService,
    private blendService: BlendService,
    private strapiService: StrapiService,
    private dialog: MatDialog) {
    this.blendIngredients = data.vitamines;
    this.strapiService.getProductPages().subscribe(response => {
      this.productpages = response.data;
      this.ingredientService.getAll()
        .subscribe((result) => {
          this.allIngredients = result;
          this.calculateAvailableIngredients(result);
        }, (error) => {
          this.toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
        });
    });
  }
  private pushToDataLayer = (eventName: string, item: Record<string, unknown>) => {
    pushGa4EcommerceEvent(eventName, {
      singleItem: item,
      userId: this.UserManager.getCustomerExternalReference()
    });
  };

  private calculateAvailableIngredients = (allIngredients) => {
    this.availableIngredients = allIngredients.filter(ingredient => ingredient.isActive);

    this.BlendManager.getAddedIngredients().forEach(addedIngredient => {
      this.availableIngredients = this.availableIngredients.filter((availableIngredient) => availableIngredient.id !== addedIngredient.id);
    });

    this.blendIngredients.forEach((blendIngredient) => {
      const foundRecord = this.availableIngredients.findIndex(availableIngredient => availableIngredient.id === blendIngredient.id);
      if (foundRecord === 0) {
        this.availableIngredients.shift();
      } else {
        this.availableIngredients.splice(foundRecord, 1);
      }
    });

    this.ingredientService.getIngredientPrices()
      .subscribe((result) => {
        this.prices = result;
        this.availableIngredients.map((record) => {
          const foundRecord = this.prices.find(r => r.ingredientId === record.id);
          if (foundRecord) {
            record.amount = foundRecord.amount;
            const foundIngredient = this.blendIngredients.find(r => r.ingredientId === record.id);
            if (foundIngredient) {
              record.price = foundIngredient.price;
            } else {
              record.price = foundRecord.price;
            }
            record.ingredientId = foundRecord.ingredientId;
            record.internationalSystemUnit = foundRecord.internationalSystemUnit;
            record.title = record.name;
          }
        });
      }, (error) => {
        this.toast.show("Er is iets misgegaan bij het ophalen van de prijzen, probeer het later nog eens", "error");
      });

    this.availableIngredients.map((availableIngredient) => {
      availableIngredient.content = this.getIngredientContent(availableIngredient);
    });
  };

  private getIngredientContent(ingredient: any) {
    let content = null;
    try {
      content = this.productpages.filter(productPage => productPage.id === ingredient.strapiContentId)[0].attributes;
    } catch {
      content = null;
    }
    return content;
  }

  public addIngredient = (addedIngredient) => {
    this.paymentService.getPaymentPlanByBlend(this.UserManager.getBlendExternalReference())
      .subscribe((response) => {
        if (response.status === "active") {
          this.BlendManager.addAddedCapsule(addedIngredient);
          this.availableIngredients = this.availableIngredients.filter((availableIngredient) => availableIngredient.id !== addedIngredient.id);
          this.calculateAvailableIngredients(this.allIngredients);
        }
      }, (error) => {
        let removeIngredientPromise = this.blendService.removeBlendIngredient(this.UserManager.getBlendExternalReference(), addedIngredient.id);
        let lazySubmitBlendIngredientPromise = () => {
          this.pushToDataLayer("add_to_cart", {
            item_name: addedIngredient.name,
            item_id: addedIngredient.sku ?? addedIngredient.id,
            price: addedIngredient.price,
            quantity: 1,
            code: addedIngredient.code
          });
          return this.blendService.submitBlendIngredient(this.UserManager.getBlendExternalReference(), addedIngredient.id).subscribe();
        };

        let lazyUpdateQuizManagerChosenCapsules = () => {
          this.BlendManager.addAddedCapsule(addedIngredient);
          addedIngredient.image = addedIngredient.content.productImage.data.attributes.url;
          this.availableIngredients = this.availableIngredients.filter((availableIngredient) => availableIngredient.id !== addedIngredient.id);
        };

        removeIngredientPromise
          .subscribe(
            res => lazySubmitBlendIngredientPromise(),
            err => this.toast.show("Er is iets misgegaan bij toevoegen van dit ingredient, probeer het later nog eens", "error"),
          )
          .add(lazyUpdateQuizManagerChosenCapsules())
      });
  };

  public openPopupDataLayer = (ingredient) => {
    pushGa4EcommerceEvent('view_item', {
      singleItem: {
        item_name: ingredient.name,
        item_id: ingredient.sku ?? ingredient.id,
        price: ingredient.price,
        quantity: 1,
        code: ingredient.code
      },
      userId: this.UserManager.getCustomerExternalReference()
    });
  };

  public openIngredientPopup = (ingredient) => {
    if (ingredient.sku !== null) {
      return false;
    }
    this.dialog.open(IngredientDialogComponent, {
      data: {
        ingredient
      },
      panelClass: 'ingredient-slide-left'
    });
    this.openPopupDataLayer(ingredient);
  };

  public closeThisPopup = () => {
    this.dialog.closeAll();
  };
}
