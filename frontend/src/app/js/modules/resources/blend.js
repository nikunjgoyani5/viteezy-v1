"use strict";

angular.module("app.resources.blend", [])
  .service("Blend", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/blends/:blendExternalReference/ingredients/:ingredientId`, {}, {
      getBlendIngredients: {
        method: "GET",
        isArray: true
      },
      updateBlendIngredient: {
        method: "PUT"
      },
      submitBlendIngredient: {
        method: "POST"
      },
      removeBlendIngredient: {
        method: "DELETE"
      },
      getBlend: {
        url: `/viteezy/api/blends/:blendExternalReference`,
        method: "GET"
      },
      getAggregatedByPaymentPlanExternalReference: {
        url: `/viteezy/api/blends/payment-plan/:paymentPlanExternalReference`,
        method: "GET"
      },
      getByCustomer: {
        url: `/viteezy/api/blends/customer/:customerExternalReference`,
        method: "GET"
      },
      createNewEmptyBlend: {
        url: "/viteezy/api/blends/create",
        method: "POST"
      },
      updateWithQuizAnswers: {
        url: `/viteezy/api/blends/:blendExternalReference`,
        method: "PATCH"
      }
    });
  }]);
