import { Action } from './action';
import { IEntity } from './entity';

export interface ActionEvent {
  rowIndex: number;
  action: Action;
  entity: IEntity;
}
