"use strict";

angular.module("app.pages.quiz-v2.tree-planting", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("tree-planting", {
        url: "/quiz-v2/tree-planting",
        controller: "TreeGrowingController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-pages/tree-planting/tree-planting.html",
        role: "anonymous",
        type: "question"
      });
  }])
  .controller("TreeGrowingController", ["$state", "QuizAnimation", function ($state, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "daily-six-alcoholic-drinks",
      currentProgress: 1
    };

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
      window.setTimeout(() => {
        let gif = document.getElementById("gif");
        gif.src = "/assets/gif/tree-planting.gif";
      }, 1250);
      window.setTimeout(() => $state.go(this.questionConfig.nextQuizState), 4750);
    };
  }]);
