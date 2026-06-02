import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }
  
  public sendMagicLink(email: string): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/login?email=${email}`, {});
  }

}

angular.module('core.login', [])
  .factory('login', downgradeInjectable(LoginService));