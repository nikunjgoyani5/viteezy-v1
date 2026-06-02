import * as angular from 'angular';
import { Component, Inject } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import { UIRouterState } from 'src/app/ajs-upgraded-providers';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'payment-request',
  templateUrl: './payment-request.component.html',
  styleUrl: './payment-request.component.scss'
})
export class PaymentRequestComponent {
  public allPaymentsPaid = false;
  public paymentMethods: any;
  public amount: any;

  constructor(
    @Inject(UIRouterState) private $state, 
    private paymentService: PaymentService) {

  }

  public ngOnInit(): void {
    this.paymentService.getRetryPayment(this.$state.params.paymentPlanExternalReference)
      .subscribe((response) => {
        this.amount = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(response.amount);
      },
      (error) => {
        if (error.status === 409) {
          this.allPaymentsPaid = true;
        }
      });
      
    
    this.paymentService.getMethods(this.getCountry())
      .subscribe((result) => {
        this.paymentMethods = result;
      });
  }

  private getCountry = () => {
    if (window.location.hostname.endsWith('.be')) {
      return "BE";
    } else {
      return "NL";
    }
  };

  public sumbitPayment = () => {
    this.paymentService.submitRetryPayment(this.$state.params.paymentPlanExternalReference)
      .subscribe((response) => {
        window.location.href = response.checkoutUrl;
      },
      (error) => {
        if (error.status === 409) {
          this.allPaymentsPaid = true;
        }
      });
  }

}

angular.
  module('paymentRequest', [])
    .directive('paymentRequest', downgradeComponent({component: PaymentRequestComponent}) as angular.IDirectiveFactory);
