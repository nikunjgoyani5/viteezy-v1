"use strict";

angular.module("app.shared.filters.order-text-first", [])
  .filter("orderTextFirst", () => {
    return (values) => {
      const items = [];

      values.forEach(record => {
        if (isNaN(record.name.charAt(0))) {
          items.unshift(record);
        } else {
          items.push(record);
        }
      });
      return items;
    };
  });