"use strict";

angular.module("app.pages.quiz", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("quiz", {
        url: "/quiz",
        controller: "QuizV2Controller",
        controllerAs: "vm",
        bindToController: true,
        role: "anonymous"
      });
  }]);
