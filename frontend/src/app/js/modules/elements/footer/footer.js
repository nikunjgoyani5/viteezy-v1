"use strict";

angular.module("app.elements.footer", [])
  .directive("viFooter", ["$state", function ($state) {
    return {
      restrict: "E",
      scope: {
        showFooter: "="
      },
      controller: function () {
        this.currentYear = new Date().getFullYear();
        this.$onInit = function () {
          let dot = window.location.hostname.lastIndexOf('.');
          if (dot > 0) {
            this.country = window.location.hostname.substring(dot + 1).toUpperCase();
          } else {
            this.country = "NL";
          }
        }
      },
      controllerAs: "vm",
      bindToController: true,
      templateUrl: "app/js/modules/elements/footer/footer.html"
    };
  }]);
