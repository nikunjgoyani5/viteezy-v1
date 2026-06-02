"use strict";

angular.module("app.pages.quiz-v2.thirty-minutes-of-sun", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("thirty-minutes-of-sun", {
        url: "/quiz-v2/thirty-minutes-of-sun",
        controller: "ThirtyMinutesOfSunController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/thirty-minutes-of-sun/thirty-minutes-of-sun.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("ThirtyMinutesOfSunController", ["Quiz", "UserManager", "$state", "toast", "QuizAnimation", function (Quiz, UserManager, $state, toast, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "transition-period-complaints",
      apiUrlKey: "thirty-minutes-of-sun",
      apiAnswerValueKey: "thirtyMinutesOfSunId",
      answerId: undefined,
      currentProgress: 85
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
              Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "genders" }).$promise
                .then(result => {
                  if (result.genderId == 2) {
                    $state.go("iron-prescribed");
                  } else {
                    Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "date-of-birth" }).$promise
                      .then(result => {
                        if (new Date().getFullYear() - new Date(result.date.split("-").reverse().join("-")).getFullYear() > 39) {
                          $state.go(this.questionConfig.nextQuizState);
                        } else {
                          $state.go("iron-prescribed");
                        }
                      });
                  }
                });
            });
        }).catch(() => {
          // No result found so we need to submit one
          Quiz.submitQuestionAnswer({
            quizExternalReference: UserManager.getQuizExternalReference(),
            questionType: this.questionConfig.apiUrlKey,
            questionAnswer: answerId
          }, {}).$promise
            .then(() => {
              Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "genders" }).$promise
                .then(() => {
                  Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "genders" }).$promise
                    .then(result => {
                      if (result.genderId == 2) {
                        $state.go("iron-prescribed");
                      } else {
                        Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "date-of-birth" }).$promise
                          .then(result => {
                            if (new Date().getFullYear() - new Date(result.date.split("-").reverse().join("-")).getFullYear() > 39) {
                              $state.go(this.questionConfig.nextQuizState);
                            } else {
                              $state.go("iron-prescribed");
                            }
                          });
                      }
                    });
                });
            });
        });
    };
  }]);
