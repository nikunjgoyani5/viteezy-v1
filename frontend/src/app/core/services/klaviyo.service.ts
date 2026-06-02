import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';
import { environment } from 'src/environments/environment';

// Extend Window interface to include Klaviyo properties
declare global {
  interface Window {
    _klOnsite?: any;
  }
}

@Injectable()
export class KlaviyoService {

  constructor(private http: HttpClient) { }

  public notifyCheckout(blendExternalReference: string): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/klaviyo/notify-checkout/blend/${blendExternalReference}`, {});
  }

  /**
   * Opens the Klaviyo popup form
   * @param formId - Optional Klaviyo Form ID, defaults to 'UEdVQY'
   */
  public openKlaviyoPopup(formId: string = 'UEdVQY'): void {
    if (window._klOnsite && typeof window._klOnsite.openForm === 'function') {
      window._klOnsite.openForm([formId]);
    } else {
      // Fallback: queue call until Klaviyo is ready
      window._klOnsite = window._klOnsite || [];
      window._klOnsite.push(['openForm', formId]);
    }
  }
}

angular.module('core.klaviyo', [])
  .factory('klaviyo', downgradeInjectable(KlaviyoService));