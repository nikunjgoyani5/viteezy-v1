import * as angular from 'angular';
import { Component } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'terms',
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {}

angular.
  module('terms', [])
    .directive('terms', downgradeComponent({component: TermsComponent}) as angular.IDirectiveFactory);