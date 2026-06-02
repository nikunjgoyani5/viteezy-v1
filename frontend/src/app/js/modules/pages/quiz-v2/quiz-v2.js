"use strict";

angular.module("app.pages.quiz-v2", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("quiz-v2", {
        url: "/quiz-v2",
        controller: "QuizV2Controller",
        controllerAs: "vm",
        bindToController: true,
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("QuizV2Controller", ["$state", "Quiz", "UserManager", "toast", function ($state, Quiz, UserManager, toast) {
    window.sessionStorage.setItem("quizHistory", []);

    if (UserManager.getUserLoggedIn() && UserManager.getQuizExternalReference()) {
      $state.go("vitamin-opinion");
    } else {
      Quiz.start().$promise.then((result) => {
        UserManager.setQuizExternalReference(result.externalReference);
        $state.go("welcome");
      }).catch(() => {
        toast.show("Er is iets misgegaan bij het starten van de quiz", "error");
      });
    }
  }]);

