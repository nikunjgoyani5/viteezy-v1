"use strict";

angular.module("app.pages.quiz-v2.welcome", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("welcome", {
        url: "/quiz-v2/welcome",
        controller: "WelcomeController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-pages/welcome/welcome.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("WelcomeController", ["$state", "QuizAnimation", function ($state, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "introduce",
      currentProgress: 0
    };

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
      window.setTimeout(() => $state.go(this.questionConfig.nextQuizState), 3000);
    };
  }]);
