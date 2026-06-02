"use strict";

angular.module("app.pages.quiz-v2.birth-health", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("birth-health", {
        url: "/quiz-v2/birth-health",
        controller: "BirthHealthController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/birth-health/birth-health.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("BirthHealthController", ["Quiz", "UserManager", "$state", "toast", "QuizAnimation", function (Quiz, UserManager, $state, toast, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "date-of-birth",
      apiUrlKey: "birth-health",
      apiAnswerValueKey: "birthHealthId",
      answerId: undefined,
      currentProgress: 10
    };

    Quiz.getPossibleAnswer({ questionType: this.questionConfig.apiUrlKey }).$promise
      .then((result) => {
        this.questionAnswers = result;
      }).finally(() => {
        Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise
          .then(result => {
            this.questionConfig.answerId = result[this.questionConfig.apiAnswerValueKey].toString();
          });
      }).catch((error) => {
        console.error(error);
        toast.show("Er is iets misgegaan bij het ophalen van de antwoorden, probeer het later nog eens", "error");
      });

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
    }

    this.submitQuestionAnswer = (answerId) => {
      Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise
        .then(result => {
          // Result found let's update the answer
          Quiz.updateQuestionAnswer({
            quizExternalReference: UserManager.getQuizExternalReference(),
            questionType: this.questionConfig.apiUrlKey,
            questionAnswer: answerId
          }, {}).$promise
            .then(() => {
              if (answerId == 1) {
                $state.go("pregnancy-state");
              } else {
                $state.go(this.questionConfig.nextQuizState);
              }
            });
        }).catch(() => {
          // No result found so we need to submit one
          Quiz.submitQuestionAnswer({
            quizExternalReference: UserManager.getQuizExternalReference(),
            questionType: this.questionConfig.apiUrlKey,
            questionAnswer: answerId
          }, {}).$promise
            .then(() => {
              if (answerId == 1) {
                $state.go("pregnancy-state");
              } else {
                $state.go(this.questionConfig.nextQuizState);
              }
            });
        });
    };
  }]);
