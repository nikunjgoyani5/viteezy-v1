export default function (appModule) {
  appModule.config(["$urlRouterProvider", "$locationProvider", "$stateProvider", function ($urlRouterProvider, $locationProvider, $stateProvider) {
    $urlRouterProvider
      .when('/blend?', ["$state", "$location", "UserManager", "Quiz", function ($state, $location, UserManager, Quiz) {
        let params = Object.keys($location.search());
        if (params.length>0) {
          UserManager.setBlendExternalReference(params[0]);
          Quiz.getByBlendExternalReference({ blendExternalReference: params[0] }).$promise.then((result) => {
            if (result.externalReference) {
              UserManager.setQuizExternalReference(result.externalReference);
              $state.go("blend", { blendStep: 1 });
            }
          });
        }
      }]);

    $stateProvider
      .state("product", {
        url: "/{product}",
        template: "<product></product>"
      }).state("about", {
        url: "/over-ons",
        template: "<about></about>",
      }).state("homepage", {
        url: "/",
        template: "<home></home>",
      }).state("shop", {
        url: "/shop",
        template: "<shop></shop>"
      }).state("privacy", {
        url: "/privacy",
        template: "<privacy></privacy>"
      }).state("terms", {
        url: "/terms",
        template: "<terms></terms>"
      }).state("bundle", {
        url: "/bundle/{product}",
        template: "<bundle></bundle>",
      }).state("payment-request", {
        url: "/payment-request/:paymentPlanExternalReference",
        template: "<payment-request></payment-request>"
      }).state("confirmed", {
        url: "/confirmed/:paymentPlanExternalReference",
        template: "<confirmed></confirmed>",
      }).state("domain", {
        url: "/domain?reference",
        template: "<domain-home></domain-home>",
      }).state("login", {
        url: "/login",
        template: "<login></login>",
      }).state("pausemembership", {
        url: "/domain/pause-membership/:changeDelivery",
        template: "<delivery-date></delivery-date>",
      }).state("blend", {
        url: "/blend/:blendStep?reference&coupon&months",
        template: "<blend></blend>",
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }])

    .run(["$state", "UserManager", "$transitions", function ($state, UserManager, $transitions) {

      $transitions.onStart({}, function (transition) {
        const denyRedirection = function () {
          $state.go("login");
        };

        if (transition.to().role === undefined) {
          window.console.warn(`State '${transition.to().name}' has no role defined`);
          transition.to().role = "anonymous";
        }

        if (!UserManager.getUserLoggedIn() && transition.to().role !== "anonymous") {
          denyRedirection();
        }

        if (transition.to().type === "question" && !UserManager.getQuizExternalReference()) {
          $state.go("quiz-v2");
        }
      });
    }])

    .run(["$rootScope", "$state", "$transitions", "$stateParams", "UserManager", function ($rootScope, $state, $transitions, $stateParams, UserManager) {
      const getQuizHistory = () => {
        const sessionStorageQuizHistory = window.sessionStorage.getItem("quizHistory");
        return sessionStorageQuizHistory ? sessionStorageQuizHistory.split(',') : []
      };

      const saveStateNameInSession = (stateName) => {
        const quizHistory = getQuizHistory();
        quizHistory.push(stateName);
        window.sessionStorage.setItem("quizHistory", quizHistory.join());
      };

      $transitions.onStart({}, (transition) => {
        if (transition.to().type === "question") {
          window.dataLayer.push({
            'event': 'quizStep',
            'eventCategory': 'quizStep',
            'eventAction': `Step: ${transition.to().name}`,
            'eventLabel': transition.to().url,
            'userId': UserManager.getCustomerExternalReference()
          });

          const quizHistory = getQuizHistory();
          saveStateNameInSession(transition.from().name);

          const isNavigatingToPreviousPage = transition.to().name === quizHistory[quizHistory.length - 1];
          let quizAnimationClass = "quiz-next-question-exit";

          if (isNavigatingToPreviousPage) {
            quizAnimationClass = "quiz-previous-question-exit";
          }

          $rootScope.quizAnimation = quizAnimationClass;

          return new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 500);
          });
        }
      });

      $transitions.onStart({}, (transition) => {
        $rootScope.isLoading = true;

        /*
          The section below will remove any timeouts that are set.
          This is to make sure that there are no timouts left when the user navigates to another page.

          Example:
            The user visits the first step of the blend page and goes to the 2nd step.
            The first and second step both set a timout to show the same popup after X amount of seconds.
            The user would see both popups since the timouts are still active in the background.

          Pages this section is used for:
            - Quiz v1
            - Quiz v2
        */
        if ($state.current.type === "question" || $state.current.type === "question") {
          let timoutId = window.setTimeout(function () { }, 0);
          while (timoutId--) {
            window.clearTimeout(timoutId);
          }
        }

      });
      $transitions.onSuccess({}, (transition) => {
        if (transition.to().name !== transition.from().name) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }

        $rootScope.isLoading = false;

        $rootScope.compactNavigation = false;
        $rootScope.visibleFooter = true;
        $rootScope.isQuiz = false;
        $rootScope.isQuizv2 = false;
        $rootScope.isBasic = false;
        $rootScope.isBlend = false;
        $rootScope.showPreviousButton = false;

        if ($state.current.name === "blend" || $state.current.name === "quiz" || $state.current.type === "question") {
          $rootScope.compactNavigation = true;
          $rootScope.visibleFooter = false;
        }

        if ($state.current.type === "question" || !$state.current.name === "blend") {
          $rootScope.logoClickable = false;
        } else {
          $rootScope.logoClickable = true;
        }

        const hiddenFooterPages = ["domain", "domainblend", "domainblendstatus", "domaincustomer", "membership", "quizoverview", "pausemembership", "stopmembership", "login"];
        if (hiddenFooterPages.includes($state.current.name)) {
          $rootScope.visibleFooter = false;
        }

        if ($state.current.name === "quiz") {
          $rootScope.isQuiz = true;
        }

        if ($state.current.type === "question") {
          $rootScope.isQuizv2 = true;
          $rootScope.showPreviousButton = true;
        }

        if ($state.current.name === "quiz" || $state.current.type === "question") {
          $rootScope.isBasic = true;
        }

        if ($state.current.name === "blend") {
          $rootScope.isBlend = true;
        }

        if ($state.current.name === "homepage") {
          $rootScope.isHomePage = true;
        } else {
          $rootScope.isHomePage = false;
        }

        document.title = "Viteezy - Gepersonaliseerde dagelijkse vitamines";

        if (window.location.search.indexOf("fbclid") > 0) {
          let fbclid = new URLSearchParams(window.location.search).get('fbclid');
          let sessionfbclid = window.sessionStorage.getItem("fbclid");
          if (fbclid !== null && (sessionfbclid === null || sessionfbclid.indexOf(fbclid) == -1)) {
            window.sessionStorage.setItem("fbclid", "fb.1." + Date.now() + "." + fbclid);
          }
        }
        if (window.location.search.indexOf("coupon") > 0) {
          let coupon = new URLSearchParams(window.location.search).get('coupon');
          let sessioncoupon = window.sessionStorage.getItem("coupon");
          if (coupon !== null && (sessioncoupon === null || sessioncoupon.indexOf(coupon) == -1)) {
            sessionStorage.setItem("pricingCoupon", coupon);
          }
        }
        if (window.location.search.indexOf("months") > 0) {
          let months = new URLSearchParams(window.location.search).get('months');
          let sessionmonths = window.sessionStorage.getItem("selectedMonths");
          if (months !== null && (sessionmonths === null || sessionmonths.indexOf(months) == -1)) {
            sessionStorage.setItem("selectedMonths", months);
          }
        }
      });
    }])

    .run(["$rootScope", "$window", function ($rootScope, $window) {

      const externalScriptsDefer = [
        { "src": "https://www.dwin1.com/21119.js" }
      ];

      const externalScriptsDeferTimeout = [
        { "id": "gorgias-chat-widget-install-v3", "src": "https://config.gorgias.chat/bundle-loader/01JJ74Y5MG1CVG0S7RTVESH3PP" }
      ];

      window.dataLayer = window.dataLayer || [];
      (function(w, d, s, l, i) {w[l] = w[l] || []; w[l].push({'gtm.start':new Date().getTime(), event: 'gtm.js'}); var f = d.getElementsByTagName(s)[0],j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src ='https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);})(window, document, 'script', 'dataLayer', 'GTM-5WB72ZK');

      if (window.CookieControl && Cookiebot) {
        window.addEventListener('CookiebotOnAccept', function (e) {
          if (Cookiebot.consent.marketing) {
            externalScriptsDefer.forEach(script => {
              const newScriptElement = document.createElement("script");

              if (typeof (script) === "object") {
                newScriptElement.setAttribute("src", script.src);
                newScriptElement.defer = true;
              } else {
                newScriptElement.setAttribute("src", script);
              }
              document.body.appendChild(newScriptElement);
            });
          }
        }, false);
      } else {
        externalScriptsDefer.forEach(script => {
          const newScriptElement = document.createElement("script");

          if (typeof (script) === "object") {
            newScriptElement.setAttribute("src", script.src);
            newScriptElement.defer = true;
          } else {
            newScriptElement.setAttribute("src", script);
          }
          document.body.appendChild(newScriptElement);
        });
      }

      setTimeout(() => {
        externalScriptsDeferTimeout.forEach(script => {
          const newScriptElement = document.createElement("script");

          if (typeof (script) === "object") {
            newScriptElement.setAttribute("id", script.id);
            newScriptElement.setAttribute("src", script.src);
            newScriptElement.defer = true;
          } else {
            newScriptElement.setAttribute("src", script);
          }
          document.body.appendChild(newScriptElement);
        });
      }, 10000);
    }])
    .run(["$rootScope", "ngDialog", function ($rootScope, ngDialog) {
      // Close dialogs when clicking on the body, outside of any dialog
      const closeDialogues = function (e) {
        // Is the clicked on element even in the visible DOM still?
        if (document.body.contains(e.target)) {
          // Is the clicked on element outside all open dialogs?
          const outsideAll = Array.from(document.querySelectorAll(".ngdialog-content")).every(
            dialog => !dialog.contains(e.target)
          );
          if (outsideAll) {
            ngDialog.closeAll();
          }
        }
      };
      document.body.addEventListener("click", closeDialogues);
      document.body.addEventListener("touchstart", closeDialogues);
    }])

    // Add a generic error checking function for forms
    .decorator("$controller", ["$delegate", function ($delegate) {
      const haserror = function (fieldName, errorType) {
        let field;
        if (typeof fieldName === "string" && this.form) {
          field = this.form[fieldName];
        }
        else if (typeof fieldName === "object") {
          field = fieldName;
        }

        if (!field) {
          return false;
        }

        const canerror = this.form.$submitted || this.form[fieldName].$dirty;
        if (!errorType) {
          return canerror && this.form[fieldName].$invalid;
        }
        return canerror && !!this.form[fieldName].$error[errorType];
      };

      return function (constructor, locals) {
        const controller = $delegate.apply(null, arguments);

        if (typeof controller === "function") {
          // It has an identifier - then it's a clasically instantiated controller, acting all modern
          if (controller.identifier) {
            controller.instance.$haserror = haserror;
          }

          // A classic controller init function - extend its scope and return
          return angular.extend(function () {
            locals.$scope.$haserror = haserror;
            return controller();
          }, controller);
        }

        if (typeof controller === "object") {
          // Controller is a class that we can extend directly
          controller.$haserror = haserror;
          return controller;
        }
      };
    }]);
}
