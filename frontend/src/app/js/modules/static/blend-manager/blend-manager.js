"use strict";

angular.module("app.static.blend-manager", [])
  .service("BlendManager", ["UserManager", "Payment", "toast", "Blend", function (UserManager, Payment, toast, Blend) {

    let deletedIngredients = [];
    let addedIngredients = [];

    const updateBlendPayment = () => {
      Payment.updateBlendPayment({ blendExternalReference: UserManager.getBlendExternalReference() },
        {
          couponCode: sessionStorage.getItem("pricingCoupon"),
          monthsSubscribed: sessionStorage.getItem("selectedMonths") ? sessionStorage.getItem("selectedMonths") : "1"
        }).$promise
        .then(() => {
          addedIngredients = [];
          deletedIngredients = [];
          toast.show("Aanpassingen opgeslagen", "info");
        })
        .catch((error) => {
          if (error.status === 409) {
            toast.show("Je pakket zit momenteel in productie, wijzingen zijn niet mogelijk binnen 8 dagen van je leverdatum.", "error");
          } else if (error.status === 404) {
            toast.show("Je abonnement is niet actief, activeer het voordat je wijzigingen aanbrengt.", "error");
          } else {
            toast.show("Aanpassingen niet opgeslagen", "error");
          }
        });
    };

    this.addAddedCapsule = (capsule) => {
      addedIngredients.push(capsule);
    }

    this.getAddedIngredients = () => {
      return addedIngredients;
    }

    this.saveUpdatedBlend = () => {
      const updateBlend = async () => {
        for (const ingredient of deletedIngredients) {
          await deleteIngredient(ingredient);
        }
        for (const ingredient of addedIngredients) {
          await addIngredient(ingredient);
        }
      }

      const deleteIngredient = (ingredient) => {
        return new Promise((resolve, reject) => {
          Blend.removeBlendIngredient({ blendExternalReference: UserManager.getBlendExternalReference(), ingredientId: ingredient.ingredientId }, {}).$promise
            .then(() => {
              resolve(ingredient);
            })
            .catch((error) => {
              if (error.status === 409) {
                toast.show("Je pakket zit momenteel in productie, wijzingen zijn niet mogelijk binnen 8 dagen van je leverdatum.", "error");
              } else {
                toast.show("Er is iets misgegaan bij verwijderen van dit ingredient, probeer het later nog eens", "error");
              }
            });
        });
      }

      const addIngredient = (ingredient) => {
        return new Promise((resolve, reject) => {
          Blend.submitBlendIngredient({ blendExternalReference: UserManager.getBlendExternalReference(), ingredientId: ingredient.ingredientId }, {
            amount: ingredient.amount,
            isUnit: ingredient.internationalSystemUnit
          }).$promise
            .then(() => {
              resolve(ingredient);
            })
            .catch((error) => {
              if (error.status === 409) {
                toast.show("Je pakket zit momenteel in productie, wijzingen zijn niet mogelijk binnen 8 dagen van je leverdatum.", "error");
              } else {
                toast.show("Er is iets misgegaan bij toevoegen van dit ingredient, probeer het later nog eens", "error");
              }
            });
        });
      }

      updateBlend().then(() => {
        updateBlendPayment();
      });
    }

    this.removeIngredientFromBlend = ((ingredient) => {
      return new Promise((resolve, reject) => {
        Payment.getPaymentPlanByBlend({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise
          .then((response) => {
            if (response.status === "active") {
              if (!addedIngredients.find(foundIngredient => foundIngredient.id === ingredient.id)) {
                deletedIngredients.push(ingredient);
              }
              addedIngredients = addedIngredients.filter(foundIngredient => foundIngredient.id !== ingredient.id);
            }
          })
          .catch(() => {
            Blend.removeBlendIngredient({ blendExternalReference: UserManager.getBlendExternalReference(), ingredientId: ingredient.id }, {}).$promise
              .then(() => {
                toast.show(`${ingredient.name} is verwijderd uit je blend`, "info");
                resolve();
              })
              .catch((error) => {
                console.warn(error);
                toast.show("Er is iets misgegaan bij verwijderen van dit ingredient, probeer het later nog eens", "error");
              });
          });
      });
    });

    this.changeProteineAmount = ((proteine) => {
      Blend.updateBlendIngredient({ blendExternalReference: UserManager.getBlendExternalReference(), ingredientId: proteine.ingredientId }, {
        amount: proteine.amount,
        isUnit: proteine.isUnit
      }).$promise
        .then((response) => {
          proteine.price = response.price;
          proteine.amount = response.amount.toString();
        })
        .catch((error) => {
          console.warn(error);
          toast.show("Er is iets misgegaan bij bijwerken, probeer het later nog eens", "error");
        });
    });

  }])
