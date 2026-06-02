"use strict";

angular.module("app.pages.quiz-v2.date-of-birth", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("date-of-birth", {
        url: "/quiz-v2/date-of-birth",
        controller: "DateOfBirthController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/date-of-birth/date-of-birth.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("DateOfBirthController", ["UserManager", "Quiz", "$state", "QuizAnimation", function (UserManager, Quiz, $state, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "help-goal",
      apiUrlKey: "date-of-birth",
      apiAnswerValueKey: "id",
      currentProgress: 14
    };

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
    };

    this.submitQuestionAnswer = (age) => {
      if (parseInt(age) < 18) {
        return;
      }

      const birthDate = new Date().setFullYear(new Date().getFullYear() - parseInt(age, 10));
      const birthDateISOString = new Date(birthDate).toISOString();

      if (birthDateISOString.match(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/)) {
        Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise.then(result => {
          // Result found let's update the answer
          Quiz.updateOpenQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }, { ["date"]: birthDateISOString }).$promise
            .then(() => $state.go(this.questionConfig.nextQuizState))
        }).catch(() => {
          // No result found so we need to submit one
          Quiz.submitOpenQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }, { ["date"]: birthDateISOString }).$promise
            .then(() => $state.go(this.questionConfig.nextQuizState))
        });
      }
    };
  }]);
