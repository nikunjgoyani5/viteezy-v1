"use strict";

angular.module("app.shared.toast", [])
  .factory("toast", ['$timeout', function ($timeout) {
    const showToast = function (content, type, extendedDisplayDuration) {
      return new Promise(function (resolve, reject) {
        const animationDuration = 200;

        let displayDuration = 5000;
        if (extendedDisplayDuration) {
          displayDuration = extendedDisplayDuration;
        }

        const innerTemplate = `
            <div class="toast-content">
              <span>${content}</span>
            </div>
          `;

        const toast = document.createElement("div");
        toast.className = "toast toast-opened toast-" + type;
        toast.innerHTML = innerTemplate;
        document.body.appendChild(toast);

        $timeout(() => {
          toast.classList.remove("toast-opened");
          $timeout(() => document.body.removeChild(toast), animationDuration, false);
          resolve();
        }, displayDuration, false);
      });
    };

    const hideToast = () => {
      document.querySelectorAll(".toast").forEach(el => el.remove());
    };

    return {
      show: showToast,
      hide: hideToast
    };
  }]);
