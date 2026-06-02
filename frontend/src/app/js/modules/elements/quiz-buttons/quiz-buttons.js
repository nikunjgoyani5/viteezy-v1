"use strict";

angular.module("app.elements.quiz-buttons", [])
  .directive("viQuizButtons", function () {
    return {
      restrict: "E",
      scope: {
        click: "&",
        submit: "&",
        hideNext: "@",
        hidePrevious: "@",
        birthdate: "@"
      },
      controller: function () {

      },
      controllerAs: "vm",
      bindToController: true,
      template: `
        <div class="quiz-actions">
          <a class="button button-previous" ng-click="vm.click()" ng-if="!vm.hidePrevious"><i class="icon icon-arrowTabbar"></i></a>
          <button class="button submit-button" type="submit" name="button" ng-click="vm.submit()" ng-if="!vm.hideNext && !vm.birthdate">Volgende</button>
          <button type="submit" class="button submit-button" name="button" ng-if="vm.birthdate">Volgende</button>
        </div>
        `
    };
  });
