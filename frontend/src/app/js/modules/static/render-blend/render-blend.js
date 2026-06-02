"use strict";

angular.module("app.static.render-blend", [])
  .service("RenderBlend", ["Quiz", "UserManager", "Ingredient", function (Quiz, UserManager, Ingredient) {
    this.user = {};

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

    this.renderBlend = (isPreview, isBlendV2) => {
      let vitamines = [];
      let blendProducts = [];

      const pushBlendToDataLayer = () => {
        if (window.pushGa4EcommerceEvent) {
          window.pushGa4EcommerceEvent('view_cart', {
            items: blendProducts
          });
        } else {
          window.dataLayer.push({
            event: 'view_cart',
            ecommerce: {
              currency: 'EUR',
              value: blendProducts.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0),
              items: blendProducts
            }
          });
        }
        window.blendProducts = blendProducts;
      };

      const getBlendInformationForIngredient = (blendIngredient) => {
        if (blendIngredient.amount > 0.000) {
          return Ingredient.getIngredientById({ id: blendIngredient.ingredientId }).$promise.then((ingredient) => {
            vitamines.push({
              id: ingredient.id,
              ingredientId: blendIngredient.ingredientId,
              description: ingredient.description,
              code: ingredient.code,
              title: ingredient.name,
              image: `/assets/image/capsules/${ingredient.code}.jpg`,
              price: blendIngredient.price,
              explanation: splitExplanation(blendIngredient.explanation)
            });

            blendProducts.push({
              item_name: ingredient.name,
              item_id: ingredient.sku || blendIngredient.ingredientId,
              price: blendIngredient.price,
              quantity: 1,
              code: ingredient.code
            });
          });
        }

        return Promise.resolve();
      };

      const renderIngredients = (blendIngredients) => {
        const ingredientPromises = blendIngredients.map((blendIngredient) => getBlendInformationForIngredient(blendIngredient));
        return Promise.all(ingredientPromises).then(() => pushBlendToDataLayer());
      };

      if (isPreview && !isBlendV2) {
        Quiz.getBlendPreview({ quizExternalReference: UserManager.getQuizExternalReference() }).$promise.then((blendIngredients) => {
          return renderIngredients(blendIngredients);
        }).catch(error => console.error(error));
      } else if (isPreview && isBlendV2) {
        Quiz.getBlendPreview({ quizExternalReference: UserManager.getQuizExternalReference(), version: "v2" }).$promise.then((blendIngredients) => {
          return renderIngredients(blendIngredients);
        }).catch(error => console.error(error));
      } else {
        Ingredient.getBlendIngredientsByExternalReference({ blendExternalReference: UserManager.getBlendExternalReference() }).$promise.then((blendIngredients) => {
          return renderIngredients(blendIngredients);
        }).catch(error => console.error(error));
      }

      return vitamines;
    };

  }]);
