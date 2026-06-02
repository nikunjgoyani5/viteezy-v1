import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

const headers = {
  'Content-Type': 'application/json', 
  Authorization: `Bearer ${environment.apiToken}`,
};

@Injectable()
export class StrapiService {

  constructor(private http: HttpClient) { }

  public getProductPage(id: number): Observable<any> {
    return this.http.get<any>(`/strapi/api/productpages/${id}?populate=deep`, { headers });
  }

  public getProductPages(): Observable<any> {
    return this.http.get<any>(`/strapi/api/productpages?populate=deep`, { headers });
  }

  public getReviews(): Observable<any> {
    return this.http.get<any>(`/strapi/api/reviews?populate=reviews.image`, { headers });
  }
}

angular.module('core.strapi', [])
  .factory('strapi', downgradeInjectable(StrapiService));