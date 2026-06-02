import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class BlendService {
  constructor(private http: HttpClient) { }
  
  public createNewEmptyBlend(): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/blends/create`, {});
  }

  public submitBlendIngredient(blendExternalReference: string, ingredientId: number): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/blends/${blendExternalReference}/ingredients/${ingredientId}`, {});
  }

  public getBlendIngredientsByExternalReference(blendExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/blends/${blendExternalReference}/ingredients`);
  }

  public createBundle(bundleCode: string): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/blends/bundle/${bundleCode}`, {});
  }

  public getAggregatedByPaymentPlanExternalReference(paymentPlanExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/blends/payment-plan/${paymentPlanExternalReference}`);
  }

  public getByCustomer(customerExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/blends/customer/${customerExternalReference}`);
  }

  public getBlend(blendExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/blends/${blendExternalReference}`);
  }

  public removeBlendIngredient(blendExternalReference: string, ingredientId: string): Observable<any> {
    return this.http.delete<any>(`${environment.serverUrl}/blends/${blendExternalReference}/ingredients/${ingredientId}`);
  }

}

angular.module('core.blend', [])
  .factory('blend', downgradeInjectable(BlendService));