import { Observable } from 'rxjs';

export class Action {
  public label = '';
  public tooltip?: string;
  public icon?: string;
  public guard?: (input: any) => boolean;
  public onClick?: (input: any) => any | Observable<any>;
  public constructor(init?: Partial<Action>) {
    Object.assign(this, init);
  }
}
