import { Injectable } from '@angular/core';
import { DateTimePickerEntityModel } from '@app/@shared/date-time-picker/date-time-picker-model';
import { DropDownModelConfig } from '@app/@shared/models/dropdown-model-config';
import { IEntity } from '@app/@shared/models/entity';
import { PropertyDefinition } from '@app/@shared/models/property-definition';
import {
  DynamicDatePickerModel,
  DynamicFormControlModel,
  DynamicInputModel,
  DynamicSelectModel,
  DynamicSwitchModel,
  DynamicTextAreaModel,
} from '@ng-dynamic-forms/core';

@Injectable({ providedIn: 'root' })
export class DynamicModelGeneratorService {
  public generateFromPropertyDefinitions(
    entity: IEntity,
    properties: PropertyDefinition[],
    readonly: boolean
  ): DynamicFormControlModel[] {
    return properties.map((property) =>
      this.createInputByType(entity, property, readonly)
    );
  }

  public generateOptions(
    entities: IEntity[],
    valuePropertyName: string,
    displayPropertyName: string
  ): Array<{ label: string; value: any }> {
    return entities.map((entity) => ({
      label: (entity as any)[displayPropertyName],
      value: (entity as any)[valuePropertyName],
    }));
  }

  private createInputByType(
    entity: IEntity,
    property: PropertyDefinition,
    readonly: boolean
  ): DynamicFormControlModel {
    const label = property.label ? property.label : property.displayName;
    const propertyValue = entity !== null ? (entity as any)[property.propertyName] : null;
    const propertyType = (property.propertyType as string).toLowerCase();
    const readOnly = readonly || property.readonly;
    const controlConfigBase: any = {
      id: property.propertyName,
      autoFocus: false,
      hidden: property.hidden,
      readOnly,
      placeholder: label,
      value: propertyValue,
    };
    switch (propertyType) {
      case 'boolean': {
        const switchModel = new DynamicSwitchModel({
          ...controlConfigBase,
          offLabel: label,
          onLabel: label,
          value: !!propertyValue,
          disabled: property.readonly,
        });
        return switchModel;
      }
      case 'date':
        return new DateTimePickerEntityModel({
          ...controlConfigBase,
        });
      case 'dropdown': {
        const config = property.propertyConfig as DropDownModelConfig;
        return new DynamicSelectModel<any>({
          id: property.propertyName,
          hidden: property.hidden,
          placeholder: property.label ? property.label : property.displayName,
          label: property.label ? property.label : property.displayName,
          value: entity !== null ? (entity as any)[property.propertyName] : null,
          disabled: readOnly,
          options: config.options,
          multiple: config.multiple,
        });
      }
      case 'number':
      case 'double':
      case 'decimal':
        return new DynamicInputModel({
          ...controlConfigBase,
          inputType: 'number',
        });
      case 'textarea':
        return new DynamicTextAreaModel({
          maxLength: 1000,
          ...controlConfigBase,
        });
      case 'string':
      default:
        return new DynamicInputModel({
          ...controlConfigBase,
        });
    }
  }
}
