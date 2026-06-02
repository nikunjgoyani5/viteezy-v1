import { Component, Inject, Input } from '@angular/core';
import { RootScope, Toast, UIRouterState, UserManager } from 'src/app/ajs-upgraded-providers';
import { BlendService } from 'src/app/core/services/blend.service';
import { CouponService } from 'src/app/core/services/coupon.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { IngredientService } from 'src/app/core/services/ingredient.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { PricingService } from 'src/app/core/services/pricing.service';

@Component({
  selector: 'pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  @Input('action') action: () => void;
  @Input('submitButtonText') submitButtonText = "";
  discountedIngredient: null;
  hideCouponCodeInput: boolean;
  isDomain: boolean;
  isRecurringCoupon: boolean;
  paymentMethods: any;
  pricing: any;
  referralFirstName: any;
  singleBuyAvailable: boolean;
  user: any;
  isApplePaySession: boolean;

  private debounceTimer: any;

  constructor(
    @Inject(UserManager) private UserManager,
    @Inject(RootScope) private $rootScope,
    @Inject(Toast) private toast,
    @Inject(UIRouterState) private $state,
    private customerService: CustomerService,
    private blendService: BlendService,
    private ingredientService: IngredientService,
    private paymentService: PaymentService,
    private pricingService: PricingService,
    private couponService: CouponService) {

  }

  public ngOnInit(): void {
    this.pricing = {};
    this.pricing.months = sessionStorage.getItem("selectedMonths") ? sessionStorage.getItem("selectedMonths") : "1";
    this.isApplePaySession = (window as any).ApplePaySession && (window.location.protocol === "https:") && (window as any).ApplePaySession.canMakePayments();

    if (this.$state.current.name === "domainblend") {
      this.isDomain = true;
      sessionStorage.removeItem("pricingCoupon");
    } else {
      const savedCoupon = sessionStorage.getItem("pricingCoupon") || undefined;
      if (savedCoupon) {
        this.pricing.couponCode = savedCoupon;
        sessionStorage.removeItem("pricingCoupon");
        this.checkCouponCode();
      }
    }

    this.blendService.getBlend(this.UserManager.getBlendExternalReference())
      .subscribe((response) => {
        this.singleBuyAvailable = response.status === "BUNDLE" && this.$state.current.name !== "domainblend";
      });

    if (this.isDomain) {
      this.hideCouponCodeInput = true;
      this.paymentService.getPaymentPlanByBlend(this.UserManager.getBlendExternalReference())
        .subscribe((response) => {
          this.pricing.months = response.recurringMonths.toString();
          sessionStorage.setItem("selectedMonths", response.recurringMonths);
          this.getPricing();
        });
    } else {
      this.getPricing();
    }

    this.getPaymentMethods();

    this.$rootScope.$on('blendChange', (event, args) => {
      this.getPricing();
    });

    let checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm !== null) {
      checkoutForm.addEventListener('submit', function (event) {
        if (event.submitter.id === "payment-submit") {
          let firstInvalidControl = checkoutForm.getElementsByClassName('input-error')[0];
          if (firstInvalidControl !== undefined) {
            let dims = firstInvalidControl.getBoundingClientRect();
            window.scrollTo(window.scrollX, dims.top - 125 + window.scrollY);
          }
        }
      });
    }
  }

  public getPricing = () => {
    sessionStorage.setItem("selectedMonths", this.pricing.months);
    const isSubscription = this.pricing.months !== "0";
    const monthsSubscribed = isSubscription ? this.pricing.months : 1;
    
    // Preserve the current coupon code before making the API call
    // const currentCouponCode = this.pricing.couponCode;
    
    this.pricingService.getBlendPricing(this.UserManager.getBlendExternalReference(),
      {
        couponCode: this.pricing.couponCode,
        monthsSubscribed: monthsSubscribed,
        isSubscription: isSubscription,
      }).subscribe((response) => {
        this.pricing.basePrice = response.basePrice;
        this.pricing.basePriceCoupon = response.basePrice;
        this.pricing.noSubscriptionFee = response.noSubscriptionFee;
        if (this.pricing.months === "0") {
          if (this.singleBuyAvailable) {
            this.pricing.basePrice = response.basePrice + response.noSubscriptionFee;
          }
        } else if (this.pricing.months === "1") {
          if (this.singleBuyAvailable) {
            this.pricing.basePrice = response.basePrice + response.noSubscriptionFee;
            this.pricing.planDiscount = response.noSubscriptionFee;
          }
        } else if (this.pricing.months === "3") {
          if (this.singleBuyAvailable) {
            this.pricing.basePrice = response.basePrice + response.noSubscriptionFee;
            this.pricing.planDiscount = response.threeMonthPlanDiscount + response.noSubscriptionFee;
          } else {
            this.pricing.planDiscount = response.threeMonthPlanDiscount;
          }
        }
        this.pricing.couponDiscount = response.couponDiscount;
        this.pricing.referralDiscount = response.referralDiscount;
        this.pricing.shippingCost = response.shippingCost;
        this.pricing.firstAmount = response.firstAmount;
        this.pricing.recurringAmount = response.recurringAmount;
        
        // Restore the coupon code after processing the response
        // this.pricing.couponCode = currentCouponCode;
      });
  }

  // debounce coupon code change
  public onCouponCodeChange = (couponCode: string) => {
    this.pricing.couponCode = couponCode;

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.checkCouponCode();
    }, 500);
  };

  public checkCouponCode = () => {
    sessionStorage.setItem("pricingCoupon", this.pricing.couponCode);

    // Reset when field is empty
    if (!this.pricing.couponCode || this.pricing.couponCode.trim() === '') {
      this.pricing.coupon = null;
      this.pricing.couponDiscount = 0;
      this.discountedIngredient = null;
      this.isRecurringCoupon = false;
      this.referralFirstName = null;
      this.pricing.couponError = false;
      this.pricing.couponPlanError = false;

      this.getPricing(); // force UI recalculation
      return;
    }

    this.pricing.coupon = {};
    this.discountedIngredient = null;
    this.pricing.couponError = false;
    this.pricing.couponPlanError = false;

    if (this.pricing.couponCode != undefined && this.pricing.couponCode != "") {
      this.couponService.getCouponCode(this.pricing.couponCode)
        .subscribe((result) => {
        if (result.recurringMonths == null || this.pricing.months == result.recurringMonths) {
          this.pricing.coupon = result;
          this.isRecurringCoupon = result.recurring;
          if (result.ingredientId) {
            this.blendService.getBlendIngredientsByExternalReference(this.UserManager.getBlendExternalReference())
              .subscribe((blendIngredients) => {
                if (!blendIngredients.filter(blendIngredient => blendIngredient.ingredientId === result.ingredientId).length) {
                  this.blendService.submitBlendIngredient(this.UserManager.getBlendExternalReference(), result.ingredientId)
                    .subscribe((response) => {
                      this.$state.reload();
                      this.ingredientService.getById(result.ingredientId)
                        .subscribe((ingredient) => {
                          this.toast.show(`${ingredient.name} is toegevoegd`, "info")
                        });
                    });
                } else {
                  this.ingredientService.getById(result.ingredientId)
                    .subscribe((ingredient) => {
                      this.discountedIngredient = ingredient.name;
                    });
                }
              });
          }
        } else {
          this.pricing.couponPlanError = true;
        }
      },error => {
        this.customerService.checkByReferralCode(this.pricing.couponCode)
          .subscribe((result) => {
            this.pricing.coupon = {};
            this.pricing.coupon.percentage = false;
            this.pricing.coupon.minimumAmount = result.minimumPrice;
            this.referralFirstName = result.firstName;
            this.isRecurringCoupon = false;
            this.pricing.couponError = false;
          },error => {
            this.pricing.couponError = true;
          });
      }).add(() => {
        this.getPricing();
      });
    }
  };

  public setPaymentMethod = (method) => {
    sessionStorage.setItem("paymentMethod", method);
    document.getElementById('payment-submit').click();
  };

  private getCountry = () => {
    if (window.location.hostname.endsWith('.be') || (this.user && this.user.email && this.user.email.endsWith('.be'))) {
      return "BE";
    } else {
      return "NL";
    }
  };

  private getPaymentMethods = () => {
    this.paymentMethods = {};
    this.paymentService.getMethods(this.getCountry())
      .subscribe((response) => {
        this.paymentMethods = response.filter(paymentMethod => paymentMethod.id !== "applepay" || this.isApplePaySession);
      });
  }
}

