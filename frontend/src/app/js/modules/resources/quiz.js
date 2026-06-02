"use strict";

angular.module("app.resources.quiz", [])
  .service("Quiz", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/quiz`, {}, {
      start: {
        method: "POST"
      },
      getPossibleAnswer: {
        url: `/viteezy/api/category/:questionType`,
        method: "GET",
        isArray: true
      },
      getActiveAnswer: {
        url: `/viteezy/api/category/:questionType/_active`,
        method: "GET",
        isArray: true
      },
      getCategoryAnswerById: {
        url: `/viteezy/api/category/:questionType/:id`,
        method: "GET"
      },
      getCategoryAnswersById: {
        url: `/viteezy/api/category/:questionType/:id`,
        method: "GET",
        isArray: true
      },
      submitQuestionAnswer: {
        url: `/viteezy/api/quiz/:quizExternalReference/answer/:questionType/:questionAnswer`,
        method: "POST"
      },
      getQuestionAnswer: {
        url: `/viteezy/api/quiz/:quizExternalReference/answer/:questionType`,
        method: "GET"
      },
      getQuestionAnswers: {
        url: `/viteezy/api/quiz/:quizExternalReference/answer/:questionType`,
        method: "GET",
        isArray: true
      },
      submitOpenQuestionAnswer: {
        url: `/viteezy/api/quiz/:quizExternalReference/answer/:questionType`,
        method: "POST"
      },
      updateQuestionAnswer: {
        url: `/viteezy/api/quiz/:quizExternalReference/answer/:questionType/:questionAnswer`,
        method: "PUT"
      },
      removeQuestionAnswer: {
        url: `/viteezy/api/quiz/:quizExternalReference/answer/:questionType/:questionAnswer`,
        method: "DELETE"
      },
      updateOpenQuestionAnswer: {
        url: `/viteezy/api/quiz/:quizExternalReference/answer/:questionType`,
        method: "PUT"
      },
      calculateBlend: {
        url: `/viteezy/api/quiz/:quizExternalReference/blends/:version`,
        method: "POST"
      },
      getBlend: {
        url: `/viteezy/api/quiz/:quizExternalReference/blends`,
        method: "GET"
      },
      getSubmittedAnswer: {
        url: `/viteezy/api/quiz/:quizExternalReference/answer/:questionType`,
        method: "GET"
      },
      getMultipleSubmittedAnswers: {
        url: `/viteezy/api/quiz/:quizExternalReference/answer/:questionType`,
        method: "GET",
        isArray: true
      },
      getBlendPreview: {
        url: `/viteezy/api/quiz/:quizExternalReference/preview/blends/:version`,
        method: "GET",
        isArray: true
      },
      getByCustomerReference: {
        url: `/viteezy/api/quiz/customer/:customerExternalReference`,
        method: "GET"
      },
      getByBlendExternalReference: {
        url: `/viteezy/api/quiz/blend/:blendExternalReference`,
        method: "GET"
      }
    });
  }]);
