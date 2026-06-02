"use strict";

angular.module("app.pages.domain.blend", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("domainblend", {
        url: "/domain/blend",
        controller: "BlendController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/domain/blend/blend.html",
        role: "user",
        resolve: {
          ingredient: ["Ingredient", "toast", function (Ingredient, toast) {
            const promise = Ingredient.get().$promise;
            promise
              .catch(function () {
                toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
              });
            return promise;
          }]
        }
      });
  }]);
