"use strict";

angular.module("app.resources.pricing", [])
  .service("Pricing", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/pricing/`, {}, {
      getBlendPricing: {
        url: "/viteezy/api/pricing/blend/:blendExternalReference",
        method: "POST"
      }
    });
  }]);
