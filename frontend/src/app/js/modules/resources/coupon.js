"use strict";

angular.module("app.resources.coupon", [])
  .service("Coupon", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/coupon/:couponCode`, {}, {
      getCouponCode: {
        method: "GET"
      }
    });
  }]);
