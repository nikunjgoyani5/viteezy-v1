"use strict";

angular.module("app.pages.quiz-v2.usage-goals", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("usage-goals", {
        url: "/quiz-v2/usage-goals",
        controller: "UsageGoalsController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/quiz-v2/quiz-questions/usage-goals/usage-goals.html",
        role: "anonymous",
        type: "question"
      });
  }])

  .controller("UsageGoalsController", ["Quiz", "UserManager", "$state", "toast", "QuizAnimation", function (Quiz, UserManager, $state, toast, QuizAnimation) {
    this.questionConfig = {
      nextQuizState: "primary-goal",
      apiUrlKey: "usage-goals",
      apiAnswerValueKey: "usageGoalId",
      currentProgress: 18
    };

    this.$onInit = () => {
      QuizAnimation.addQuizAnimationClass();
    };

    let answers = [];
    this.answers = answers;
    const usageGoalsOrder = ["sleep", "stress", "energy", "digestion", "skin", "resistance", "weight-loose", "menstruation", "libido", "brain", "hair-and-nails", "fitness"];

    Quiz.getActiveAnswer({ questionType: this.questionConfig.apiUrlKey }).$promise
      .then((result) => {
        const sortedList = result.sort((a, b) => {
          return (
            usageGoalsOrder.indexOf(a.code) - usageGoalsOrder.indexOf(b.code)
          );
        });

        Quiz.getQuestionAnswer({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: "genders" }).$promise
          .then(response => {
            if (response.genderId == 2) {
              this.questionAnswers = sortedList.filter(item => item.code !== "menstruation");
            } else {
              this.questionAnswers = sortedList;
            }
          }).finally(() => {
            Quiz.getQuestionAnswers({ quizExternalReference: UserManager.getQuizExternalReference(), questionType: this.questionConfig.apiUrlKey }).$promise
              .then(result => {
                result.forEach(answer => {
                  this.questionAnswers.find(question => question.id == answer[this.questionConfig.apiAnswerValueKey]).selected = true;
                  answers.push(this.questionAnswers.find(question => question.id == answer[this.questionConfig.apiAnswerValueKey]));
                });
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
      }, {}).$promise.then((this.answers = answers));

    };

    const addSelectedAnswer = (answer) => {
      Quiz.submitQuestionAnswer({
        quizExternalReference: UserManager.getQuizExternalReference(),
        questionType: this.questionConfig.apiUrlKey,
        questionAnswer: answer.id
      }, {}).$promise;
    };

    this.saveQuestionAnswer = (answer) => {
      if (answers.find(x => x.code === answer.code)) {
        answers = answers.filter(result => result.code !== answer.code);
        removeSelectedAnswer(answer);
      } else {
        answers.push(answer);

        if (answers.length > 2) {
          toast.show("Kies maximaal twee onderwerpen", "error");
        }

        addSelectedAnswer(answer);
      }
    };

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

    const updateSessionGoalPages = (pages) => {
      window.sessionStorage.setItem("chosenPath", pages.join());
    };

    const gotoTheNextQuizStep = () => {
      if (!window.sessionStorage.getItem("chosenPath")) {
        return "email";
      } else {
        const remainingQuizPathQuestions = window.sessionStorage.getItem("chosenPath").split(',');
        $state.go(remainingQuizPathQuestions[0]);
      }
    };

    this.gotoNextCategoryStep = () => {
      if (answers.length < 1) {
        toast.show("Kies maximaal twee onderwerpen", "error");
      }

      if (answers.length < 1 || answers.length > 2) {
        return;
      }

      if (answers.length === 2) {
        toast.hide();
        $state.go(this.questionConfig.nextQuizState);
      } else if (UserManager.getUserLoggedIn()) {
        updateSessionGoalPages(getPagesForProvidedGoal(answers[0]).pages);
        $state.go(gotoTheNextQuizStep())
      } else {
        toast.hide();
        $state.go("email");
      }
    };
  }]);
