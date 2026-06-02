import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) { }
  
  public getRetryPayment(planExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/payment/retry/${planExternalReference}`);
  }

  public getPaymentPlanByBlend(blendExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/payment/blend/${blendExternalReference}`);
  }

  public getMethods(country: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/payment/methods?country=${country}`);
  }

  public submitRetryPayment(planExternalReference: string): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/payment/retry/${planExternalReference}`, {});
  }

  public getPaymentStatus(planExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/payment/plan/${planExternalReference}`);
  }

  public getPaymentPlanByCustomer(status: string, customerExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/payment/${status}/customer/${customerExternalReference}`);
  }

  public reactivatePaymentPlan(planExternalReference: string): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/payment/plan/reactivate/${planExternalReference}`, {});
  }

  public changeDeliveryDate(planExternalReference: string, body: any): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/payment/plan/change-delivery-date/${planExternalReference}`, body);
  }

  public submitBlend(blendExternalReference: string, body: any): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/payment/blend/${blendExternalReference}`, body);
  }
}

angular.module('core.payment', [])
  .factory('payment', downgradeInjectable(PaymentService));