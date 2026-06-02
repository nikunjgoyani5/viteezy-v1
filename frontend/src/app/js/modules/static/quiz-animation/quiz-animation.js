"use strict";

angular.module("app.static.quiz-animation", [])
  .service("QuizAnimation", ["$rootScope", "$state", function ($rootScope, $state) {

    const getQuizHistory = () => {
      const sessionStorageQuizHistory = window.sessionStorage.getItem("quizHistory");
      return sessionStorageQuizHistory ? sessionStorageQuizHistory.split(',') : []
    };

    this.addQuizAnimationClass = () => {
      const quizHistory = getQuizHistory();
      const isNavigatingToPreviousPage = $state.current.name === quizHistory[quizHistory.length - 2];

      let quizAnimationClass = "quiz-next-question-entry";

      if (isNavigatingToPreviousPage) {
        quizHistory.pop();
        window.sessionStorage.setItem("quizHistory", quizHistory.join());
        quizAnimationClass = "quiz-previous-question-entry";
      }

      $rootScope.quizAnimation = quizAnimationClass;
    };
  }]);
