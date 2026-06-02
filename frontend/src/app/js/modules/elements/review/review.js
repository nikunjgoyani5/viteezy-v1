"use strict";

angular.module("app.elements.review", [])
  .directive("viReview", function () {
    return {
      restrict: 'E',
      scope: {
        slidesToShowDesktop: '=',
        slidesToScrollDesktop: '=',
        dotsDesktop: '=',
        slidesToShowMobile: '=',
        slidesToScrollMobile: '=',
        dotsMobile: '=',
      },
      controller: "ReviewController",
      controllerAs: "rw",
      bindToController: true,
      templateUrl: "app/js/modules/elements/review/review.html"
    };
  }).controller("ReviewController", ["$http", function ($http) {
    $http.get("/data/reviews.json").then((response) => {
      this.reviews.slides = response.data.reverse(); 
    });
  }]);
