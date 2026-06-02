"use strict";

angular.module("app.resources.login", [])
  .service("Login", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/login?email=:email`, {}, {
      sendMagicLink: {
        method: "POST"
      }
    });
  }]);
