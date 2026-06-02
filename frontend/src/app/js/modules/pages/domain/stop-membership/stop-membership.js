"use strict";

angular.module("app.pages.domain.stop-membership", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("stopmembership", {
        url: "/domain/stop-membership",
        controller: "StopMembershipController",
        controllerAs: "vm",
        bindToController: true,
        templateUrl: "app/js/modules/pages/domain/stop-membership/stop-membership.html",
        role: "user"
      });
  }])

  .controller("StopMembershipController", ["Payment", "UserManager", "toast", "$state", "DomainService", function (Payment, UserManager, toast, $state, DomainService) {
    const paymentAlreadyCreated = (paymentPlan) => {
      this.isPaymentAlreadyCreated = DomainService.paymentAlreadyCreated(paymentPlan);
      let pauseMonthPaymentPlan = DomainService.calculatePauseMonthPaymentPlan(paymentPlan.deliveryDate, this.isPaymentAlreadyCreated ? 2 : 1);
      const now = new Date();
      this.firstMonthPaymentPlan = DomainService.calculatePauseMonthPaymentPlan(paymentPlan.creationDate, 1) > now;
      sessionStorage.setItem("pauseMonthPaymentPlan", DomainService.formatDeliveryDate(pauseMonthPaymentPlan));
      sessionStorage.setItem("pauseMonthDeliveryDate", DomainService.formDeliveryDate(pauseMonthPaymentPlan));
      if (this.isPaymentAlreadyCreated) {
        sessionStorage.setItem("deliveryDate", DomainService.calculateDeliveryDate(paymentPlan.deliveryDate));
      } else {
        sessionStorage.removeItem("deliveryDate");
      }
    }

    let planExternalReference;
    Payment.getPaymentPlanByBlend({ blendExternalReference: UserManager.getBlendExternalReference() }, {}).$promise
      .then((response) => {
        planExternalReference = response.externalReference;
        paymentAlreadyCreated(response);
      })
      .catch(() => {
        toast.show("U heeft geen actief lidmaatschap", "error");
      });

    this.reasons = [
      {
        "reason": "Ik wil geen lidmaatschap"
      },
      {
        "reason": "De kwaliteit van de pillen voldoen niet aan mijn verwachtingen"
      },
      {
        "reason": "Ik krijg niet genoeg informatie over mijn pillen"
      },
      {
        "reason": "Ik wilde het eenmalig uitproberen"
      },
      {
        "reason": "Ik vergeet vaak mijn pillen in te nemen"
      },
      {
        "reason": "Ik weet niet of de pillen echt werken voor mij en mijn gezondheidsdoelen"
      },
      {
        "reason": "Het aanbod is te duur"
      },
      {
        "reason": "Mijn bestelling is te laat of beschadigd"
      },
      {
        "reason": "Ik heb geen klantondersteuning ontvangen"
      },
      {
        "reason": "Pillen ontbraken in mijn bestelling"
      }
    ];

    this.stopMembership = () => {
      let stopReason;
      if (this.openStopReason) {
        stopReason = this.openStopReason;
      } else if (this.reason) {
        stopReason = this.reason;
      } else {
        this.error = true;
        return false;
      }
      sessionStorage.setItem("stopReason", stopReason);
      sessionStorage.setItem("planExternalReference", planExternalReference);

      if (this.firstMonthPaymentPlan) {
        $state.go("stopmembership-discount");
      } else {
        $state.go("stopmembership-pause");
      }
    };

    this.otherReason = () => this.showOtherReason = true;
  }]);
