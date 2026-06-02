import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@core';
import { AuthenticationService } from '@app/auth';
import { UserRole } from '@app/@shared/models/user-role';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) public sidenav!: MatSidenav;
  public isAdmin: boolean = false;

  constructor(
    private media: MediaObserver,
    private authenticationService: AuthenticationService
  ) {}

  public ngOnInit(): void {
    // Automatically close side menu on screens > sm breakpoint
    this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) =>
          changes.some(
            (change) => change.mqAlias !== 'xs' && change.mqAlias !== 'sm'
          )
        ),
        untilDestroyed(this)
      )
      .subscribe(() => this.sidenav.close());
    this.isAdmin =
      this.authenticationService.userDetails?.role === UserRole.ADMIN;
  }
}
