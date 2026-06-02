import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  DynamicFormControlComponent,
  DynamicFormControlCustomEvent,
  DynamicFormControlLayout,
  DynamicFormLayout,
  DynamicFormLayoutService,
  DynamicFormValidationService,
} from '@ng-dynamic-forms/core';
import { DateTimePickerEntityModel } from './date-time-picker-model';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
  ],
})
export class DateTimePickerComponent
  extends DynamicFormControlComponent
  implements ControlValueAccessor, OnInit {
  public value: any;

  @Input() public bindId: boolean = true;
  @Input() public group: FormGroup;
  @Input() public layout: DynamicFormControlLayout;
  @Input() public model: DateTimePickerEntityModel;

  @Output() public blur: EventEmitter<any> = new EventEmitter();
  @Output() public change: EventEmitter<any> = new EventEmitter();
  @Output()
  public customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
  @Output() public focus: EventEmitter<any> = new EventEmitter();

  @ViewChild('picker') public picker: any;

  constructor(
    protected layoutService: DynamicFormLayoutService,
    protected validationService: DynamicFormValidationService
  ) {
    super(layoutService, validationService);
  }

  public ngOnInit(): void {
    if (this.model.readOnly) {
      this.control.disable();
    }
  }

  public writeValue(obj: any): void {
    //
  }
  public registerOnChange(fn: any): void {
    //
  }
  public registerOnTouched(fn: any): void {
    //
  }
  public setDisabledState?(isDisabled: boolean): void {
    //
  }
}
