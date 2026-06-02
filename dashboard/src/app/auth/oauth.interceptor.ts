import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from './credentials.service';

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with oauth token if available
    const currentToken = this.credentialsService.credentials;
    if (this.credentialsService.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentToken.tokenType} ${currentToken.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
    }
    return next.handle(request);
  }
}
