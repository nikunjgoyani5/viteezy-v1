"use strict";

angular.module("app.resources.content", [])
  .service("Content", ["$resource", function ($resource) {
    return $resource(`/viteezy/api/content/:code`, {}, {
      getByCode: {
        method: "GET"
      }
    });
  }]);
