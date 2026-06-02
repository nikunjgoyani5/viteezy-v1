import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '@app/@shared/models/user';
import { Customer } from '@app/@shared/models/customer';
import { Note } from '@app/@shared/models/note';
import { Logging } from '@app/@shared/models/logging';
import { PaymentPlan } from '@app/@shared/models/payment-plan';
import { Payment } from '@app/@shared/models/payment';
import { Order } from '@app/@shared/models/order';
import { Blend } from '@app/@shared/models/blend';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.serverUrl}/users/all`);
  }

  public getByExternalReference(customerExternalReference: string): Observable<Customer> {
    return this.http.get<Customer>(`${environment.serverUrl}/customer/${customerExternalReference}`);
  }

  public getByEmail(email: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.serverUrl}/customer/email/${email}`);
  }

  public getByPhoneNumber(phoneNumber: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.serverUrl}/customer/phone-number/${phoneNumber}`);
  }

  public getByPostcode(postcode: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.serverUrl}/customer/postcode/${postcode}`);
  }

  public getByName(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.serverUrl}/customer/name/${name}`);
  }

  public getNotesByCustomerExternalReference(customerExternalReference: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.serverUrl}/notes/customer/${customerExternalReference}`);
  }

  public getLoggingByCustomerExternalReference(customerExternalReference: string): Observable<Logging[]> {
    return this.http.get<Logging[]>(`${environment.serverUrl}/logging/customer/${customerExternalReference}`);
  }

  public getPaymentPlanByCustomerExternalReference(customerExternalReference: string): Observable<PaymentPlan[]> {
    return this.http.get<PaymentPlan[]>(`${environment.serverUrl}/payment-plans/customer/${customerExternalReference}`);
  }

  public updatePaymentPlanStatus(paymentPlanPatchRequest: PaymentPlan): Observable<PaymentPlan> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.patch<PaymentPlan>(`${environment.serverUrl}/payment-plan/change-status`, paymentPlanPatchRequest, {
      headers,
    });
  }

  public cancelPaymentPlan(paymentPlanExternalReference: string, stopReason: string): Observable<null> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        stopReason: stopReason
      },
    };
    
    return this.http.delete<null>(`${environment.serverUrl}/payment-plan/${paymentPlanExternalReference}`, options);
  }

  public applyCouponCode(paymentPlanExternalReference: string, couponCode: string): Observable<PaymentPlan> {
    return this.http.patch<PaymentPlan>(`${environment.serverUrl}/payment-plan/${paymentPlanExternalReference}/coupon/${couponCode}`, {});
  }

  public getPaymentsByCustomerExternalReference(customerExternalReference: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.serverUrl}/payments/customer/${customerExternalReference}`);
  }

  public getBlendsByCustomerExternalReference(customerExternalReference: string): Observable<Blend[]> {
    return this.http.get<Blend[]>(`${environment.serverUrl}/blends/customer/${customerExternalReference}`);
  }

  public getOrdersByCustomerExternalReference(customerExternalReference: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.serverUrl}/orders/customer/${customerExternalReference}`);
  }

  public createDuplicateOrder(orderExternalReference: string): Observable<Order> {
    return this.http.post<Order>(`${environment.serverUrl}/orders/duplicate/${orderExternalReference}`, {});
  }

  public cancelOrder(orderExternalReference: string): Observable<Order> {
    return this.http.post<Order>(`${environment.serverUrl}/orders/cancel/${orderExternalReference}`, {});
  }

  public patch(customerExternalReference: string, customerPatchRequest: Customer): Observable<Customer> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.patch<Customer>(`${environment.serverUrl}/customer/${customerExternalReference}`, customerPatchRequest, {
      headers,
    });
  }

  public patchPayment(paymentPatchRequest: Payment): Observable<Payment> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.patch<Payment>(`${environment.serverUrl}/payments/change-status`, paymentPatchRequest, {
      headers,
    });
  }

  public createNote(customerExternalReference: string, notePostRequest: Note): Observable<Note> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.post<Note>(`${environment.serverUrl}/notes/customer/${customerExternalReference}`, notePostRequest, {
      headers,
    });
  }

  public editNote(noteId: number, notePatchRequest: Note): Observable<Note> {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.http.patch<Note>(`${environment.serverUrl}/notes/${noteId}`, notePatchRequest, {
      headers,
    });
  }

  public deleteNote(noteId: number): Observable<null> {
    return this.http.delete<null>(`${environment.serverUrl}/notes/${noteId}`);
  }
}
