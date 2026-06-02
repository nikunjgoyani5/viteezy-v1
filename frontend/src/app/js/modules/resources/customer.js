"use strict";

angular.module("app.resources.customer", [])
  .service("Customer", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/customer/blend/:blendExternalReference`, {}, {
      getCustomer: {
        url: `/viteezy/api/customer/:customerExternalReference`,
        method: "GET"
      },
      getCustomerByBlend: {
        method: "GET"
      },
      updateCustomerInformation: {
        method: "PUT",
        withCredentials: true
      },
      checkCustomerEmail: {
        url: `/viteezy/api/customer/email/:email`,
        method: "GET"
      },
      checkByReferralCode: {
        url: `/viteezy/api/customer/referral/:referralCode`,
        method: "GET"
      },
      getByQuizExternalReference: {
        url: `/viteezy/api/customer/email/quiz/:quizExternalReference`,
        method: "GET"
      },
      saveByQuizExternalReference: {
        url: `/viteezy/api/customer/email/quiz/:quizExternalReference`,
        method: "POST"
      },
      updateByQuizExternalReference: {
        url: `/viteezy/api/customer/email/quiz/:quizExternalReference`,
        method: "PUT"
      },
      getByPaymentPlanReference: {
        url: `/viteezy/api/customer/payment-plan/:paymentPlanExternalReference`,
        method: "GET"
      }
    });
  }]);
