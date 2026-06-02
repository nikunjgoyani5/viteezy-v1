import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/customers', pathMatch: 'full' },
    {
      path: 'customers',
      component: CustomerComponent,
      data: { title: marker('Klanten') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CustomerRoutingModule {}
