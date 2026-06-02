import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostNLService {
  constructor(private http: HttpClient) { }
  
  public getLatestTrackTrace(customerExternalReference: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/order/track-and-trace/${customerExternalReference}`);
  }

  public checkAddress(body: any): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/postnl/check-address`, body);
  }

}

angular.module('core.postnl', [])
  .factory('postnl', downgradeInjectable(PostNLService));