"use strict";

angular.module("app.elements.trustpilot", [])
  .directive("viTrustpilot", function () {
    return {
      restrict: 'E',
      scope: {
        isBottom: '=',
        isSingleLine: '=',
        isCenter: '=',
      },
      controller: "TrustpilotController",
      controllerAs: "tp",
      bindToController: true,
      templateUrl: "app/js/modules/elements/trustpilot/trustpilot.html"
    };
  }).controller("TrustpilotController", ["$http", function ($http) {

    $http({
      method: 'GET',
      url: '/viteezy/api/review/summary/trustpilot'
    }).then((response) => {
      this.score = response.data.score;
      this.total = response.data.total.toLocaleString('nl-NL');
    });

  }]);
