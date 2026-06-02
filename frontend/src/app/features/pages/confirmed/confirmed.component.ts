import * as angular from 'angular';
import { Component, Inject } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

import { Toast, UIRouterState, UserManager } from 'src/app/ajs-upgraded-providers';
import { CustomerService } from 'src/app/core/services/customer.service';
import { BlendService } from 'src/app/core/services/blend.service';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { buildGa4Item, pushGa4EcommerceEvent } from 'src/app/core/utils/ga4-tracking';

declare var window: any;
declare var AWIN: any;

@Component({
  selector: 'confirmed',
  templateUrl: './confirmed.component.html',
  styleUrl: './confirmed.component.scss'
})

export class ConfirmedComponent {

  public loading = true;
  public user: any;
  public paymentPlanExternalReference: any;
  public customer: any;
  public referralPageVisible = false;

  constructor(
    @Inject(UIRouterState) private $state,
    @Inject(Toast) private toast,
    @Inject(UserManager) private UserManager,
    private customerService: CustomerService,
    private blendService: BlendService,
    private ingredientService: IngredientService,
    private paymentService: PaymentService) {}

  public ngOnInit(): void {
    this.user = {};
    this.paymentPlanExternalReference = this.$state.params.paymentPlanExternalReference;

    this.customerService.getByPaymentPlanReference(this.paymentPlanExternalReference)
      .subscribe((response) => {
        this.customer = response;
        this.UserManager.setCustomerExternalReference(response.externalReference);

        this.blendService.getAggregatedByPaymentPlanExternalReference(this.paymentPlanExternalReference)
          .subscribe((response) => {
            if (response.quizExternalReference) {
              this.UserManager.setQuizExternalReference(response.quizExternalReference);
            }
            if (response.blendExternalReference) {
              this.UserManager.setBlendExternalReference(response.blendExternalReference);
            }
            this.getPaymentStatus();
          });
      });
  }

  private handleStatus = ((result) => {
    const status = result.status;

    if (status === "pending" || status === "pending-single-buy") {
      window.setTimeout(() => {
        this.getPaymentStatus();
      }, 1000);
    } else if (status === "active" || status === "paid-single-buy") {
      this.loading = false;

      this.blendService.getBlendIngredientsByExternalReference(this.UserManager.getBlendExternalReference())
        .pipe(
          switchMap((blendIngredients) => {
            const activeIngredients = blendIngredients.filter((blendIngredient) => blendIngredient.amount > 0.000);
            if (!activeIngredients.length) {
              return of([] as Array<{ blendIngredient: any; ingredient: any }>);
            }

            const requests: Observable<{ blendIngredient: any; ingredient: any }>[] =
              activeIngredients.map((blendIngredient) =>
                this.ingredientService.getById(blendIngredient.ingredientId).pipe(
                  map((ingredient) => ({ blendIngredient, ingredient }))
                )
              );

            return forkJoin(requests);
          })
        )
        .subscribe((purchaseItems) => {
          const items = purchaseItems.map(({ blendIngredient, ingredient }) => buildGa4Item({
            item_name: ingredient.name,
            item_id: ingredient.sku ?? blendIngredient.ingredientId,
            price: blendIngredient.price,
            quantity: 1,
            code: ingredient.code,
            item_variant: result.recurringMonths === 1 ? `${result.recurringMonths} maand` : `${result.recurringMonths} maanden`
          }));

          pushGa4EcommerceEvent('purchase', {
            items,
            transactionId: this.paymentPlanExternalReference,
            currency: 'EUR',
            value: result.firstAmount / 1.09,
            tax: (result.firstAmount) / 109 * 9,
            userId: this.customer.externalReference,
            email: this.customer.email
          });
        });

      if (typeof AWIN != "undefined" && typeof AWIN.Tracking != "undefined") {
        AWIN.Tracking.Sale = {};
        AWIN.Tracking.Sale.amount = result.firstAmount / (1.09.toFixed(2) as any);
        AWIN.Tracking.Sale.channel = "aw";
        AWIN.Tracking.Sale.orderRef = this.paymentPlanExternalReference;
        AWIN.Tracking.Sale.parts = "DEFAULT:" + parseFloat(result.firstAmount / 1.09 as any).toFixed(2);
        AWIN.Tracking.Sale.currency = "EUR";
        AWIN.Tracking.Sale.test = "0";
        AWIN.Tracking.run();
      }
    } else {
      this.redirectToCheckout();
    }
  });

  private getPaymentStatus = () => {
    this.paymentService.getPaymentStatus(this.paymentPlanExternalReference)
      .subscribe((result) => {
        this.handleStatus(result);
      },
      (error) => {
        console.error(error);
        this.toast.show("Er is iets misgegaan bij het ophalen van de status, probeer het later nog eens", "error");
      });
  };

  private redirectToCheckout = (() => {
    this.$state.go("blend", { blendStep: 3 });
  });

  private buildReferralButton = (referralCode) => {
    let url = "https://api.whatsapp.com/send?text=Hi,%20wil%20jij%20ook%20aan%20je%20gezondheidsdoelen%20werken%3F%20Dan%20heb%20ik%20iets%20leuks%20voor%20je%3A%20%E2%82%AC%2010%20korting%20op%20je%20eerste%20Viteezy%20vitamineplan%20op%20maat!%20Ga%20naar%20www.viteezy.nl%2C%20maak%20binnen%20een%20paar%20minuten%20de%20vitaminetest%20en%20vul%20mijn%20code%3A%20" + referralCode + "%20in%20om%20je%20korting%20te%20ontvangen.%20Isn%E2%80%99t%20that%20what%20friends%20are%20for%3F%20";
    (document.getElementById("referral-button") as HTMLAnchorElement).href = url;
  }

  public toggleReferralPage = () => {
    this.referralPageVisible = !this.referralPageVisible;
    this.buildReferralButton(this.customer.referralCode);
  };
}

angular.
  module('confirmed', [])
    .directive('confirmed', downgradeComponent({component: ConfirmedComponent}) as angular.IDirectiveFactory);
