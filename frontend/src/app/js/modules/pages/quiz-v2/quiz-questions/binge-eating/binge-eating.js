"use strict";

angular.module("app.pages.quiz-v2.binge-eating", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("binge-eating", {
        url: "/quiz-v2/binge-eating",
        controller: "BingeEatingController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/binge-eating/binge-eating.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("BingeEatingController", ["Quiz", "UserManager", "$state", "toast", "QuizAnimation", function (Quiz, UserManager, $state, toast, QuizAnimation) {
    const getNextQuizStep = (skipNextQuestion) => {
      if (!window.sessionStorage.getItem("chosenPath")) {
        return "lifestyle-information";
      } else {
        const remainingQuizPathQuestions = window.sessionStorage.getItem("chosenPath").split(',');
        let nextQuestionIndex;
        if (skipNextQuestion) {
          nextQuestionIndex = remainingQuizPathQuestions.indexOf($state.current.name) + 2;
        } else {
          nextQuestionIndex = remainingQuizPathQuestions.indexOf($state.current.name) + 1;
        }

        if (remainingQuizPathQuestions[nextQuestionIndex]) {
          return remainingQuizPathQuestions[nextQuestionIndex];
        } else {
          return "lifestyle-information";
        }
      }
    };

    this.questionConfig = {
      nextQuizState: getNextQuizStep(),
      apiUrlKey: "binge-eating",
      apiAnswerValueKey: "bingeEatingId",
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
            .then(() => {
              if (answerId === 2) {
                $state.go(getNextQuizStep(true))
              } else {
                $state.go(this.questionConfig.nextQuizState)
              }
            })
        }).catch(() => {
          // No result found so we need to submit one
          Quiz.submitQuestionAnswer({
            quizExternalReference: UserManager.getQuizExternalReference(),
            questionType: this.questionConfig.apiUrlKey,
            questionAnswer: answerId
          }, {}).$promise
            .then(() => {
              if (answerId === 2) {
                $state.go(getNextQuizStep(true))
              } else {
                $state.go(this.questionConfig.nextQuizState)
              }
            })
        });
    };
  }]);
