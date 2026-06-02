"use strict";

angular.module("app.pages.quiz-v2.vitamin-opinion-information", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("vitamin-opinion-information", {
        url: "/quiz-v2/vitamin-opinion-information",
        controller: "VitaminOpinionInformationController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-pages/vitamin-opinion-information/vitamin-opinion-information.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("VitaminOpinionInformationController", ["$state", "UserManager", "Quiz", "$timeout", "QuizAnimation", function ($state, UserManager, Quiz, $timeout, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "vitamin-intake",
      apiUrlKey: "vitamin-opinion",
      apiAnswerValueKey: "vitaminOpinionId",
      currentProgress: 5
    };

    const gotoNextstep = () => $timeout(() => $state.go(this.questionConfig.nextQuizState), 3000);

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();

      Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "name" }).$promise.then(result => {
        this.name = result.name;
      });

      Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise.then(result => {
        this.vitaminOpinionId = result[this.questionConfig.apiAnswerValueKey];

        if (this.vitaminOpinionId !== 2) {
          gotoNextstep();
        } else {
          $timeout(() => this.vitaminOpinionId = 2.1, 3000).then(() => gotoNextstep());
        }
      });
    };
  }]);
