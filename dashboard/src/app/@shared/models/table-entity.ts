import { Action } from './action';
import { IEntity } from './entity';

export interface TableEntity {
  entity: IEntity;
  properties: { [name: string]: { value?: any; actions?: Action[] } };
}
