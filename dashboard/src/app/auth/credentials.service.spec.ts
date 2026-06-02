import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CredentialsService, Credentials } from './credentials.service';

const credentialsKey = 'credentials';

describe('CredentialsService', () => {
  let credentialsService: CredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CredentialsService],
    });

    credentialsService = TestBed.inject(CredentialsService);
  });

  afterEach(() => {
    // Cleanup
    localStorage.removeItem(credentialsKey);
    sessionStorage.removeItem(credentialsKey);
  });

  describe('setCredentials', () => {
    it('should authenticate user if credentials are set', () => {
      // Act
      credentialsService.setCredentials({
        accessToken: '123',
        tokenType: 'Bearer',
        userId: 1,
      });

      // Assert
      expect(credentialsService.isAuthenticated()).toBe(true);
      expect((credentialsService.credentials as Credentials).accessToken).toBe(
        '123'
      );
    });

    it('should clean authentication', () => {
      // Act
      credentialsService.setCredentials();

      // Assert
      expect(credentialsService.isAuthenticated()).toBe(false);
    });

    it('should persist credentials for the session', () => {
      // Act
      credentialsService.setCredentials({
        accessToken: '123',
        tokenType: 'Bearer',
        userId: 1,
      });

      // Assert
      expect(sessionStorage.getItem(credentialsKey)).not.toBeNull();
      expect(localStorage.getItem(credentialsKey)).toBeNull();
    });

    it('should persist credentials across sessions', () => {
      // Act
      credentialsService.setCredentials(
        {
          accessToken: '123',
          tokenType: 'Bearer',
          userId: 1,
        },
        true
      );

      // Assert
      expect(localStorage.getItem(credentialsKey)).not.toBeNull();
      expect(sessionStorage.getItem(credentialsKey)).toBeNull();
    });

    it('should clear user authentication', () => {
      // Act
      credentialsService.setCredentials();

      // Assert
      expect(credentialsService.isAuthenticated()).toBe(false);
      expect(credentialsService.credentials).toBeNull();
      expect(sessionStorage.getItem(credentialsKey)).toBeNull();
      expect(localStorage.getItem(credentialsKey)).toBeNull();
    });
  });
});
