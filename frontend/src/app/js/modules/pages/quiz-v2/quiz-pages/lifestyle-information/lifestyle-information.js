"use strict";

angular.module("app.pages.quiz-v2.lifestyle-information", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("lifestyle-information", {
        url: "/quiz-v2/lifestyle-information",
        controller: "LifestyleInformationController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-pages/lifestyle-information/lifestyle-information.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("LifestyleInformationController", ["$state", "QuizAnimation", function ($state, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "healthy-lifestyle"
    };

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
    };

    this.gotoNextStep = () => {
      $state.go(this.questionConfig.nextQuizState);
    };
    
  }]);
