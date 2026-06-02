import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class BundleService {
  constructor(private http: HttpClient) { }
  
  public getBundles(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/bundle`);
  }

}

angular.module('core.bundle', [])
  .factory('bundle', downgradeInjectable(BundleService));