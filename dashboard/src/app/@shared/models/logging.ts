import { IEntity } from './entity';

export class Logging implements IEntity {
  public id: number;
  public customerId: number;
  public event: string;
  public info: string;
  public creationTimestamp: Date;
  public entityName = 'Logging';
  public constructor(init?: Partial<Logging>) {
    Object.assign(this, init);
  }
}
