"use strict";

const localStorage = window.localStorage;

const sessionStorage = window.sessionStorage;

const userManager = {
  getQuizExternalReference() {
    return localStorage.getItem("quizExternalReference") || undefined;
  },
  setQuizExternalReference(providedQuizExternalReference) {
    localStorage.setItem("quizExternalReference", providedQuizExternalReference);
  },
  getBlendExternalReference() {
    return localStorage.getItem("blendExternalReference") || undefined;
  },
  setBlendExternalReference(providedBlendExternalReference) {
    localStorage.setItem("blendExternalReference", providedBlendExternalReference);
  },
  removeBlendExternalReference() {
    localStorage.removeItem("blendExternalReference");
  },
  getCurrentQuizStep() {
    if (localStorage.getItem("currentQuizStep")) {
      return Number.parseInt(localStorage.getItem("currentQuizStep"));
    }
    return undefined;
  },
  setCurrentQuizStep(providedCurrentQuizStep) {
    localStorage.setItem("currentQuizStep", providedCurrentQuizStep);
  },
  getUserLoggedIn() {
    return sessionStorage.getItem("logged-in") || undefined;
  },
  setUserLoggedIn() {
    sessionStorage.setItem("logged-in", true);
  },
  logout() {
    sessionStorage.removeItem("logged-in");
  },
  getCustomerExternalReference() {
    return sessionStorage.getItem("customerExternalReference") || undefined;
  },
  setCustomerExternalReference(providedCustomerExternalReference) {
    sessionStorage.setItem("customerExternalReference", providedCustomerExternalReference);
  }
};

angular.module("app.user-manager", [])
  .service("UserManager", function () {
    return userManager;
  });
