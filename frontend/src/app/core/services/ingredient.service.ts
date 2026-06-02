import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

@Injectable()
export class IngredientService {
  constructor(private http: HttpClient) { }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/ingredients/${id}`);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/ingredients`);
  }

  getIngredientPrices(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/ingredients/prices`);
  }

  getAdditionalProducts(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/ingredients/additional`);
  }
}

angular.module('core.ingredient', [])
  .factory('ingredient', downgradeInjectable(IngredientService));