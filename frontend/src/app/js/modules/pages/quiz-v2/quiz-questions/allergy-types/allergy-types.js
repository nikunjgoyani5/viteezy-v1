"use strict";

angular.module("app.pages.quiz-v2.allergy-types", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("allergy-types", {
        url: "/quiz-v2/allergy-types",
        controller: "AllergyTypesController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/allergy-types/allergy-types.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("AllergyTypesController", ["Quiz", "UserManager", "$state", "toast", "QuizAnimation", function (Quiz, UserManager, $state, toast, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "diet-type",
      apiUrlKey: "allergy-types",
      apiAnswerValueKey: "allergyTypeId",
      currentProgress: 76
    };

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
    };

    let answers = [];
    this.answers = answers;

    Quiz.getPossibleAnswer({ questionType: this.questionConfig.apiUrlKey }).$promise
      .then((result) => {
        this.questionAnswers = result;
        Quiz.getQuestionAnswers({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise.then(result => {
          result.forEach(answer => {
            this.questionAnswers.find(question => question.id == answer[this.questionConfig.apiAnswerValueKey]).selected = true;
            answers.push(this.questionAnswers.find(question => question.id == answer[this.questionConfig.apiAnswerValueKey]));
          });
        });
      })
      .catch((error) => {
        console.error(error);
        toast.show("Er is iets misgegaan bij het ophalen van de antwoorden, probeer het later nog eens", "error");
      });

    const removeSelectedAnswer = (answer) => {
      Quiz.removeQuestionAnswer({
        quizExternalReference: UserManager.getQuizExternalReference(),
        questionType: this.questionConfig.apiUrlKey,
        questionAnswer: answer.id
      }, {}).$promise;
    };

    const addSelectedAnswer = (answer) => {
      Quiz.submitQuestionAnswer({
        quizExternalReference: UserManager.getQuizExternalReference(),
        questionType: this.questionConfig.apiUrlKey,
        questionAnswer: answer.id
      }, {}).$promise
        .then((response) => {
          if (response.allergyTypeId === 1) {
            $state.go(this.questionConfig.nextQuizState);
          }
        });
    };

    this.saveQuestionAnswer = (answer) => {
      if (answers.find(x => x.code === answer.code)) {
        answers = answers.filter(result => result.code !== answer.code);
        removeSelectedAnswer(answer);
      } else {
        answers.push(answer);
        addSelectedAnswer(answer);
      }
    };

    this.gotoNextStep = () => {
      $state.go(this.questionConfig.nextQuizState);
    };

  }]);
