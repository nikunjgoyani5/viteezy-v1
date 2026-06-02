"use strict";

angular.module("app.pages.quiz-v2.introduce", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("introduce", {
        url: "/quiz-v2/introduce",
        controller: "IntroduceController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-pages/introduce/introduce.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("IntroduceController", ["$state", "QuizAnimation", function ($state, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "firstname",
      currentProgress: 1
    };

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
      window.setTimeout(() => $state.go(this.questionConfig.nextQuizState), 2000);
    };
  }]);
