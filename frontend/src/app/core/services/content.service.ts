import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContentService {

  constructor(private http: HttpClient) { }

  public getByCode(code: string): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/content/${code}`);
  }
}

angular.module('core.content', [])
  .factory('content', downgradeInjectable(ContentService));