import { ViewPropertyRule } from './view-property-rule';

export class ViewProperty {
  public value: any;
  public type: string;
  public description: string;
  public showlabel: boolean;
  public label: string;
  public style?: ViewPropertyRule[];
  public constructor(init?: Partial<ViewProperty>) {
    Object.assign(this, init);
  }
}
