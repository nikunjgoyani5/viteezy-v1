"use strict";

angular.module("app.resources.ingredient", [])
  .service("Ingredient", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/ingredients/`, {}, {
      get: {
        method: "GET",
        isArray: true
      },
      getBlendIngredientsByExternalReference: {
        url: `/viteezy/api/blends/:blendExternalReference/ingredients`,
        method: "GET",
        isArray: true
      },
      getIngredientById: {
        url: `/viteezy/api/ingredients/:id`,
        method: "GET"
      },
      getIngredientPrices: {
        url: `/viteezy/api/ingredients/prices`,
        method: "GET",
        isArray: true
      },
      getAdditionalProducts: {
        url: `/viteezy/api/ingredients/additional`,
        method: "GET",
        isArray: true
      }
    });
  }]);
