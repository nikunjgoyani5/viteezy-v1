"use strict";

angular.module("app.elements.navigation", ["core.klaviyo"])
  .directive("viNavigation", ["UserManager", "$state", "Content", "klaviyo", function (UserManager, $state, Content, klaviyo) {
    return {
      restrict: "E",
      scope: {
        homepage: "=",
        compact: "=",
        previousButton: "=",
        logoClickable: "="
      },
      controller: function () {

        Content.getByCode({ code: "homepage-banner" }, {}).$promise
          .then((response) => {
            this.content = response;
          });

        this.toggleNavigation = () => {
          this.menuVisible = !this.menuVisible;
        };

        this.menuItemClick = () => {
          if (this.menuVisible) {
            this.menuVisible = !this.menuVisible;
          }
        }

        // Use KlaviyoService to open Klaviyo popup 
        this.klaviyoPopupService = function () {
          klaviyo.openKlaviyoPopup();
        };

        this.startQuiz = function () {
          $state.go("quiz-v2");
        };

        this.loggedin = UserManager.getUserLoggedIn();

        this.logout = () => {
          UserManager.logout();
          $state.go("login");
        }
      },
      controllerAs: "vm",
      bindToController: true,
      templateUrl: "app/js/modules/elements/navigation/navigation.html"
    };
  }]);
