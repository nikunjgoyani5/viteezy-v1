"use strict";

angular.module("app.dialogues.capsule", [])
  .controller("CapsuleController", ["chosenCapsules", "oldProducts", "toast", "ngDialog", "UserManager", "Blend", "Ingredient", "Payment", "BlendManager", "IngredientReason", function (chosenCapsules, oldProducts, toast, ngDialog, UserManager, Blend, Ingredient, Payment, BlendManager, IngredientReason) {
    let allIngredients;

    this.capsules = chosenCapsules;
    this.oldProducts = oldProducts;
    console.log(oldProducts);
    this.availableIngredients = [];
    this.prices = [];

    const pushToDataLayer = (eventName, item) => {
      if (window.pushGa4EcommerceEvent) {
        window.pushGa4EcommerceEvent(eventName, {
          singleItem: item,
          userId: UserManager.getCustomerExternalReference()
        });
        return;
      }

      window.dataLayer.push({
        event: eventName,
        ecommerce: {
          items: [item]
        },
        userId: UserManager.getCustomerExternalReference()
      });
    };

    const calculateAvailableIngredients = (allIngredients) => {
      this.availableIngredients = allIngredients.filter(ingredient => ingredient.isActive);

      BlendManager.getAddedIngredients().forEach(addedIngredient => {
        this.availableIngredients = this.availableIngredients.filter((c) => c.code !== addedIngredient.code);
      });

      this.capsules.forEach((capsule) => {
        const foundRecord = this.availableIngredients.findIndex(record => record.code === capsule.code);
        if (foundRecord === 0) {
          this.availableIngredients.shift();
        } else {
          this.availableIngredients.splice(foundRecord, 1);
        }
      });

      Ingredient.getIngredientPrices().$promise
        .then((result) => {
          this.prices = result;
          this.availableIngredients.map((record) => {
            const foundRecord = this.prices.find(r => r.ingredientId === record.id);
            if (foundRecord) {
              record.amount = foundRecord.amount;
              const foundIngredient = this.oldProducts.find(r => r.ingredientId === record.id);
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
        })
        .catch((error) => {
          console.warn(error);
          toast.show("Er is iets misgegaan bij het ophalen van de prijzen, probeer het later nog eens", "error");
        });
    };

    Ingredient.get().$promise
      .then((result) => {
        allIngredients = result;
        calculateAvailableIngredients(result);
      })
      .catch((error) => {
        console.warn(error);
        toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
      });

    this.addCapsule = (capsule) => {
      Payment.getPaymentPlanByBlend({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise
        .then((response) => {
          if (response.status === "active") {
            BlendManager.addAddedCapsule(capsule);
            this.availableIngredients = this.availableIngredients.filter((c) => c.code !== capsule.code);
            calculateAvailableIngredients(allIngredients);
          }
        })
        .catch(() => {
          let removeIngredientPromise = Blend.removeBlendIngredient({ blendExternalReference: UserManager.getBlendExternalReference(), ingredientId: capsule.ingredientId }, {}).$promise;
          let lazySubmitBlendIngredientPromise = () => {
            pushToDataLayer("add_to_cart", {
              item_name: capsule.name,
              item_id: capsule.id,
              price: capsule.price,
              quantity: 1
            });
            return Blend.submitBlendIngredient({ blendExternalReference: UserManager.getBlendExternalReference(), ingredientId: capsule.ingredientId }, {
              amount: capsule.amount,
              isUnit: capsule.internationalSystemUnit
            }).$promise;
          };

          let lazyUpdateQuizManagerChosenCapsules = () => {
            BlendManager.addAddedCapsule(capsule);
            capsule.image = `/assets/image/capsules/${capsule.code}.jpg`;
            this.availableIngredients = this.availableIngredients.filter((c) => c.code !== capsule.code);
          };

          removeIngredientPromise
            .then(lazySubmitBlendIngredientPromise)
            .then(lazyUpdateQuizManagerChosenCapsules)
            .catch((error) => {
              console.warn(error);
              toast.show("Er is iets misgegaan bij toevoegen van dit ingredient, probeer het later nog eens", "error");
            });
        });
    };

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

    this.closeThisPopup = () => {
      ngDialog.close();
    };
  }]);
