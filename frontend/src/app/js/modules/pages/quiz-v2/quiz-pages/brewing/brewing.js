"use strict";

angular.module("app.pages.quiz-v2.brewing", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("brewing", {
        url: "/quiz-v2/brewing",
        controller: "BrewingController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-pages/brewing/brewing.html",
        role: "anonymous",
        type: "question"
      });
  }])
  .controller("BrewingController", ["$state", "toast", "UserManager", "Quiz", "$timeout", "Ingredient", "QuizAnimation", function ($state, toast, UserManager, Quiz, $timeout, Ingredient, QuizAnimation) {
    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
    };

    const questionAnswerObj = {
      quizExternalReference: UserManager.getQuizExternalReference(),
      version: "v2"
    };

    const pollBlend = () => $timeout(() => {
      if (UserManager.getUserLoggedIn() && UserManager.getBlendExternalReference() !== undefined) {
        $state.go("quizoverviewv2");
      } else {
        Ingredient.getBlendIngredientsByExternalReference({ blendExternalReference: UserManager.getBlendExternalReference() }).$promise.then((blendIngredients) => {
          if (blendIngredients.length > 0) {
            $state.go("blend", { blendStep: 2 });
          } else {
            pollBlend();
          }
        }).catch(error => console.error(error));
      }
    }, 3000);

    if (!UserManager.getUserLoggedIn()) {
      Quiz.calculateBlend(questionAnswerObj, {}).$promise.then((result) => {
        if (result.blendExternalReference) {
          UserManager.setBlendExternalReference(result.blendExternalReference);
          pollBlend();
        }
      }).catch(err => {
        console.error(err);
        toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
      });
    } else {
      pollBlend();
    }

  }]);
