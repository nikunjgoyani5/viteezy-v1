import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '@env/environment';

import { Credentials, CredentialsService } from './credentials.service';
import { switchMap } from 'rxjs/operators';

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

export interface User {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  creationDate: Date;
}

const userdetailsKey = 'userdetails';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _userDetails: User | null = null;

  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient
  ) {
    const savedCredentials =
      sessionStorage.getItem(userdetailsKey) ||
      localStorage.getItem(userdetailsKey);
    if (savedCredentials) {
      this._userDetails = JSON.parse(savedCredentials);
    }
  }
  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  public login(context: LoginContext): Observable<User> {
    return this.credentialsService
      .getToken(context.email, context.password)
      .pipe(
        switchMap((credentials) => {
          this.credentialsService.setCredentials(credentials, context.remember);
          return this.retrieveUserInformation(credentials);
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  public logout(): Observable<boolean> {
    this.credentialsService.setCredentials();
    this.setUser();
    return of(true);
  }

  public setUser(user?: User, remember?: boolean): void {
    this._userDetails = user || null;

    if (user) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(userdetailsKey, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(userdetailsKey);
      localStorage.removeItem(userdetailsKey);
    }
  }

  /**
   * Gets the user details.
   * @return The user details
   */
  get userDetails(): User | null {
    return this._userDetails;
  }

  private retrieveUserInformation(credentials: Credentials): Observable<User> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${credentials.tokenType} ${credentials.accessToken}`,
    };
    return this.http.get<User>(
      `${environment.serverUrl}/users/${credentials.userId}`,
      { headers }
    );
  }
}
