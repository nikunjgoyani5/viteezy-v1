import * as angular from 'angular';
import { Component, Inject } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDialogComponent } from 'src/app/features/dialogs/ingredient/ingredient.component';
import { AdditionalProductsComponent } from 'src/app/features/dialogs/additional-products/additional-products.component';
import {
  InactiveIngredientsWarningComponent,
  InactiveShipmentDecision
} from 'src/app/features/dialogs/inactive-ingredients-warning/inactive-ingredients-warning.component';

import { BlendManager, RootScope, Toast, UIRouterState, UserManager } from 'src/app/ajs-upgraded-providers';
import { BlendService } from 'src/app/core/services/blend.service';
import { ContentService } from 'src/app/core/services/content.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { KlaviyoService } from 'src/app/core/services/klaviyo.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { PostNLService } from 'src/app/core/services/postnl.service';
import { QuizService } from 'src/app/core/services/quiz.service';
import { StrapiService } from 'src/app/core/services/strapi.service';
import { NgForm } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { buildGa4Item, pushGa4EcommerceEvent } from 'src/app/core/utils/ga4-tracking';

declare var window: any;

@Component({
  selector: 'blend',
  templateUrl: './blend.component.html',
  styleUrl: './blend.component.scss'
})
export class BlendComponent {
  private static readonly INACTIVE_PRENATAL_DECISION_KEY = 'inactivePrenatalShipmentDecision';
  private static readonly SHIPMENT_PREFERENCE_SPLIT = 'split_shipment';
  private static readonly SHIPMENT_PREFERENCE_HOLD = 'hold_order';
  private datalayerProducts = [];
  private postNlVerifiedAddress: any;
  private productpages: any[];
  private timer;
  private waitTime = 2000;
  public additionalProducts = [];
  public blendStep: number;
  public blendStepName: string;
  public checkoutBanner: any;
  public displayAdditionalProducts: boolean;
  public houseNumberAdditions: any;
  public isCheckout: boolean;
  public isDomain: boolean;
  public noAddressFound: any;
  public pricing: any;
  public showHouseNumerAddition: boolean;
  public showStreet: boolean;
  public user: any;
  public vitamines: any[];
  public inactiveShipmentPreference: string | null = null;
  private hasShownInactiveIngredientsWarning = false;
  private pendingStepEvent = false;
  private afterBlendRefreshEvent: string | null = null;

  constructor(
    @Inject(BlendManager) private BlendManager,
    @Inject(RootScope) private $rootScope,
    @Inject(Toast) private toast,
    @Inject(UIRouterState) private $state,
    @Inject(UserManager) private UserManager,
    private quizService: QuizService,
    private klaviyoService: KlaviyoService,
    private contentService: ContentService,
    private blendService: BlendService,
    private ingredientService: IngredientService,
    private paymentService: PaymentService,
    private customerService: CustomerService,
    private postNLService: PostNLService,
    private strapiService: StrapiService,
    private dialog: MatDialog) { }

  public ngOnInit(): void {
    if (this.$state.params.reference !== undefined) {
      this.UserManager.setBlendExternalReference(this.$state.params.reference);
    }
    if (this.UserManager.getBlendExternalReference() === undefined) {
      return this.$state.go("homepage");
    }
    if (this.$state.params.coupon !== undefined) {
      sessionStorage.setItem("pricingCoupon", this.$state.params.coupon);
    }
    if (this.$state.params.months !== undefined) {
      sessionStorage.setItem("selectedMonths", this.$state.params.months);
    }
    this.user = {};
    this.inactiveShipmentPreference = this.getNormalizedShipmentPreference(
      sessionStorage.getItem(BlendComponent.INACTIVE_PRENATAL_DECISION_KEY)
    );
    if (this.inactiveShipmentPreference) {
      sessionStorage.setItem(BlendComponent.INACTIVE_PRENATAL_DECISION_KEY, this.inactiveShipmentPreference);
    }
    this.blendStepName = "view_cart";
    let blendStep = parseInt(this.$state.params.blendStep);

    this.strapiService.getProductPages().subscribe(response => {
      this.productpages = response.data;
      this.getBlendInformation();
    }, error => {
      this.getBlendInformation();
    });

    if (isNaN(blendStep) && this.$state.params.blendStep !== undefined) {
      this.UserManager.setBlendExternalReference(this.$state.params.blendStep);
      this.quizService.getByBlendExternalReference(this.$state.params.blendStep).subscribe((result) => {
        if (result.externalReference) {
          this.UserManager.setQuizExternalReference(result.externalReference);
        }
      });
      this.blendStep = 1;
    } else {
      window.scrollTo(0, 0);
      this.blendStep = blendStep;
      this.isCheckout = this.blendStep === 3;
      if (this.isCheckout) {
        this.getCustomerInformation();
        this.blendStepName = "add_shipping_info";
        this.klaviyoService.notifyCheckout(this.UserManager.getBlendExternalReference()).subscribe();
      }
    }

    this.contentService.getByCode("checkout-banner").subscribe((response) => {
      this.checkoutBanner = response;
    });

    this.pendingStepEvent = true;

    if (this.$state.current.name === "domainblend") {
      this.isDomain = true;
    }
  };

  private getBlendInformation = () => {
    this.vitamines = [];
    this.additionalProducts = [];
    this.datalayerProducts = [];
    this.blendService.getBlendIngredientsByExternalReference(this.UserManager.getBlendExternalReference())
      .pipe(
        switchMap((blendIngredients) => {
          if (!blendIngredients.length) {
            return of([] as Array<{ blendIngredient: any; ingredient: any }>);
          }

          const requests: Observable<{ blendIngredient: any; ingredient: any }>[] =
            blendIngredients.map((blendIngredient) =>
              this.ingredientService.getById(blendIngredient.ingredientId).pipe(
                map((ingredient) => ({ blendIngredient, ingredient }))
              )
            );

          return forkJoin(requests);
        })
      )
      .subscribe((results) => {
        results.forEach(({ blendIngredient, ingredient }) => {
          this.vitamines.push({
            id: ingredient.id,
            name: ingredient.name,
            content: this.getIngredientContent(ingredient),
            price: blendIngredient.price,
            explanation: this.splitExplanation(blendIngredient.explanation),
            sku: ingredient.sku,
            code: ingredient.code,
            isActive: ingredient.isActive
          });

          if (this.datalayerProducts.findIndex(result => result.item_id === blendIngredient.ingredientId) === -1) {
            this.datalayerProducts.push(buildGa4Item({
              item_name: ingredient.name,
              item_id: ingredient.sku ?? blendIngredient.ingredientId,
              price: blendIngredient.price,
              quantity: 1,
              code: ingredient.code
            }));
            window.blendProducts = this.datalayerProducts;
          }
        });
        this.showInactiveIngredientsWarningIfNeeded();
        this.renderBlend();
        this.maybePushStepEvent();
        if (this.afterBlendRefreshEvent) {
          this.pushCartEvent(this.afterBlendRefreshEvent);
          this.afterBlendRefreshEvent = null;
        }
      });
  }

  private maybePushStepEvent = () => {
    if (!this.pendingStepEvent) {
      return;
    }

    this.pushCartEvent(this.blendStepName);
    this.pendingStepEvent = false;
  }

  private showInactiveIngredientsWarningIfNeeded = () => {
    const inactiveIngredients = this.getInactiveIngredientNames();
    const existingDecision = this.getNormalizedShipmentPreference(
      sessionStorage.getItem(BlendComponent.INACTIVE_PRENATAL_DECISION_KEY)
    );
    this.inactiveShipmentPreference = existingDecision;
    if (!inactiveIngredients.length || this.hasShownInactiveIngredientsWarning || !!existingDecision) {
      return;
    }

    this.hasShownInactiveIngredientsWarning = true;
    this.openInactiveIngredientsWarningDialog(inactiveIngredients);
  }

  public getInactiveShipmentPreferenceLabel = (): string => {
    const shipmentPreference = this.getNormalizedShipmentPreference(this.inactiveShipmentPreference);
    if (shipmentPreference === BlendComponent.SHIPMENT_PREFERENCE_SPLIT) {
      return 'Verstuur nu, naleveren later';
    }

    if (shipmentPreference === BlendComponent.SHIPMENT_PREFERENCE_HOLD) {
      return 'Wacht en verstuur alles samen';
    }

    return '';
  }

  public canShowInactiveShipmentPreference = (): boolean => {
    return !!this.getNormalizedShipmentPreference(this.inactiveShipmentPreference)
      && this.getInactiveIngredientNames().length > 0;
  }

  public changeInactiveShipmentPreference = () => {
    const inactiveIngredients = this.getInactiveIngredientNames();
    if (!inactiveIngredients.length) {
      return;
    }

    this.openInactiveIngredientsWarningDialog(inactiveIngredients);
  }

  private openInactiveIngredientsWarningDialog = (inactiveIngredients: string[]) => {
    this.dialog.open(InactiveIngredientsWarningComponent, {
      autoFocus: false,
      panelClass: 'capsule-popup',
      data: {
        inactiveIngredients
      }
    }).afterClosed().subscribe((decision: InactiveShipmentDecision | undefined) => {
      if (decision) {
        const shipmentPreference = decision === 'split-shipment'
          ? BlendComponent.SHIPMENT_PREFERENCE_SPLIT
          : BlendComponent.SHIPMENT_PREFERENCE_HOLD;
        sessionStorage.setItem(BlendComponent.INACTIVE_PRENATAL_DECISION_KEY, shipmentPreference);
        this.inactiveShipmentPreference = shipmentPreference;
        if (shipmentPreference === BlendComponent.SHIPMENT_PREFERENCE_SPLIT) {
          this.toast.show('Je keuze is opgeslagen: eerst beschikbare producten, niet-beschikbare producten later.', 'info');
        } else {
          this.toast.show('Je keuze is opgeslagen: bestelling wordt verzonden zodra alles beschikbaar is.', 'info');
        }
      }
    });
  }

  private getNormalizedShipmentPreference = (shipmentPreference: string | null): string | null => {
    if (!shipmentPreference) {
      return null;
    }

    if (shipmentPreference === 'split-shipment' || shipmentPreference === BlendComponent.SHIPMENT_PREFERENCE_SPLIT) {
      return BlendComponent.SHIPMENT_PREFERENCE_SPLIT;
    }

    if (shipmentPreference === 'hold-order' || shipmentPreference === BlendComponent.SHIPMENT_PREFERENCE_HOLD) {
      return BlendComponent.SHIPMENT_PREFERENCE_HOLD;
    }

    return null;
  }

  private getInactiveIngredientNames = (): string[] => {
    if (!this.vitamines?.length) {
      return [];
    }

    return this.vitamines
      .filter(vitamine => this.isInactiveProduct(vitamine))
      .map(vitamine => vitamine.content?.title || vitamine.name)
      .filter((name, index, allNames) => !!name && allNames.indexOf(name) === index);
  }

  private isInactiveProduct = (vitamine: any): boolean => {
    const isInactive = vitamine?.isActive === false
      || vitamine?.isActive === 0
      || String(vitamine?.isActive).toLowerCase() === 'false';

    return isInactive;
  }

  private renderBlend = () => {
    this.getAdditionalProducts(this.vitamines);
    this.$rootScope.$emit('blendChange', {});
  }

  private getIngredientContent(ingredient: any) {
    let content = null;
    try {
      content = this.productpages.filter(productPage => productPage.id === ingredient.strapiContentId)[0].attributes;
    } catch {
      content = null;
    }
    return content;
  }

  private getAdditionalProducts = (vitamines) => {
    this.displayAdditionalProducts = true;
    if (this.UserManager.getQuizExternalReference()) {
      this.quizService.getQuestionAnswers(this.UserManager.getQuizExternalReference(), "pregnancy-state")
        .subscribe(result => {
          if (result.pregnancyStateId === 2 || result.pregnancyStateId === 3) {
            this.displayAdditionalProducts = false;
          } else {
            this.showAdditionalProducts(vitamines);
          }
        }, error => {
          this.showAdditionalProducts(vitamines);
        });
    } else {
      this.showAdditionalProducts(vitamines);
    }
  }

  private showAdditionalProducts = (vitamines) => {
    this.ingredientService.getAdditionalProducts()
      .subscribe((additionalProductsresponse) => {
        additionalProductsresponse.filter(additionalProduct => !vitamines.find(vitamine => vitamine.id === additionalProduct.id)).forEach(ingredient => {
          this.additionalProducts.push({
            id: ingredient.id,
            name: ingredient.name,
            content: this.getIngredientContent(ingredient),
            priority: ingredient.priority,
            code: ingredient.code,
            isActive: ingredient.isActive,
            sku: ingredient.sku
          });
        });

        this.ingredientService.getIngredientPrices()
          .subscribe((prices) => {
            this.additionalProducts.map((record) => {
              const foundRecord = prices.find(price => price.ingredientId === record.id);
              if (foundRecord) {
                record.price = foundRecord.price;
              }
            });
          }, error => {
            this.toast.show("Er is iets misgegaan bij het ophalen van de prijzen, probeer het later nog eens", "error");
          }).add(() => {
            this.additionalProducts = this.additionalProducts.sort((a, b) => a.priority - b.priority).slice(0, 2);
          });
      });
  }

  public addAdditionalProduct = (ingredient) => {
    this.paymentService.getPaymentPlanByBlend(this.UserManager.getBlendExternalReference())
      .subscribe((response) => {
        if (response.status === "active") {
          this.BlendManager.addAddedCapsule(ingredient);
          this.vitamines.push({
            id: ingredient.id,
            name: ingredient.name,
            content: ingredient.content,
            price: ingredient.price,
            code: ingredient.code,
            isActive: ingredient.isActive
          });
          this.showInactiveIngredientsWarningIfNeeded();
          this.renderBlend();
          this.pushToDataLayer("add_to_cart", {
            item_name: ingredient.name,
            item_id: ingredient.sku ?? ingredient.id,
            price: ingredient.price,
            quantity: 1,
            code: ingredient.code
          });
          this.toast.show(`Druk op 'Aanpassing bevestigen' om je vitamineplan te ontvangen`, "info");
          this.additionalProducts = this.additionalProducts.filter(additionalProduct => additionalProduct.id !== ingredient.id);
        }
      }, error => {
        this.blendService.removeBlendIngredient(this.UserManager.getBlendExternalReference(), ingredient.id)
          .subscribe(() => {
            this.blendService.submitBlendIngredient(this.UserManager.getBlendExternalReference(), ingredient.id)
              .subscribe(() => {
                this.toast.show(`${ingredient.content.title} is toegevoegd aan je blend`, "info");
                this.additionalProducts = this.additionalProducts.filter(additionalProduct => additionalProduct.id !== ingredient.id);
                this.getBlendInformation();
                this.pushToDataLayer("add_to_cart", {
                  item_name: ingredient.name,
                  item_id: ingredient.sku ?? ingredient.id,
                  price: ingredient.price,
                  quantity: 1,
                  code: ingredient.code
                });
              }, error => {
                this.toast.show("Er is iets misgegaan bij toevoegen van dit ingredient, probeer het later nog eens", "error");
              });
          });
      });
  };

  public removeAdditionalCapsule = (capsule) => {
    this.additionalProducts = this.additionalProducts.filter(additionalProduct => additionalProduct.id !== capsule.id);
  };

  private splitExplanation = (explanations) => {
    if (explanations !== null) {
      let explanationArray = explanations.split("~").filter(explanation => explanation != "");
      if (explanationArray.length >= 2) {
        explanationArray = explanationArray.filter(explanation => !explanation.includes("onderwerp"));
      }
      return explanationArray;
    } else {
      return "";
    }
  };

  private pushCartEvent = (eventName: string) => {
    pushGa4EcommerceEvent(eventName, {
      items: this.datalayerProducts,
      userId: this.UserManager.getCustomerExternalReference()
    });
  };

  private pushToDataLayer = (eventName: string, item?: Record<string, unknown>) => {
    if (item) {
      pushGa4EcommerceEvent(eventName, {
        singleItem: item,
        userId: this.UserManager.getCustomerExternalReference()
      });
      return;
    }

    this.pushCartEvent(eventName);
  };

  private getCountry = () => {
    if (window.location.hostname.endsWith('.be') || (this.user && this.user.email && this.user.email.endsWith('.be'))) {
      return "BE";
    } else {
      return "NL";
    }
  };

  private getCustomerInformation = () => {
    this.customerService.getCustomerByBlend(this.UserManager.getBlendExternalReference())
      .subscribe((result) => {
        this.UserManager.setCustomerExternalReference(result.externalReference);
        if (this.UserManager.getUserLoggedIn()) {
          this.user.lastName = result.lastName;
          this.user.phoneNumber = result.phoneNumber;
          this.user.street = result.street;
          this.user.houseNumber = result.houseNumber === 0 ? "" : result.houseNumber;
          this.user.houseNumberAddition = result.houseNumberAddition;
          this.user.postcode = result.postcode;
          this.user.city = result.city;
          this.user.country = result.country ? result.country : this.getCountry();
          this.searchAddress();
        } else {
          this.user.country = this.getCountry();
        }
        this.user.firstName = result.firstName ? result.firstName : this.user.firstName;
        this.user.email = result.email ? result.email : this.user.email;
      }, error => {
        this.user.country = this.getCountry();
      });
  };

  public gotoPaymentInformation = () => {
    if (this.vitamines.length > 1) {
      this.pushCartEvent("initiate_checkout");
      this.$state.go("blend", { blendStep: 3 }).then(() => {
        this.isCheckout = true;
        this.blendStep = 3;
        this.blendStepName = "add_shipping_info";
        this.getCustomerInformation();
        this.klaviyoService.notifyCheckout(this.UserManager.getBlendExternalReference()).subscribe();
        this.pushCartEvent("add_shipping_info");
      });
    } else {
      this.toast.show("Voeg minimaal 2 producten toe aan je vitaminemix. Vanuit milieuoverwegingen verpakken wij altijd minimaal 2 capsules", "error");
    }
  };

  private openPopupDataLayer = ((ingredient) => {
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
  });

  // Use KlaviyoService to open Klaviyo popup form
  public klaviyoPopupService = () => {
    this.klaviyoService.openKlaviyoPopup();
  };

  public openIngredientPopup = (ingredient) => {
    if (ingredient.sku !== null) {
      return false;
    }
    this.dialog.open(IngredientDialogComponent, {
      autoFocus: false,
      data: {
        ingredient
      },
      panelClass: 'ingredient-slide-left'
    });
    this.openPopupDataLayer(ingredient);
  };

  private addIngredientToModel = (ingredient) => {
    const checkIfVitaminIsPresent = this.vitamines.filter(item => item.id == ingredient.id);

    if (!checkIfVitaminIsPresent.length) {
      this.vitamines.push({
        id: ingredient.id,
        name: ingredient.name,
        content: this.getIngredientContent(ingredient),
        price: ingredient.price,
        code: ingredient.code,
        isActive: ingredient.isActive
      });
      this.showInactiveIngredientsWarningIfNeeded();
      this.renderBlend();
    }
  };

  public openAdditionalProductPopup = () => {
    const vitamines = this.vitamines;
    this.dialog.open(AdditionalProductsComponent, {
      autoFocus: false,
      data: {
        vitamines
      },
      panelClass: 'capsule-popup'
    })
      .afterClosed()
      .subscribe((response) => {
        if (this.$state.current.name === "blend") {
          window.scrollTo(0, 200);
          this.afterBlendRefreshEvent = "view_cart";
          this.getBlendInformation();
        } else {
          const addedIngredients = this.BlendManager.getAddedIngredients();
          [...addedIngredients].forEach(ingredient => {
            this.addIngredientToModel(ingredient);
          });
        }
      });
  };

  public createPayment = (form: NgForm) => {
    if (form.invalid) {
      return;
    }

    if (!this.ensureInactiveShipmentPreferenceSelected()) {
      return;
    }

    this.pushCartEvent("add_payment_info");
    if (this.noAddressFound) {
      this.toast.show("Adres wordt niet herkend", "error");
    } else {
      this.upsertCustomerAndCreatePayment();
    }
  };

  private upsertCustomerAndCreatePayment = () => {
    let customerInformation = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phoneNumber: this.user.phoneNumber,
      email: this.user.email,
      street: this.user.street,
      houseNumber: this.user.houseNumber,
      houseNumberAddition: this.user.houseNumberAddition,
      postcode: this.postNlVerifiedAddress.postalCode,
      city: this.user.city,
      country: this.user.country
    };

    this.customerService.updateCustomerInformation(this.UserManager.getBlendExternalReference(), customerInformation)
      .subscribe({
        next: (response) => {
          this.redirectToPaymentProvider();
        },
        error: (error: any) => {
          if (error.status === 409) {
            this.toast.show("Dit e-mailadres is al in gebruik, probeer een ander e-mailadres.", "error");
          } else {
            this.toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
          }
        }
      });
  }

  private ensureInactiveShipmentPreferenceSelected = (): boolean => {
    const inactiveIngredients = this.getInactiveIngredientNames();
    if (!inactiveIngredients.length) {
      return true;
    }

    const shipmentPreference = this.getNormalizedShipmentPreference(
      sessionStorage.getItem(BlendComponent.INACTIVE_PRENATAL_DECISION_KEY)
    );
    this.inactiveShipmentPreference = shipmentPreference;
    if (shipmentPreference) {
      return true;
    }

    this.toast.show("Kies eerst hoe je bestelling met tijdelijke niet-beschikbare producten verstuurd moet worden.", "error");
    this.openInactiveIngredientsWarningDialog(inactiveIngredients);
    return false;
  }

  private redirectToPaymentProvider = () => {
    let element = document.getElementsByClassName('pricing__cta-button');
    for (let i = 0; i < element.length; i++) {
      element[i].classList.add('button--loading');
    }
    const isSubscription = sessionStorage.getItem("selectedMonths") !== "0";
    const monthsSubscribed = isSubscription ? sessionStorage.getItem("selectedMonths") : 1;
    const paymentMethodInput = sessionStorage.getItem("paymentMethod");
    sessionStorage.removeItem("paymentMethod");
    this.paymentService.submitBlend(this.UserManager.getBlendExternalReference(),
      {
        couponCode: sessionStorage.getItem("pricingCoupon") || null,
        monthsSubscribed: monthsSubscribed,
        isSubscription: isSubscription,
        fbclid: window.sessionStorage.getItem("fbclid"),
        method: paymentMethodInput,
        shipmentPreference: sessionStorage.getItem(BlendComponent.INACTIVE_PRENATAL_DECISION_KEY) || null
      }).subscribe({
        next: (response) => {
          window.location.href = response.checkoutUrl;
        },
        error: (error: any) => {
          for (let i = 0; i < element.length; i++) {
            element[i].classList.remove('button--loading');
          }
          if (error.status === 409) {
            this.toast.show("Dit e-mailadres is al in gebruik, probeer een ander e-mailadres.", "error");
          } else {
            this.toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
          }
        }
      });
  };

  public saveUpdatedBlend = () => {
    if (this.vitamines.length > 1) {
      this.BlendManager.saveUpdatedBlend();
      setTimeout(() => {
        this.getBlendInformation();
      }, 2500);
    } else {
      this.toast.show("Voeg minimaal 2 producten toe aan je vitaminemix. Vanuit milieuoverwegingen verpakken wij altijd minimaal 2 capsules", "error");
    }
  }

  public removeIngredientFromBlend = ((ingredient) => {
    this.vitamines = this.vitamines.filter(result => result.id !== ingredient.id);

    this.datalayerProducts = this.datalayerProducts.filter(result => result.item_id !== (ingredient.sku ?? ingredient.id));
    this.BlendManager.removeIngredientFromBlend(ingredient)
      .then(() => {
        this.getBlendInformation();
        this.pushToDataLayer("remove_from_cart", {
          item_name: ingredient.name,
          item_id: ingredient.sku ?? ingredient.id,
          price: ingredient.price,
          quantity: 1,
          code: ingredient.code
        });
      });
  });

  private searchAddress = () => {
    if (this.user.postcode && this.user.houseNumber && (this.user.country === "NL" || this.user.street)) {
      let houseNumber = this.user.houseNumber;
      for (let i = 0; i < houseNumber.length; i++) {
        if (isNaN(houseNumber[i]) || isNaN(parseFloat(houseNumber[i]))) {
          this.houseNumberAdditions = houseNumber.substring(i).trim().replace(/\s+/g, ' ').replace(/[^a-z0-9\s]/gi, '');
          this.user.houseNumberAddition = this.houseNumberAdditions;
          this.user.houseNumber = houseNumber.substring(0, i);
          break;
        }
      }

      if (this.user.houseNumber) {
        this.postNLService.checkAddress({
          countryIso: this.user.country,
          postalCode: this.user.postcode,
          houseNumber: this.user.houseNumber,
          houseNumberAddition: this.user.houseNumberAddition,
          street: this.user.country === "BE" ? this.user.street : "",
          city: this.user.country === "BE" ? this.user.city : ""
        }).subscribe((response) => {
          this.checkMailabilityScore(response);
          if (response.length === 0) {
            this.resetAddressInput();
            this.noAddressFound = true;
          } else if (response.length === 1) {
            this.setCity(response[0].city);
            this.setStreet(response[0].street);
            if (this.user.country === "NL") {
              this.houseNumberAdditions = response[0].houseNumberAddition;
              this.user.houseNumberAddition = response[0].houseNumberAddition;
            }
          } else {
            this.resetAddressInput();
            this.setCity(response[0].city);
            if (this.user.country === "NL") {
              this.user.street = response[0].street;
              this.houseNumberAdditions = response.map(record => record.houseNumberAddition);
            }
          }
        }, error => {
          this.toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
          this.resetAddressInput();
          this.noAddressFound = true;
        });
      }
    }
  };

  public addressInputBlur = () => {
    clearTimeout(this.timer);
    this.searchAddress();
  }

  public addressInputChange = (isResetAddress) => {
    this.noAddressFound = false;
    clearTimeout(this.timer);
    if (this.user.country === "NL") {
      this.showStreet = false;
    } else {
      this.showStreet = true;
      this.showHouseNumerAddition = true;
    }
    if (isResetAddress) {
      this.resetAddressInput();
    }
    this.timer = setTimeout(() => {
      this.searchAddress();
    }, this.waitTime);
  };

  private setStreet = (street) => {
    if (this.user.country === "BE" && this.user.street !== street) {
      this.user.street = street;
      this.searchAddress();
    }
    this.user.street = street;
  }

  private setCity = (city) => {
    if (this.user.country === "BE" && this.user.city === undefined) {
      this.user.city = city;
      this.searchAddress();
    }
    this.user.city = city;
  }

  private resetAddressInput = () => {
    if (this.user.country === "NL") {
      this.user.street = undefined;
      this.user.city = undefined;
      this.user.houseNumberAddition = undefined;
      this.houseNumberAdditions = undefined;
    }
  }

  private checkMailabilityScore = (address) => {
    if (address.length > 0) {
      if (this.user.country === "NL") {
        this.noAddressFound = address[0].mailabilityScore !== 100;
      } else {
        this.noAddressFound = address[0].mailabilityScore <= 60;
      }
      this.postNlVerifiedAddress = address[0];
    }
  }

}

angular.module('blend', [])
  .directive('blend', downgradeComponent({ component: BlendComponent }) as angular.IDirectiveFactory);
