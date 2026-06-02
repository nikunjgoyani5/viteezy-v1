"use strict";

angular.module("app.pages.quiz-v2.email", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("email", {
        url: "/quiz-v2/email",
        controller: "EmailController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/email/email.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("EmailController", ["$state", "Quiz", "UserManager", "toast", "Customer", "QuizAnimation", function ($state, Quiz, UserManager, toast, Customer, QuizAnimation) {
    this.questionConfig = {
      apiUrlKey: "email",
      apiAnswerValueKey: "id",
      currentProgress: 22
    };

    this.user = {};

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
      this.acceptedEmails = false;
    };

    const goalInformation = {
      allAvailableGoals: [],
      chosenGoals: [],
      primaryGoal: null
    };

    Quiz.getPossibleAnswer({ questionType: "usage-goals" }).$promise
      .then(result => goalInformation.allAvailableGoals = result);

    Quiz.getQuestionAnswers({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "usage-goals" }).$promise
      .then(result => goalInformation.chosenGoals = result);

    Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "primary-goal" }).$promise
      .then(result => goalInformation.primaryGoal = result);

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

    const setGoalOrder = () => {
      let orderList = goalInformation.chosenGoals.slice();
      if (goalInformation.primaryGoal) {
        orderList = orderList.filter(x => x.usageGoalId !== goalInformation.primaryGoal.primaryGoalId);
        orderList.unshift(goalInformation.primaryGoal);
      }

      return orderList.map(item => {
        const answer = goalInformation.allAvailableGoals.filter(x => x.id === item.usageGoalId || x.id === item.primaryGoalId);
        item.code = answer[0].code;
        return item;
      });
    };

    const buildGoalPath = () => {
      const allSelectedGoals = setGoalOrder();
      let pageOrderList = [];
      allSelectedGoals.forEach(goal => {
        pageOrderList = pageOrderList.concat(getPagesForProvidedGoal(goal).pages);
      });

      return pageOrderList;
    };

    const updateSessionGoalPages = (pages) => {
      window.sessionStorage.setItem("chosenPath", pages.join());
    };

    const gotoTheNextQuizStep = () => {
      if (!window.sessionStorage.getItem("chosenPath") || window.sessionStorage.getItem("chosenPath") === "") {
        return "lifestyle-information";
      } else {
        const remainingQuizPathQuestions = window.sessionStorage.getItem("chosenPath").split(',');
        $state.go(remainingQuizPathQuestions[0]);
      }
    };

    this.skipQuestionAnswer = () => {
      updateSessionGoalPages(buildGoalPath());
      $state.go(gotoTheNextQuizStep());
    }

    this.submitQuestionAnswer = (email) => {
      updateSessionGoalPages(buildGoalPath());

      if (!email) {
        this.emailForm.email.$dirty = true; 
        this.emailForm.$invalid = true;
        return;
      }

      Customer.checkCustomerEmail({ email: email }).$promise
        .then(() => {
          Customer.getByQuizExternalReference({ quizExternalReference: UserManager.getQuizExternalReference() }).$promise
            .then(result => {
              if (result.email === email) {
                UserManager.setCustomerExternalReference(result.externalReference);
                Customer.updateByQuizExternalReference({ quizExternalReference: UserManager.getQuizExternalReference() }, { [this.questionConfig.apiUrlKey]: email, optIn: true }).$promise
                  .then((result => {
                    $state.go(gotoTheNextQuizStep());
                  })).catch(() => {
                    this.showEmailExistsError = true;
                  });
              } else {
                this.showEmailExistsError = true;
              };
            }).catch(() => {
              this.showEmailExistsError = true;
            });
        }).catch(() => {
          this.showEmailExistsError = false;
          Customer.getByQuizExternalReference({ quizExternalReference: UserManager.getQuizExternalReference() }).$promise.then(result => {
            // Result found let's update the answer
            UserManager.setCustomerExternalReference(result.externalReference);
            Customer.updateByQuizExternalReference({ quizExternalReference: UserManager.getQuizExternalReference() }, { [this.questionConfig.apiUrlKey]: email, optIn: true, fbclid: window.sessionStorage.getItem("fbclid") }).$promise
              .then(result => {
                $state.go(gotoTheNextQuizStep());
              }).catch(() => {
                this.showEmailExistsError = true;
              });
          }).catch(() => {
            // No result found so we need to submit one
            Customer.saveByQuizExternalReference({ quizExternalReference: UserManager.getQuizExternalReference() }, { [this.questionConfig.apiUrlKey]: email, optIn: true, fbclid: window.sessionStorage.getItem("fbclid") }).$promise
              .then(result => {
                UserManager.setCustomerExternalReference(result.externalReference);
                $state.go(gotoTheNextQuizStep())
              }).catch(() => {
                toast.show("Er is iets misgegaan, probeer het later nog eens", "error");
              });
          });
        });

    };
  }]);
