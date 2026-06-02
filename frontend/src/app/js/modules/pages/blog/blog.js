"use strict";

angular.module("app.pages.blog", [])
  .config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state("blog", {
        url: "/blog",
        redirectTo: function () {
          window.location.replace(window.location.origin + "/blog");
          return false;
        }
      })
      .state("sustainability", {
        url: "/blog/duurzaamheid",
        redirectTo: function () {
          window.location.replace(window.location.origin + "/blog/duurzaamheid");
          return false;
        }
      })
      .state("library", {
        url: "/blog/bibliotheek",
        redirectTo: function () {
          window.location.replace(window.location.origin + "/blog/bibliotheek");
          return false;
        }
      });
  }]);