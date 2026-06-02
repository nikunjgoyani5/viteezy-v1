"use strict";

angular.module("app.shared.filters.translate-payment-status", [])
  .filter("translatePaymentStatus", () => {
    return (value) => {
      switch (value) {
        case "paid":
          return "Betaald";
        case "open":
          return "Open";
        case "canceled":
          return "Geannuleerd";
        case "pending":
          return "In afwachting";
        case "authorized":
          return "Geautoriseerd";
        case "expired":
          return "Verlopen";
        case "failed":
          return "Mislukt";
        case "chargeback":
          return "Terugboeking";
        case "refund":
          return "Refund"
      }
    };
  });