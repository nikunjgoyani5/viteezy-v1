import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Credentials } from './credentials.service';

export class MockCredentialsService {
  public credentials: Credentials | null = {
    userId: 1,
    accessToken: '123',
    tokenType: 'Bearer',
  };

  public isAuthenticated(): boolean {
    return !!this.credentials;
  }

  public setCredentials(credentials?: Credentials, _remember?: boolean): void {
    this.credentials = credentials || null;
  }

  public getToken(email: string, password: string): Observable<Credentials> {
    return of({
      userId: 1,
      accessToken: '123',
      tokenType: 'Bearer',
    });
  }
}
