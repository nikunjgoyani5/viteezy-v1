import {
  CUSTOM_ELEMENTS_SCHEMA,
  LOCALE_ID,
  NgModule,
  Type,
} from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { TableComponent } from './table/table.component';
import { CrudComponent } from './crud/crud.component';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { AccountInfoComponent } from './account-info/account-info.component';
import { HeaderIconComponent } from './header-icon/header-icon.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import {
  DynamicFormControl,
  DynamicFormControlModel,
  DYNAMIC_FORM_CONTROL_MAP_FN,
} from '@ng-dynamic-forms/core';
import { DATE_TIME_PICKER_ENTITY_MODEL } from './date-time-picker/date-time-picker-model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
  NGX_MAT_DATE_FORMATS,
} from '@angular-material-components/datetime-picker';
import { ViewPropertyComponent } from './view-property/view-property.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsMaterialUIModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  declarations: [
    LoaderComponent,
    TableComponent,
    CrudComponent,
    ActionButtonsComponent,
    AccountInfoComponent,
    HeaderIconComponent,
    ViewPropertyComponent,
    DateTimePickerComponent,
  ],
  exports: [
    LoaderComponent,
    TableComponent,
    CrudComponent,
    ActionButtonsComponent,
    AccountInfoComponent,
    HeaderIconComponent,
    ViewPropertyComponent,
  ],
  providers: [
    {
      provide: DYNAMIC_FORM_CONTROL_MAP_FN,
      useValue: (
        model: DynamicFormControlModel
      ): Type<DynamicFormControl> | null => {
        switch (model.type) {
          case DATE_TIME_PICKER_ENTITY_MODEL:
            return DateTimePickerComponent;
        }
      },
    },
  ],
})
export class SharedModule {}
