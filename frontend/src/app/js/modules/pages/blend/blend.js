"use strict";

angular.module("app.pages.blend", [])

  .controller("BlendController", ["$rootScope", "ngDialog", "UserManager", "toast", "Payment", "Customer", "Quiz", "Blend", "$state", "Ingredient", "IngredientReason", "BlendManager", "PostNl", "Klaviyo", "Content", function ($rootScope, ngDialog, UserManager, toast, Payment, Customer, Quiz, Blend, $state, Ingredient, IngredientReason, BlendManager, PostNl, Klaviyo, Content) {
    const vm = this;
    this.pricing = {};
    let proteines = [];
    let vitamines = [];
    let blendProducts = [];
    let oldProducts = [];
    let pendingStepEvent = false;
    let additionalProducts = [];
    let additionalProductsDisplayed = false;

    let timer;
    let timerDataLayer;
    const waitTime = 2000;
    let postNlVerifiedAddress = {};

    this.$onInit = function () {
      if ($state.params.reference !== undefined) {
        UserManager.setBlendExternalReference($state.params.reference);
      }
      if (UserManager.getBlendExternalReference() === undefined) {
        return $state.go("homepage");
      }
      if ($state.params.coupon !== undefined) {
        sessionStorage.setItem("pricingCoupon", $state.params.coupon);
      }
      if ($state.params.months !== undefined) {
        sessionStorage.setItem("selectedMonths", $state.params.months);
      }
      this.user = {};
      this.blendStepName = "view_cart";
      let blendStep = parseInt($state.params.blendStep);

      if (isNaN(blendStep) && $state.params.blendStep !== undefined) {
        UserManager.setBlendExternalReference($state.params.blendStep);
        Quiz.getByBlendExternalReference({ blendExternalReference: $state.params.blendStep }).$promise.then((result) => {
          if (result.externalReference) {
            UserManager.setQuizExternalReference(result.externalReference);
          }
        });
        this.blendStep = 1;
      } else {
        window.scrollTo(0, 0);
        this.blendStep = blendStep;
        this.isCheckout = this.blendStep === 3;
        if (this.isCheckout) {
          getCustomerInformation();
          this.blendStepName = "add_shipping_info";
          Klaviyo.notifyCheckout({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise;
        }
      }
      getBlendInformation(true);
      pendingStepEvent = true;

      Content.getByCode({ code: "checkout-banner" }, {}).$promise
        .then((response) => {
          this.content = response;
        });

    };

    const getBlendInformation = (initialRender) => {
      proteines = [];
      vitamines = [];
      blendProducts = [];
      Ingredient.getBlendIngredientsByExternalReference({ blendExternalReference: UserManager.getBlendExternalReference() }).$promise.then((blendIngredients) => {
        if (initialRender) {
          oldProducts = blendIngredients;
          console.log(oldProducts);
        }

        const ingredientPromises = blendIngredients
          .filter((blendIngredient) => blendIngredient.amount > 0.000)
          .map((blendIngredient) => {
            return Ingredient.getIngredientById({ id: blendIngredient.ingredientId }).$promise.then((ingredient) => {
              vitamines.push({
                id: ingredient.id,
                ingredientId: blendIngredient.ingredientId,
                description: ingredient.description,
                code: ingredient.code,
                name: ingredient.name,
                title: ingredient.name,
                image: `/assets/image/capsules/${ingredient.code}.jpg`,
                price: blendIngredient.price,
                explanation: splitExplanation(blendIngredient.explanation),
                sku: ingredient.sku
              });

              const itemId = ingredient.sku || blendIngredient.ingredientId;
              if (blendProducts.findIndex((result) => result.item_id === itemId) === -1) {
                blendProducts.push({
                  item_name: ingredient.name,
                  item_id: itemId,
                  price: blendIngredient.price,
                  quantity: 1,
                  code: ingredient.code
                });
                window.blendProducts = blendProducts;
              }
            });
          });

        return Promise.all(ingredientPromises);
      }).then(() => {
        renderBlend();
        maybePushStepEvent();
      }).catch(error => console.error(error));
    }

    const maybePushStepEvent = () => {
      if (!pendingStepEvent) {
        return;
      }
      pushCartEvent(vm.blendStepName);
      pendingStepEvent = false;
    };

    const renderBlend = () => {
      vm.proteines = proteines
      vm.vitamines = vitamines;
      getAdditionalProducts(vitamines);
      $rootScope.$emit('blendChange', vitamines);
    }

    const pushCartEvent = (eventName) => {
      if (window.pushGa4EcommerceEvent) {
        window.pushGa4EcommerceEvent(eventName, {
          items: blendProducts,
          userId: UserManager.getCustomerExternalReference()
        });
        return;
      }

      window.dataLayer.push({
        event: eventName,
        ecommerce: {
          currency: 'EUR',
          value: blendProducts.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0),
          items: blendProducts
        },
        userId: UserManager.getCustomerExternalReference()
      });
    };

    const pushToDataLayer = (eventName, item) => {
      if (window.pushGa4EcommerceEvent) {
        if (item) {
          window.pushGa4EcommerceEvent(eventName, {
            singleItem: item,
            userId: UserManager.getCustomerExternalReference()
          });
        } else {
          pushCartEvent(eventName);
        }
        return;
      }

      window.dataLayer.push({
        event: eventName,
        ecommerce: {
          items: item === undefined ? blendProducts : [item]
        },
        userId: UserManager.getCustomerExternalReference()
      });
    };

    const getAdditionalProducts = (testvitamines) => {
      this.displayAdditionalProducts = true;
      if (UserManager.getQuizExternalReference()) {
        Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "pregnancy-state" }).$promise
          .then(result => {
            if (result.pregnancyStateId === 2 || result.pregnancyStateId === 3) {
              this.displayAdditionalProducts = false;
            } else {
              showAdditionalProducts(testvitamines);
            }
          }).catch(() => {
            showAdditionalProducts(testvitamines);
          });
      } else {
        showAdditionalProducts(testvitamines);
      }
    }

    const showAdditionalProducts = (testvitamines) => {
      if (!additionalProductsDisplayed) {
        Ingredient.getAdditionalProducts().$promise
          .then((additionalProductsresponse) => {
            additionalProductsresponse.filter(additionalProduct => !testvitamines.find(r => r.code === additionalProduct.code)).forEach(ingredient => {
              additionalProducts.push({
                id: ingredient.id,
                code: ingredient.code,
                name: ingredient.name,
                priority: ingredient.priority,
                sku: ingredient.sku
              });
            });

            Ingredient.getIngredientPrices().$promise
              .then((prices) => {
                additionalProducts.map((record) => {
                  const foundRecord = prices.find(r => r.ingredientId === record.id);
                  if (foundRecord) {
                    record.amount = foundRecord.amount;
                    record.price = foundRecord.price;
                    record.ingredientId = foundRecord.ingredientId;
                    record.internationalSystemUnit = foundRecord.internationalSystemUnit;
                  }
                });
              })
              .catch((error) => {
                console.warn(error);
                toast.show("Er is iets misgegaan bij het ophalen van de prijzen, probeer het later nog eens", "error");
              });
          }).finally(() => {
            additionalProductsDisplayed = true;
            this.additionalProducts = additionalProducts.sort((a, b) => a.priority - b.priority).slice(0, 2);
          });
      }
    }

    this.addCapsule = (capsule) => {
      Payment.getPaymentPlanByBlend({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise
        .then((response) => {
          if (response.status === "active") {
            BlendManager.addAddedCapsule(capsule);
            vitamines.push({
              id: capsule.id,
              description: capsule.description,
              code: capsule.code,
              title: capsule.name,
              image: `/assets/image/capsules/${capsule.code}.jpg`,
              price: capsule.price
            });
            renderBlend();
            pushToDataLayer("add_to_cart", {
              item_name: capsule.name,
              item_id: capsule.id,
              price: capsule.price,
              quantity: 1
            });
            toast.show(`Druk op 'Aanpassing bevestigen' om je vitamineplan te ontvangen`, "info");
            this.additionalProducts = this.additionalProducts.filter(additionalProduct => additionalProduct.ingredientId !== capsule.ingredientId);
          }
        })
        .catch(() => {
          Blend.removeBlendIngredient({ blendExternalReference: UserManager.getBlendExternalReference(), ingredientId: capsule.ingredientId }, {}).$promise
            .then(() => {
              Blend.submitBlendIngredient({ blendExternalReference: UserManager.getBlendExternalReference(), ingredientId: capsule.ingredientId }, {
                amount: capsule.amount,
                isUnit: capsule.internationalSystemUnit
              }).$promise
                .then(() => {
                  toast.show(`${capsule.name} is toegevoegd aan je blend`, "info");
                  this.additionalProducts = this.additionalProducts.filter(additionalProduct => additionalProduct.ingredientId !== capsule.ingredientId);
                  getBlendInformation(false);
                  pushToDataLayer("add_to_cart", {
                    item_name: capsule.name,
                    item_id: capsule.id,
                    price: capsule.price,
                    quantity: 1
                  });
                }).catch((error) => {
                  console.warn(error);
                  toast.show("Er is iets misgegaan bij toevoegen van dit ingredient, probeer het later nog eens", "error");
                });
            });
        });
    };

    this.removeAdditionalCapsule = (capsule) => {
      this.additionalProducts = this.additionalProducts.filter(additionalProduct => additionalProduct.ingredientId !== capsule.ingredientId);
    };

    const splitExplanation = (explanations) => {
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

    const getCountry = () => {
      if (window.location.hostname.endsWith('.be') || (this.user && this.user.email && this.user.email.endsWith('.be'))) {
        return "BE";
      } else {
        return "NL";
      }
    };

    const getCustomerInformation = () => {
      Customer.getCustomerByBlend({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise
        .then((result) => {
          UserManager.setCustomerExternalReference(result.externalReference);
          if (UserManager.getUserLoggedIn()) {
            this.user.lastName = result.lastName;
            this.user.phoneNumber = result.phoneNumber;
            this.user.street = result.street;
            this.user.houseNumber = result.houseNumber === 0 ? "" : result.houseNumber;
            this.user.houseNumberAddition = result.houseNumberAddition;
            this.user.postcode = result.postcode;
            this.user.city = result.city;
            this.user.country = result.country ? result.country : getCountry();
            searchAddress();
          } else {
            this.user.country = getCountry();
          }
          this.user.firstName = result.firstName ? result.firstName : this.user.firstName;
          this.user.email = result.email ? result.email : this.user.email;
        })
        .catch((error) => {
          console.error(error);
          this.user.country = getCountry();
        });
    };

    this.gotoPaymentInformation = () => {
      if (vitamines.length > 1) {
        pushCartEvent("initiate_checkout");
        $state.go("blend", { blendStep: 3 }).then(() => {
          vm.isCheckout = true;
          vm.blendStep = 3;
          vm.blendStepName = "add_shipping_info";
          getCustomerInformation();
          Klaviyo.notifyCheckout({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise;
          pushCartEvent("add_shipping_info");
        });
      } else {
        toast.show("Voeg minimaal 2 producten toe aan je vitaminemix. Vanuit milieuoverwegingen verpakken wij altijd minimaal 2 capsules", "error");
      }
    };

    if ($state.current.name === "domainblend") {
      vm.isDomain = true;
    }

    const openPopupDataLayer = ((ingredient) => {
      window.dataLayer.push({
        event: 'view_item',
        ecommerce: {
          items: [{
            item_name: ingredient.name,
            item_id: ingredient.id,
            quantity: 1
          }],
        },
        userId: UserManager.getCustomerExternalReference()
      });
    });

    this.openIngredientPopup = ((identifier, ingredient) => {
      if (ingredient.sku !== null) {
        return false;
      }
      IngredientReason.setIngredient(ingredient);
      ngDialog.open({
        name: "ingredient-slide-left",
        trapFocus: false,
        template: 'app/js/modules/dialogues/ingredients/ingredient.html',
        controller: "IngredientPopupController",
        controllerAs: "vm",
        className: "ingredient-slide-left",
      });
      openPopupDataLayer(ingredient);
    });

    const addIngredientToModel = (ingredient) => {
      const checkIfVitaminIsPresent = this.vitamines.filter(item => item.id == ingredient.id);
      const checkIfProteineIsPresent = this.proteines.filter(item => item.id == ingredient.id);

      if (!checkIfVitaminIsPresent.length && !checkIfProteineIsPresent.length) {
        if (ingredient.code.includes("protein") || ingredient.code.includes("peptide-collagen")) {
          this.proteines.push({
            id: ingredient.id,
            description: ingredient.description,
            code: ingredient.code,
            title: ingredient.name,
            image: `/assets/image/capsules/${ingredient.code}.jpg`,
            price: ingredient.price,
            amount: ingredient.amount.toString(),
            isUnit: ingredient.internationalSystemUnit
          });
        } else {
          this.vitamines.push({
            id: ingredient.id,
            description: ingredient.description,
            code: ingredient.code,
            title: ingredient.name,
            image: `/assets/image/capsules/${ingredient.code}.jpg`,
            price: ingredient.price
          });
        }
        renderBlend();
        ngDialog.closeAll();
      }
    };

    this.openAddCapsulePopup = (() => {
      ngDialog.open({
        name: "capsule-popup",
        trapFocus: false,
        showClose: false,
        closeByDocument: false,
        template: "app/js/modules/dialogues/checkout/capsule.html",
        controller: "CapsuleController",
        controllerAs: "vm",
        className: "capsule-popup",
        resolve: {
          chosenCapsules() {
            return vitamines;
          },
          oldProducts() {
            return oldProducts;
          }
        },
        preCloseCallback: function () {
          if ($state.current.name === "blend") {
            getBlendInformation(false);
            pushToDataLayer("view_cart");
          } else {
            const addedIngredients = BlendManager.getAddedIngredients();
            [...addedIngredients].forEach(ingredient => {
              addIngredientToModel(ingredient);
            });
          }
        }
      });
    });

    const submitBlend = () => {
      let element = document.getElementsByClassName('pricing__cta-button');
      for(let i = 0; i < element.length; i++)
      {
        element[i].classList.add('button--loading');
      }
      const isSubscription = this.pricing.months !== "0";
      const monthsSubscribed = isSubscription ? this.pricing.months : 1;
      Payment.submitBlend({ blendExternalReference: UserManager.getBlendExternalReference() },
        {
          couponCode: this.pricing.couponCode,
          monthsSubscribed: monthsSubscribed,
          isSubscription: isSubscription,
          fbclid: window.sessionStorage.getItem("fbclid")
        }).$promise
        .then((response) => {
          window.location.href = response.checkoutUrl;
        })
        .catch(error => {
          for(let i = 0; i < element.length; i++)
          {
            element[i].classList.remove('button--loading');
          }
          if (error.status === 409) {
            toast.show("Dit e-mailadres is al in gebruik, probeer een ander e-mailadres.", "error");
          } else {
            toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
          }
        });
    };

    this.activatePayment = () => {
      pushCartEvent("add_payment_info");
      if (this.noAddressFound) {
        toast.show("Adres wordt niet herkend", "error");
      } else {
        updateCustomerInformation();
      }
    };

    const updateCustomerInformation = () => {
      let customerInformation = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        email: this.user.email,
        street: this.user.street,
        houseNumber: this.user.houseNumber,
        houseNumberAddition: this.user.houseNumberAddition,
        postcode: postNlVerifiedAddress.postalCode,
        city: this.user.city,
        country: this.user.country
      };

      Customer.updateCustomerInformation({ blendExternalReference: UserManager.getBlendExternalReference() }, customerInformation).$promise
        .then(() => {
          submitBlend();
        })
        .catch(err => {
          if (err.status === 409) {
            toast.show("Dit e-mailadres is al in gebruik, probeer een ander e-mailadres.", "error");
          } else {
            toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
          }
        });
    }

    this.saveUpdatedBlend = () => {
      if (vitamines.length > 1) {
        BlendManager.saveUpdatedBlend();
        setTimeout(function () {
          getBlendInformation(false);
        }, 2500);
      } else {
        toast.show("Voeg minimaal 2 producten toe aan je vitaminemix. Vanuit milieuoverwegingen verpakken wij altijd minimaal 2 capsules", "error");
      }
    }

    this.removeIngredientFromBlend = ((ingredient, proteine) => {
      if (proteine) {
        this.proteines = this.proteines.filter(result => result.id !== ingredient.id);
        proteines = this.proteines;
      } else {
        this.vitamines = this.vitamines.filter(result => result.id !== ingredient.id);
        vitamines = this.vitamines;
        $rootScope.$emit('blendChange', vitamines);
      }
      blendProducts = blendProducts.filter(result => result.item_id !== (ingredient.sku || ingredient.id));
      BlendManager.removeIngredientFromBlend(ingredient)
        .then(() => {
          getBlendInformation(false);
          pushToDataLayer("remove_from_cart", {
            item_name: ingredient.name,
            item_id: ingredient.id,
            price: ingredient.price,
            quantity: 1
          });
        });
    });

    this.changeProteineAmount = ((proteine) => {
      BlendManager.changeProteineAmount(proteine);
    });

    const searchAddress = () => {
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

        PostNl.checkAddress({}, {
          countryIso: this.user.country,
          postalCode: this.user.postcode,
          houseNumber: this.user.houseNumber,
          houseNumberAddition: this.user.houseNumberAddition,
          street: this.user.country === "BE" ? this.user.street : "",
          city: this.user.country === "BE" ? this.user.city : ""
        }).$promise
          .then((response) => {
            checkMailabilityScore(response);
            if (response.length === 0) {
              resetAddressInput();
              this.noAddressFound = true;
            } else if (response.length === 1) {
              setCity(response[0].city);
              setStreet(response[0].street);
              if (this.user.country === "NL") {
                this.houseNumberAdditions = response[0].houseNumberAddition;
                this.user.houseNumberAddition = response[0].houseNumberAddition;
              }
            } else {
              resetAddressInput();
              setCity(response[0].city);
              if (this.user.country === "NL") {
                this.user.street = response[0].street;
                this.houseNumberAdditions = response.map(record => record.houseNumberAddition);
              }
            }
          }).catch((error) => {
            resetAddressInput();
            this.noAddressFound = true;
          });
      }
    };

    this.addressInputBlur = () => {
      clearTimeout(timer);
      searchAddress();
    }

    this.addressInputChange = (isResetAddress) => {
      this.noAddressFound = false;
      clearTimeout(timer);
      if (this.user.country === "NL") {
        this.showStreet = false;
      } else {
        this.showStreet = true;
        this.showHouseNumerAddition = true;
      }
      if (isResetAddress) {
        resetAddressInput();
      }
      timer = setTimeout(() => {
        searchAddress();
      }, waitTime);
    };

    const setStreet = (street) => {
      if (this.user.country === "BE" && this.user.street !== street) {
        this.user.street = street;
        searchAddress();
      }
      this.user.street = street;
    }

    const setCity = (city) => {
      if (this.user.country === "BE" && this.user.city === undefined) {
        this.user.city = city;
        searchAddress();
      }
      this.user.city = city;
    }

    const resetAddressInput = () => {
      if (this.user.country === "NL") {
        this.user.street = undefined;
        this.user.city = undefined;
      }
    }

    const checkMailabilityScore = (address) => {
      if (this.user.country === "NL") {
        this.noAddressFound = !address[0].mailabilityScore === 100;
      } else {
        this.noAddressFound = !address[0].mailabilityScore >= 60;
      }
      postNlVerifiedAddress = address[0];
    }

  }]);
