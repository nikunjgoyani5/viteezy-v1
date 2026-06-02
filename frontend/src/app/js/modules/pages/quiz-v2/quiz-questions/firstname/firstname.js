"use strict";

angular.module("app.pages.quiz-v2.firstname", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("firstname", {
        url: "/quiz-v2/firstname",
        controller: "FirstnameController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/firstname/firstname.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("FirstnameController", ["Quiz", "UserManager", "$state", "QuizAnimation", function (Quiz, UserManager, $state, QuizAnimation) {

    this.questionConfig = {
      nextQuizState: "firstname-information",
      apiUrlKey: "name",
      apiAnswerValueKey: "id",
      currentProgress: 2
    };

    this.$onInit = () => {
      Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise
        .then(response => {
          this.user = {};
          this.user.name = response.name;
        });

      QuizAnimation.addQuizAnimationClass();
    };

    this.submitQuestionAnswer = (name) => {
      if (name.length === 0) {
        return;
      }

      Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise.then(result => {
        // Result found let's update the answer
        Quiz.updateOpenQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }, { [this.questionConfig.apiUrlKey]: name }).$promise
          .then(() => $state.go(this.questionConfig.nextQuizState))
      }).catch(() => {
        // No result found so we need to submit one
        Quiz.submitOpenQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }, { [this.questionConfig.apiUrlKey]: name }).$promise
          .then(() => $state.go(this.questionConfig.nextQuizState))
      });
    };
  }]);
