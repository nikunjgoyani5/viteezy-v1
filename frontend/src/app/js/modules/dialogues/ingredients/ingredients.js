"use strict";

angular.module("app.dialogues.ingredients", [])
  .controller("IngredientPopupController", ["$http", "IngredientReason", function ($http, IngredientReason) {

    let ingredient = IngredientReason.getIngredient();

    $http({
      method: 'GET',
      url: `/viteezy/api/ingredients/${ingredient.ingredientId}`
    }).then((response) => {
      this.ingredient = response.data;
    });

    this.getIngredientReasonDescription = () => {
      return IngredientReason.getIngredientReasonDescription();
    };

  }]);
