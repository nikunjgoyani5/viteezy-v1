import * as angular from 'angular';
import { Component, Inject } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

import { Toast, UIRouterState, UserManager } from 'src/app/ajs-upgraded-providers';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public email: string;

  constructor(
    @Inject(UIRouterState) private $state,
    @Inject(Toast) private toast,
    @Inject(UserManager) private UserManager,
    private loginService: LoginService) {}

  public ngOnInit(): void {
    if (this.UserManager.getUserLoggedIn()) {
      this.$state.go("domain");
    } 
  }

  public sendMagicLink = () => {
    this.toast.show("We versturen een mail met inlog link", "info");
    this.loginService.sendMagicLink(this.email).subscribe(() => {
        setTimeout(function () {
          this.toast.show("Er is een e-mail verstuurd met daarin een link om in te loggen.", "info");
        }, 2000);
      },
      (error) => {
        setTimeout(function () {
          this.toast.show("Er is iets misgegaan bij het versturen van de mail", "error");
        }, 3000);
      });
  };
}

angular.
  module('login', [])
    .directive('login', downgradeComponent({component: LoginComponent}) as angular.IDirectiveFactory);
