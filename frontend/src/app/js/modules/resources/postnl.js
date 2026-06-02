"use strict";

angular.module("app.resources.postnl", [])
  .service("PostNl", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/postnl/check-address`, {}, {
      checkAddress: {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        hasBody: true,
        isArray: true
      },
      getLatestTrackTrace: {
        url: `/viteezy/api/order/track-and-trace/:customerExternalReference`,
        method: "GET"
      }
    });
  }]);
