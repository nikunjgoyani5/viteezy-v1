"use strict";

angular.module("app.pages.quiz-v2.firstname-information", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("firstname-information", {
        url: "/quiz-v2/firstname-information",
        controller: "FirstnameInformationController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-pages/firstname-information/firstname-information.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("FirstnameInformationController", ["$state", "UserManager", "Quiz", "QuizAnimation", function ($state, UserManager, Quiz, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "vitamin-opinion",
      apiUrlKey: "name",
      currentProgress: 3
    };

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();

      Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise.then(result => {
        this.name = result.name;
      });

      window.setTimeout(() => $state.go(this.questionConfig.nextQuizState), 2000);
    };
  }]);