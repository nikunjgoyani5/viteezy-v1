import { ModelConfig } from './model-config';

export class DropDownModelConfig extends ModelConfig {
  public multiple: boolean;
  public options: Array<{ label: string; value: any }>;
  public constructor(init?: Partial<DropDownModelConfig>) {
    super();
    Object.assign(this, init);
  }
}
