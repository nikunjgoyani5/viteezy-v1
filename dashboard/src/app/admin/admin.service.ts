import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Ingredient } from '@app/@shared/models/ingredient';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public getOrdersPackingSlipReady(): Observable<number> {
    return this.http.get<number>(`${environment.serverUrl}/pharmacist-request/orders`);
  }

  public createPharmacistRequest(): Observable<null> {
    return this.http.post<null>(`${environment.serverUrl}/pharmacist-request/create`, {});
  }

  public getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${environment.serverUrl}/ingredients`);
  }

  public createIngredient(ingredientPostRequest: Ingredient): Observable<Ingredient> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.post<Ingredient>(`${environment.serverUrl}/ingredient`, ingredientPostRequest, {
      headers
    });
  }
}
