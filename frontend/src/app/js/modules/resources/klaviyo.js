"use strict";

angular.module("app.resources.klaviyo", [])
  .service("Klaviyo", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/klaviyo/notify-checkout/blend/:blendExternalReference`, {}, {
      notifyCheckout: {
        method: "POST"
      }
    });
  }]);
