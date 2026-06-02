"use strict";

angular.module("app.shared.filters.show-no-answer-first", [])
  .filter("showNoAnswerFirst", () => {
    return (values) => {
      if (values) {
        const items = [];
        values.forEach(record => {
          if (record.name.toLowerCase().includes("geen")) {
            items.unshift(record);
          } else {
            items.push(record);
          }
        });
        return items;
      }
    };
  });
