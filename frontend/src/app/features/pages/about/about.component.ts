import * as angular from 'angular';
import { Component } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}

angular.
  module('about', [])
    .directive('about', downgradeComponent({component: AboutComponent}) as angular.IDirectiveFactory);