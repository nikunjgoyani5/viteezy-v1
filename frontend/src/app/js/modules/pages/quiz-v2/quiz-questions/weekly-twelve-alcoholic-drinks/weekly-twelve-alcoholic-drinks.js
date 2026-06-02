"use strict";

angular.module("app.pages.quiz-v2.weekly-twelve-alcoholic-drinks", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("weekly-twelve-alcoholic-drinks", {
        url: "/quiz-v2/weekly-twelve-alcoholic-drinks",
        controller: "WeeklyTwelveAlcoholicDrinksController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/weekly-twelve-alcoholic-drinks/weekly-twelve-alcoholic-drinks.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("WeeklyTwelveAlcoholicDrinksController", ["Quiz", "UserManager", "$state", "toast", "QuizAnimation", function (Quiz, UserManager, $state, toast, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "daily-four-coffee",
      apiUrlKey: "weekly-twelve-alcoholic-drinks",
      apiAnswerValueKey: "weeklyTwelveAlcoholicDrinksId",
      answerId: undefined,
      currentProgress: 67
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
