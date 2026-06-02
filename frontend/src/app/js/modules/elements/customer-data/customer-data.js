"use strict";

angular.module("app.elements.customer-data", [])
  .directive("customerData", function () {
    return {
      controller: "BlendController",
      templateUrl: "app/js/modules/elements/customer-data/customer-data.html",
    };
  });
