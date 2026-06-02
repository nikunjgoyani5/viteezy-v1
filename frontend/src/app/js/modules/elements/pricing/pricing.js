"use strict";

angular.module("app.elements.pricing", [])
  .directive("viPricing", ["$state", "UserManager", "Payment", "Coupon", "Customer", function ($state, UserManager, Payment, Coupon, Customer) {
    return {
      restrict: "E",
      scope: {
        proteines: "=",
        vitamines: "=",
        actions: "&",
        daily: "@",
        pricing: "=",
        submitButtonText: "@",
        disableMonths: "@"
      },
      controller: "PricingController",
      controllerAs: "vm",
      bindToController: true,
      templateUrl: "app/js/modules/elements/pricing/pricing.html"
    };
  }])
  .controller("PricingController", ["$state", "$rootScope", "UserManager", "Payment", "Coupon", "Customer", "Blend", "Ingredient", "Pricing", "toast", function ($state, $rootScope, UserManager, Payment, Coupon, Customer, Blend, Ingredient, Pricing, toast) {

    let ingredientIds = null;

    const getPricing = () => {
      sessionStorage.setItem("selectedMonths", this.pricing.months);
      const isSubscription = this.pricing.months !== "0";
      const monthsSubscribed = isSubscription ? this.pricing.months : 1;
      Pricing.getBlendPricing({ blendExternalReference: UserManager.getBlendExternalReference() },
        {
          ingredientIds: ingredientIds,
          couponCode: this.pricing.couponCode,
          monthsSubscribed: monthsSubscribed,
          isSubscription: isSubscription,
        }).$promise
        .then((response) => {
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
        });
    }

    this.$onInit = () => {
      this.pricing = {};
      this.pricing.months = sessionStorage.getItem("selectedMonths") ? sessionStorage.getItem("selectedMonths") : "1";

      const savedCoupon = sessionStorage.getItem("pricingCoupon") || undefined;
      if (savedCoupon) {
        this.pricing.couponCode = savedCoupon;
        sessionStorage.removeItem("pricingCoupon");
        checkCouponCode();
      }

      Blend.getBlend({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise
        .then((response) => {
          this.singleBuyAvailable = response.status === "BUNDLE" && $state.current.name !== "domainblend";
        });

      if ($state.current.name === "domainblend") {
        this.hideCouponCodeInput = true;
        this.isDomain = true;
        Payment.getPaymentPlanByBlend({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise
          .then((response) => {
            this.pricing.months = response.recurringMonths.toString();
            sessionStorage.setItem("selectedMonths", response.recurringMonths);
            getPricing();
          });
      } else {
        getPricing();
      }

      paymentMethods();
    };

    $rootScope.$on('blendChange', function (event, vitamines) {
      ingredientIds = vitamines != null && vitamines.length > 0 ? vitamines.map(vitamine => vitamine.id) : null;
      getPricing();
    });

    this.getPricing = () => {
      checkCouponCode();
      getPricing();
    }

    this.checkCouponCode = () => {
      checkCouponCode();
      getPricing();
    };

    const checkCouponCode = () => {
      this.discountedIngredient = null;
      this.pricing.couponError = false;
      this.pricing.couponPlanError = false;

      if (this.pricing.couponCode != undefined && this.pricing.couponCode != "") {
        Coupon.getCouponCode({ couponCode: this.pricing.couponCode }).$promise
        .then((result) => {
          if (result.recurringMonths == null || this.pricing.months == result.recurringMonths) {
            this.pricing.coupon = result;
            this.isRecurringCoupon = result.recurring;
            sessionStorage.setItem("pricingCoupon", this.pricing.couponCode);
            if (result.ingredientId) {
              Ingredient.getBlendIngredientsByExternalReference({ blendExternalReference: UserManager.getBlendExternalReference() }).$promise
                .then((blendIngredients) => {
                  if (!blendIngredients.filter(blendIngredient => blendIngredient.ingredientId === result.ingredientId).length) {
                    Blend.submitBlendIngredient({ blendExternalReference: UserManager.getBlendExternalReference(), ingredientId: result.ingredientId }, {}).$promise
                      .then((response) => {
                        $state.reload();
                        Ingredient.getIngredientById({ id: result.ingredientId }).$promise
                          .then((ingredient) => {
                            toast.show(`${ingredient.name} is toegevoegd`, "info")
                          });
                      });
                  } else {
                    Ingredient.getIngredientById({ id: result.ingredientId }).$promise
                      .then((ingredient) => {
                        this.discountedIngredient = ingredient.name;
                      });
                  }
                });
            }
          } else {
            this.pricing.couponPlanError = true;
          }
        })
        .catch(() => {
          Customer.checkByReferralCode({ referralCode: this.pricing.couponCode }).$promise
            .then((result) => {
              this.pricing.coupon = {};
              this.pricing.coupon.percentage = false;
              this.pricing.coupon.minimumAmount = result.minimumPrice;
              this.referralFirstName = result.firstName;
              this.isRecurringCoupon = false;
            }).catch(() => {
              this.pricing.couponError = true;
            });
        });
      }
    };

    let checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm !== null) {
      checkoutForm.addEventListener('submit', function (event) {
        if (event.submitter.id === "payment-submit") {
          let firstInvalidControl = checkoutForm.getElementsByClassName('input-error')[0];
          scrollToJustAbove(firstInvalidControl);
        }
      });
    }

    function scrollToJustAbove(element, margin = 125) {
      if (element !== undefined) {
        let dims = element.getBoundingClientRect();
        window.scrollTo(window.scrollX, dims.top - margin + window.scrollY);
      }
    }

    const getCountry = () => {
      if (window.location.hostname.endsWith('.be') || (this.user && this.user.email && this.user.email.endsWith('.be'))) {
        return "BE";
      } else {
        return "NL";
      }
    };

    const paymentMethods = () => {
      Payment.getMethods({ country: getCountry() }, {}).$promise
        .then((response) => {
          this.paymentMethods = response;
        });
    }

  }]);
