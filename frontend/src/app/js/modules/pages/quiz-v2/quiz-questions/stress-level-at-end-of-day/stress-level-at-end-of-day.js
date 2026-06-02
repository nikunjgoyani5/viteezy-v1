"use strict";

angular.module("app.pages.quiz-v2.stress-level-at-end-of-day", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("stress-level-at-end-of-day", {
        url: "/quiz-v2/stress-level-at-end-of-day",
        controller: "StressLevelAtEndOfDayController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/stress-level-at-end-of-day/stress-level-at-end-of-day.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("StressLevelAtEndOfDayController", ["Quiz", "UserManager", "$state", "toast", "QuizAnimation", function (Quiz, UserManager, $state, toast, QuizAnimation) {
    const getNextQuizStep = () => {
      if (!window.sessionStorage.getItem("chosenPath")) {
        return "lifestyle-information";
      } else {
        const remainingQuizPathQuestions = window.sessionStorage.getItem("chosenPath").split(',');
        const nextQuestionIndex = remainingQuizPathQuestions.indexOf($state.current.name) + 1;

        if (remainingQuizPathQuestions[nextQuestionIndex]) {
          return remainingQuizPathQuestions[nextQuestionIndex];
        } else {
          return "lifestyle-information";
        }
      }
    };

    this.questionConfig = {
      nextQuizState: getNextQuizStep(),
      apiUrlKey: "stress-level-at-end-of-day",
      apiAnswerValueKey: "stressLevelAtEndOfDayId",
      answerId: undefined,
      currentProgress: 30
    };

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
            .then(() => $state.go(this.questionConfig.nextQuizState))
        }).catch(() => {
          // No result found so we need to submit one
          Quiz.submitQuestionAnswer({
            quizExternalReference: UserManager.getQuizExternalReference(),
            questionType: this.questionConfig.apiUrlKey,
            questionAnswer: answerId
          }, {}).$promise
            .then(() => $state.go(this.questionConfig.nextQuizState))
        });
    };

    Quiz.getPossibleAnswer({ questionType: this.questionConfig.apiUrlKey }).$promise
      .then((result) => {
        this.questionAnswers = result;
        Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise
        .then(result => {
          this.questionConfig.answerId = result[this.questionConfig.apiAnswerValueKey].toString();
        });
      })
      .catch((error) => {
        console.error(error);
        toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
      });
  }]);
