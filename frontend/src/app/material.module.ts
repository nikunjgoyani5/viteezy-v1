import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  exports: [
    MatDialogModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatRadioModule
  ]
})
export class MaterialModule { }
