import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }
  
  public getByPaymentPlanReference(paymentPlanExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/customer/payment-plan/${paymentPlanExternalReference}`);
  }

  public getCustomer(customerExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/customer/${customerExternalReference}`);
  }

  public getCustomerByBlend(blendExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/customer/blend/${blendExternalReference}`);
  }

  public updateCustomerInformation(blendExternalReference: string, body: any): Observable<any> {
    return this.http.put<any>(`${environment.serverUrl}/customer/blend/${blendExternalReference}`, body);
  }

  public checkByReferralCode(referralCode: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/customer/referral/${referralCode}`);
  }

  
}

angular.module('core.customer', [])
  .factory('customer', downgradeInjectable(CustomerService));