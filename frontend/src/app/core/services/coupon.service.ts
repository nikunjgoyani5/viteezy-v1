import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class CouponService {

  constructor(private http: HttpClient) { }

  public getCouponCode(couponCode: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/coupon/${couponCode}`);
  }
}

angular.module('core.coupon', [])
  .factory('coupon', downgradeInjectable(CouponService));