"use strict";

angular.module("app.pages.quiz-v2.primary-goal", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("primary-goal", {
        url: "/quiz-v2/primary-goal",
        controller: "PrimaryGoalController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/primary-goal/primary-goal.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("PrimaryGoalController", ["Quiz", "UserManager", "$state", "toast", "QuizAnimation", function (Quiz, UserManager, $state, toast, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "email",
      apiUrlKey: "primary-goal",
      apiAnswerValueKey: "usageGoalId",
      currentProgress: 20
    };

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
    };

    let allAnswers;
    this.questionAnswers = [];

    Quiz.getPossibleAnswer({ questionType: this.questionConfig.apiUrlKey }).$promise
      .then((result) => {
        allAnswers = result;
        Quiz.getQuestionAnswers({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "usage-goals" }).$promise
        .then(result => {
          result.forEach(answer => {
            const foundOption = allAnswers.filter(question => question.id === answer[this.questionConfig.apiAnswerValueKey])[0];
            this.questionAnswers.push(foundOption);
          });
        });
      })
      .catch((error) => {
        console.error(error);
        toast.show("Er is iets misgegaan bij het ophalen van de antwoorden, probeer het later nog eens", "error");
      });

    const getPagesForProvidedGoal = (goal) => {
      const pagesList = [
        { name: "sleep", pages: ["trouble-falling-asleep", "tired-when-wake-up", "average-sleeping-hours"] },
        { name: "stress", pages: ["stress-level", "stress-level-at-end-of-day", "stress-level-condition"] },
        { name: "energy", pages: ["energy-state", "lack-of-concentration"] },
        { name: "fitness", pages: ["sport-amount", "type-of-training", "sport-reason"] },
        { name: "digestion", pages: ["digestion-amount", "digestion-occurrence"] },
        { name: "hair-and-nails", pages: ["hair-type", "nail-improvement"] },
        { name: "skin", pages: ["skin-type", "skin-problem", "acne-place", "dry-skin"] },
        { name: "weight-loose", pages: ["lose-weight-challenge", "binge-eating", "sleep-hours-less-than-seven"] },
        { name: "resistance", pages: ["present-at-crowded-places", "often-having-flu", "training-intensively", "health-complaints"] },
        { name: "libido", pages: ["current-libido", "sleep-quality", "libido-stress-level"] },
        { name: "brain", pages: ["attention-state", "mental-fitness", "attention-focus"] },
        { name: "menstruation", pages: ["menstruation-interval", "menstruation-side-issue", "menstruation-mood"] }
      ];

      return pagesList.filter(x => x.name === goal.code)[0];
    };

    const setGoalOrder = (primaryGoal) => {
      let orderList = this.questionAnswers.slice();
      if (primaryGoal) {
        orderList = orderList.filter(x => x.id !== primaryGoal.id);
        orderList.unshift(primaryGoal);
      }

      return orderList.map(item => {
        const answer = this.questionAnswers.filter(x => x.id === item.id);
        item.code = answer[0].code;
        return item;
      });
    };

    const buildGoalPath = (primaryGoal) => {
      const allSelectedGoals = setGoalOrder(primaryGoal);
      let pageOrderList = [];
      allSelectedGoals.forEach(goal => {
        pageOrderList = pageOrderList.concat(getPagesForProvidedGoal(goal).pages);
      });

      return pageOrderList;
    };

    const updateSessionGoalPages = (pages) => {
      window.sessionStorage.setItem("chosenPath", pages.join());
    };

    const gotoTheNextQuizStep = (primaryGoal) => {
      updateSessionGoalPages(buildGoalPath(primaryGoal));

      if (!window.sessionStorage.getItem("chosenPath")) {
        return this.questionConfig.nextQuizState;
      } else if (UserManager.getUserLoggedIn()) {
        const remainingQuizPathQuestions = window.sessionStorage.getItem("chosenPath").split(',');
        $state.go(remainingQuizPathQuestions[0]);
      } else {
        return this.questionConfig.nextQuizState;
      }
    };

    this.submitQuestionAnswer = (answer) => {
      Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise
        .then(result => {
          // Result found let's update the answer
          Quiz.updateQuestionAnswer({
            quizExternalReference: UserManager.getQuizExternalReference(),
            questionType: this.questionConfig.apiUrlKey,
            questionAnswer: answer.id
          }, {}).$promise
            .then(() => $state.go(gotoTheNextQuizStep(answer)))
        }).catch(() => {
          // No result found so we need to submit one
          Quiz.submitQuestionAnswer({
            quizExternalReference: UserManager.getQuizExternalReference(),
            questionType: this.questionConfig.apiUrlKey,
            questionAnswer: answer.id
          }, {}).$promise
            .then(() => $state.go(gotoTheNextQuizStep(answer)))
        });
    };
  }]);
