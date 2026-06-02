"use strict";

angular.module("app.pages.domain.stop-membership-really", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("stopmembership-really", {
        url: "/domain/stop-membership/really",
        controller: "StopMembershipReallyController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/domain/stop-membership/stop-membership-really.html",
        role: "user"
      });
  }])

  .controller("StopMembershipReallyController", ["Payment", "UserManager", "toast", "$state", "DomainService", function (Payment, UserManager, toast, $state, DomainService) {
    this.stopMembership = () => {
      let stopReason = sessionStorage.getItem("stopReason");
      let planExternalReference = sessionStorage.getItem("planExternalReference");
      let deliveryDate = sessionStorage.getItem("deliveryDate");

      Payment.stopPayment({ planExternalReference: planExternalReference }, { stopReason: stopReason }).$promise
        .then(() => {
          $state.go("domain");
          if (deliveryDate) {
            toast.show("Het lidmaatschap is stopgezet, je laatste pakket is al in productie en wordt bezorgd op " + deliveryDate, "large-info");
          } else {
            toast.show("Het lidmaatschap is stopgezet", "large-info");
          }
        }).catch(() => toast.show("Er is iets misgegaan bij het stopzetten van jouw vitamineplan", "error"));
    };
  }]);
