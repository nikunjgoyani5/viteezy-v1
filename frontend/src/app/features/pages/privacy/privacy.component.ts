import * as angular from 'angular';
import { Component } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'privacy',
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {}

angular.
  module('privacy', [])
    .directive('privacy', downgradeComponent({component: PrivacyComponent}) as angular.IDirectiveFactory);
