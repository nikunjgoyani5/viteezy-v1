import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class PricingService {

  constructor(private http: HttpClient) { }

  public getBlendPricing(blendExternalReference: string, body: any): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/pricing/blend/${blendExternalReference}`, body);
  }
}

angular.module('core.pricing', [])
  .factory('pricing', downgradeInjectable(PricingService));