"use strict";

angular.module("app.pages.quiz-v2.sleep-quality", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("sleep-quality", {
        url: "/quiz-v2/sleep-quality",
        controller: "SleepQualityController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/sleep-quality/sleep-quality.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("SleepQualityController", ["Quiz", "UserManager", "$state", "toast", "QuizAnimation", function (Quiz, UserManager, $state, toast, QuizAnimation) {
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
      apiUrlKey: "sleep-quality",
      apiAnswerValueKey: "sleepQualityId",
      answerId: undefined,
      currentProgress: 30
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
  }]);
