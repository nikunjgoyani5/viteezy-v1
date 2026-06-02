import {
  DynamicFormControlLayout,
  DynamicInputModel,
  DynamicInputModelConfig,
} from '@ng-dynamic-forms/core';

export const DATE_TIME_PICKER_ENTITY_MODEL = 'DATE_TIME_PICKER_ENTITY_MODEl';

export interface DateTimePickerEntityModelConfig
  extends DynamicInputModelConfig {
  name: string;
}

export class DateTimePickerEntityModel extends DynamicInputModel {
  public name: string;
  public readonly type: string = DATE_TIME_PICKER_ENTITY_MODEL;

  public constructor(
    config: DateTimePickerEntityModelConfig,
    layout?: DynamicFormControlLayout | null
  ) {
    super(config, layout);
    this.name = name;
  }
}
