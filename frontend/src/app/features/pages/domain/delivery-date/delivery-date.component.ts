import * as angular from 'angular';
import { Component, Inject } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

import { Toast, UserManager } from 'src/app/ajs-upgraded-providers';
import { PaymentService } from 'src/app/core/services/payment.service';
import { DateService } from 'src/app/core/utility/date.service';

@Component({
  selector: 'deliveryDate',
  templateUrl: './delivery-date.component.html',
  styleUrl: './delivery-date.component.scss'
})
export class DeliveryDateComponent {

  private planExternalReference: any;
  deliveryDate: any;
  nextDeliveryDate: any;
  isPaymentAlreadyCreated: boolean;
  selectedDeliveryDate: any;

  constructor(
    @Inject(Toast) private toast,
    @Inject(UserManager) private UserManager,
    private paymentService: PaymentService,
    private dateService: DateService) {}

  public ngOnInit(): void {
    const date = new Date();
    date.setDate(date.getDate() + 9);
    var minimumDeliveryDate = date.toISOString().split('T')[0];
    document.getElementsByName("deliverydate")[0].setAttribute('min', minimumDeliveryDate);
    const maximumDate = new Date();
    maximumDate.setFullYear(date.getFullYear() + 1);
    var maximumDeliveryDate = maximumDate.toISOString().split('T')[0];
    document.getElementsByName("deliverydate")[0].setAttribute('max', maximumDeliveryDate); 

    this.getPaymentPlan();
  }

  public getPaymentPlan = () => {
    this.paymentService.getPaymentPlanByBlend(this.UserManager.getBlendExternalReference())
      .subscribe((response) => {
        this.planExternalReference = response.externalReference;
        this.deliveryDate = this.dateService.calculateDeliveryDate(response.deliveryDate);
        if (response.nextDeliveryDate !== null) {
          this.nextDeliveryDate = this.dateService.calculateDeliveryDate(response.nextDeliveryDate);
        }
        this.isPaymentAlreadyCreated = this.dateService.paymentAlreadyCreated(response);
      });
  }

  public changeDeliveryDate = () => {
    const deliveryDate = this.dateService.formDeliveryDate(new Date(this.selectedDeliveryDate));
    this.paymentService.changeDeliveryDate(this.planExternalReference, { deliveryDate: deliveryDate })
      .subscribe(() => {
        this.toast.show("Je leverdatum is gewijzigd", "info");
        this.getPaymentPlan();
      },
      (error) => {
        this.toastErrorDeliveryDate(error);
      });    
  }

  private toastErrorDeliveryDate = (error) => {
    if (error.data.message === "IllegalArgumentException") {
      this.toast.show("Leverdatum kan minimaal 8 dagen vanaf vandaag zijn", "error");
    } else if (error.data.message === "DuplicateKeyException") {
      this.toast.show("Je eerste pakket komt eraan, je kan op dit moment geen wijzigingen doorvoeren", "error");
    } else {
      this.toast.show("Er is iets misgegaan bij het aanpassen van je leverdatum", "error");
    }
  }

}

angular.
  module('deliveryDate', [])
    .directive('deliveryDate', downgradeComponent({component: DeliveryDateComponent}) as angular.IDirectiveFactory);
