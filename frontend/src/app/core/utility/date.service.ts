import { Injectable } from '@angular/core';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';

@Injectable()
export class DateService {
  private currentDate = new Date();

  public buildDate = (providedDate) => {
    // Month counting starting with 0
    return new Date(providedDate[0], providedDate[1] - 1, providedDate[2]);
  }

  public buildDateTime = (providedDate) => {
    // Month counting starting with 0
    return new Date(providedDate[0], providedDate[1] - 1, providedDate[2], providedDate[3], providedDate[4], providedDate[5]);
  }

  public calculateDeliveryDate = (date) => {
    let deliveryDate = this.buildDate(date);
    return deliveryDate.toLocaleString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  public formDeliveryDate = (date) => {
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

  public formatDeliveryDate = (date) => {
    return date.toLocaleString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  public paymentAlreadyCreated = (paymentPlan) => {
    const now = new Date();
    const paymentDate = this.buildDate(paymentPlan.startDate);
    const deliveryDate = this.buildDate(paymentPlan.deliveryDate);
    return (paymentDate < now && deliveryDate > now);
  }

  public calculatePauseMonthPaymentPlan = (date, months) => {
    let deliveryDate = this.buildDate(date);
    let d = deliveryDate.getDate();
    deliveryDate.setMonth(deliveryDate.getMonth() + +months);
    if (deliveryDate.getDate() != d) {
      deliveryDate.setDate(0);
    }
    return deliveryDate;
  }

  public calculateDeliveryMonth = (date) => {
    return this.buildDate(date).toLocaleString('nl-NL', { month: 'long' });
  }

  public calculatePaymentDate = (date) => {
    return this.buildDate(date).toLocaleString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  public calculatePaymentDateShort = (date) => {
    return this.buildDate(date).toLocaleString('nl-NL', { day: 'numeric', month: 'short' });
  }

  public calculatePaymentMonth = (date) => {
    return this.buildDate(date).toLocaleString('nl-NL', { month: 'long' });
  }

}

angular.module('core.date', [])
  .factory('date', downgradeInjectable(DateService));