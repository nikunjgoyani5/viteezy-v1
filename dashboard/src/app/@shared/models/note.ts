import { IEntity } from './entity';

export class Note implements IEntity {
  public id: number;
  public fromId: number;
  public customerId: string;
  public message: string;
  public creationTimestamp: Date;
  public modificationTimestamp: Date;
  public name?: string;
  public entityName = 'Note';
  public constructor(init?: Partial<Note>) {
    Object.assign(this, init);
  }
}
