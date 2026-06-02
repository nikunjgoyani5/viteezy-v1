import { Action } from './action';
import { ModelConfig } from './model-config';

export class PropertyDefinition {
  public propertyName: string;
  public displayName: string;
  public toolTip?: string;
  public propertyType: string;
  public htmlType?: string = "text";
  public propertyConfig?: ModelConfig;
  public label?: string;
  public hiddenTable?: Boolean = false;
  public hidden?: boolean = false;
  public readonly?: boolean = false;
  public actions?: Action[];
  public getValue?: (o: any) => any;
}
