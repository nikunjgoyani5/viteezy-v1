"use strict";

angular.module("app.pages.domain.domain-service", [])
  .service("DomainService", function () {

    let currentDate = new Date();

    this.buildDate = (providedDate) => {
      // Month counting starting with 0
      return new Date(providedDate[0], providedDate[1] - 1, providedDate[2]);
    }

    this.buildDateTime = (providedDate) => {
      // Month counting starting with 0
      return new Date(providedDate[0], providedDate[1] - 1, providedDate[2], providedDate[3], providedDate[4], providedDate[5]);
    }

    this.calculateDeliveryDate = (date) => {
      let deliveryDate = this.buildDate(date);
      return deliveryDate.toLocaleString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    this.formDeliveryDate = (date) => {
      let day = date.getDate();
      // Month counting starting with 0
      let month = date.getMonth() + 1;
      if (day < 10) {
        day = '0' + day;
      }
      if (month < 10) {
        month = '0' + month;
      }
      return day + "-" + month + "-" + date.getFullYear();
    }

    this.formatDeliveryDate = (date) => {
      return date.toLocaleString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    this.paymentAlreadyCreated = (paymentPlan) => {
      const now = new Date();
      const paymentDate = this.buildDate(paymentPlan.startDate);
      const deliveryDate = this.buildDate(paymentPlan.deliveryDate);
      return (paymentDate < now && deliveryDate > now);
    }

    this.calculatePauseMonthPaymentPlan = (date, months) => {
      let deliveryDate = this.buildDate(date);
      let d = deliveryDate.getDate();
      deliveryDate.setMonth(deliveryDate.getMonth() + +months);
      if (deliveryDate.getDate() != d) {
        deliveryDate.setDate(0);
      }
      return deliveryDate;
    }

    this.calculateDeliveryMonth = (date) => {
      return this.buildDate(date).toLocaleString('nl-NL', { month: 'long' });
    }

    this.calculatePaymentDate = (date) => {
      return this.buildDate(date).toLocaleString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    this.calculatePaymentDateShort = (date) => {
      return this.buildDate(date).toLocaleString('nl-NL', { day: 'numeric', month: 'short' });
    }

    this.calculatePaymentMonth = (date) => {
      return this.buildDate(date).toLocaleString('nl-NL', { month: 'long' });
    }
  });
