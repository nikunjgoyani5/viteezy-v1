import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angulartics2Module } from 'angulartics2';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { CustomerRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    Angulartics2Module,
    ReactiveFormsModule,
    CustomerRoutingModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule {}
