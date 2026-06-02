"use strict";

angular.module("app.resources.payment", [])
  .service("Payment", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/payment/blend/:blendExternalReference`, {}, {
      submitBlend: {
        method: "POST"
      },
      getRetryPayment: {
        url: `/viteezy/api/payment/retry/:planExternalReference`,
        method: "GET"
      },
      submitRetryPayment: {
        url: `/viteezy/api/payment/retry/:planExternalReference`,
        method: "POST"
      },
      getPaymentPlanByBlend: {
        method: "GET"
      },
      getPaymentPlanByCustomer: {
        url: `/viteezy/api/payment/:status/customer/:customerExternalReference`,
        method: "GET"
      },
      getPayments: {
        url: `/viteezy/api/payment/payments/:planExternalReference`,
        method: "GET",
        isArray: true
      },
      getPaymentsByBlend: {
        url: `/viteezy/api/payment/payments/blend/:blendExternalReference`,
        method: "GET",
        isArray: true
      },
      updateBlendPayment: {
        url: `/viteezy/api/payment/blend/:blendExternalReference`,
        method: "PATCH"
      },
      getPaymentStatus: {
        url: `/viteezy/api/payment/plan/:planExternalReference`,
        method: "GET"
      },
      pausePayment: {
        url: `/viteezy/api/payment/plan/:planExternalReference`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: "POST"
      },
      changeDeliveryDate: {
        url: `/viteezy/api/payment/plan/change-delivery-date/:planExternalReference`,
        method: "POST"
      },
      stopPayment: {
        url: `/viteezy/api/payment/plan/:planExternalReference`,
        headers: { 'Content-Type': 'application/json' },
        method: "DELETE",
        hasBody: true
      },
      reactivatePaymentPlan: {
        url: `/viteezy/api/payment/plan/reactivate/:planExternalReference`,
        method: "POST",
      },
      getMethods: {
        url: `/viteezy/api/payment/methods?country=:country`,
        method: "GET",
        isArray: true
      }
    });
  }]);
