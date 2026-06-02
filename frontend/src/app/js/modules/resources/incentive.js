"use strict";

angular.module("app.resources.incentive", [])
  .service("Incentive", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/incentive/`, {}, {
      discountIncentive: {
        url: `/viteezy/api/incentive/DISCOUNT/:planExternalReference`,
        method: "PATCH"
      },
      pausedIncentive: {
        url: `/viteezy/api/incentive/PAUSED/:planExternalReference`,
        method: "PATCH"
      }
    });
  }]);
