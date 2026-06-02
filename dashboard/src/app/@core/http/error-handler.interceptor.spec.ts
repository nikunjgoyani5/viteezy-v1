import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { AuthenticationService } from '@app/auth/authentication.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorHandlerInterceptor', () => {
  let errorHandlerInterceptor: ErrorHandlerInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authMock: AuthenticationService;
  let routerMock: Router;

  function createInterceptor(): ErrorHandlerInterceptor {
    errorHandlerInterceptor = new ErrorHandlerInterceptor(authMock, routerMock);
    return errorHandlerInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: createInterceptor,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
    authMock = TestBed.inject(
      AuthenticationService as Type<AuthenticationService>
    );
    routerMock = TestBed.inject(Router as Type<Router>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should catch error and call error handler', () => {
    // Arrange
    // Note: here we spy on private method since target is customization here,
    // but you should replace it by actual behavior in your app
    spyOn(
      ErrorHandlerInterceptor.prototype as any,
      'errorHandler'
    ).and.callThrough();

    // Act
    http.get('/toto').subscribe(
      () => fail('should error'),
      () => {
        // Assert
        expect(
          (ErrorHandlerInterceptor.prototype as any).errorHandler
        ).toHaveBeenCalled();
      }
    );

    httpMock.expectOne({}).flush(null, {
      status: 404,
      statusText: 'error',
    });
  });
});
