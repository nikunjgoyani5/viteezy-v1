"use strict";

angular.module("app.elements.progress", [])
  .directive("viProgress", function () {
    return {
      restrict: "E",
      scope: {
        current: "=",
        total: "="
      },
      controller: function () {

      },
      controllerAs: "vm",
      bindToController: true,
      templateUrl: "app/js/modules/elements/progress/progress.html"
    };
  });
