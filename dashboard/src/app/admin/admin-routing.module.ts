import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'admin',
      component: AdminComponent,
      data: { title: marker('Admin') },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CustomerRoutingModule {}
