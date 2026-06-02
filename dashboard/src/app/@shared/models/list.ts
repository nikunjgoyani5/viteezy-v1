import { IEntity } from './entity';

export class List implements IEntity {
  public id: number;
  public description: string;
  public query: number;
  public entityName = 'List';

  public constructor(init?: Partial<List>) {
    Object.assign(this, init);
  }
}
