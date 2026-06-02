"use strict";

angular.module("app.pages.domain.stop-membership-pause", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("stopmembership-pause", {
        url: "/domain/stop-membership/pause",
        controller: "StopMembershipPauseController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/domain/stop-membership/stop-membership-pause.html",
        role: "user"
      });
  }])

  .controller("StopMembershipPauseController", ["Payment", "UserManager", "Incentive", "toast", "$state", "DomainService", function (Payment, UserManager, Incentive, toast, $state, DomainService) {
    this.pauseMonthPaymentPlan = sessionStorage.getItem("pauseMonthPaymentPlan");
    this.pauseMonthDeliveryDate = sessionStorage.getItem("pauseMonthDeliveryDate");
    this.deliveryDate = sessionStorage.getItem("deliveryDate");

    this.pauseMembership = () => {
      let planExternalReference = sessionStorage.getItem("planExternalReference");
      Payment.changeDeliveryDate({ planExternalReference: planExternalReference }, { deliveryDate: this.pauseMonthDeliveryDate }).$promise
        .then(() => {
          Incentive.pausedIncentive({ planExternalReference: planExternalReference }, {}).$promise
            .then(() => {
              $state.go("domain");
              toast.show("Het lidmaatschap is gepauzeerd tot " + this.pauseMonthPaymentPlan, "large-info");
            }).catch(() => toast.show("Er is iets misgegaan bij het stopzetten van jouw vitamineplan", "error"));
        }).catch(() => toast.show("Er is iets misgegaan bij het stopzetten van jouw vitamineplan", "error"));
    };

    this.stopMembership = () => {
      $state.go("stopmembership-discount");
    };
  }]);
