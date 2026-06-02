"use strict";

angular.module("app.elements.ingredient-table", [])
  .directive("viIngredientTable", function () {
    return {
      templateUrl: "app/js/modules/elements/ingredient-table/ingredient-table.html"
    };
  });
