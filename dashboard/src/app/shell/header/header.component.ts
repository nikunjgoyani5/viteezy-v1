import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthenticationService, CredentialsService, User } from '@app/auth';
import { UserRole } from '@app/@shared/models/user-role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public sidenav!: MatSidenav;

  public userdetails: User;
  public isAdmin: boolean = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.userdetails = this.authenticationService.userDetails;
    this.isAdmin =
      this.authenticationService.userDetails?.role === UserRole.ADMIN;
  }

  public onLogoutClick(): void {
    this.authenticationService
      .logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  public onChangePasswordClick(): void {
    console.log('Implement password change');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
