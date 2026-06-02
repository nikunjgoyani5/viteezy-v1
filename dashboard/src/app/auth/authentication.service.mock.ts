import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { Credentials } from './credentials.service';

export class MockAuthenticationService {
  public credentials: Credentials | null = {
    accessToken: '123',
    tokenType: 'Bearer',
    userId: 1,
  };

  public login(context: LoginContext): Observable<Credentials> {
    return of({
      accessToken: '123',
      tokenType: 'Bearer',
      userId: 1,
    });
  }

  public logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }
}
