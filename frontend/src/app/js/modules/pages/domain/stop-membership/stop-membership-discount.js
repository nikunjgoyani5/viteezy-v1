"use strict";

angular.module("app.pages.domain.stop-membership-discount", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("stopmembership-discount", {
        url: "/domain/stop-membership/discount",
        controller: "StopMembershipDiscountController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/domain/stop-membership/stop-membership-discount.html",
        role: "user"
      });
  }])

  .controller("StopMembershipDiscountController", ["Payment", "UserManager", "Incentive", "toast", "$state", "DomainService", function (Payment, UserManager, Incentive, toast, $state, DomainService) {
    this.pauseMembership = () => {
      let planExternalReference = sessionStorage.getItem("planExternalReference");
      Incentive.discountIncentive({ planExternalReference: planExternalReference }, {}).$promise
        .then(() => {
          $state.go("domain");
          toast.show("De 10% korting wordt automatisch verwerkt in je volgende betaling", "large-info");
        }).catch(() => toast.show("Er is iets misgegaan bij het stopzetten van jouw vitamineplan", "error"));
    };

    this.stopMembership = () => {
      $state.go("stopmembership-really");
    };
  }]);
