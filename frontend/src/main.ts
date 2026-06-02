import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as angular from 'angular';
import { setAngularJSGlobal } from '@angular/upgrade/static';

import { AppModule } from './app/app.module';
import './app/core/utils/ga4-tracking';

import ajsApp from './app/app.module.ajs';
import states from './app/app.config.ajs';

states(ajsApp);

setAngularJSGlobal(angular);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
