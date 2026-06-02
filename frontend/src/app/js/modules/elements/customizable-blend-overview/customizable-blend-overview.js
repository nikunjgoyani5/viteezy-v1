"use strict";

angular.module("app.elements.customizable-blend-overview", [])
  .directive("customizableBlendOverview", function () {
    return {
      restrict: "E",
      transclude: true,
      templateUrl: "app/js/modules/elements/customizable-blend-overview/customizable-blend-overview.html"
    };
  });