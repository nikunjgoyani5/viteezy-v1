import { IEntity } from './entity';

export class Blend implements IEntity {
  public id: number;
  public status: string;
  public externalReference: string;
  public customerId: number;
  public quizId: number;
  public creationTimestamp: Date;
  public modificationTimestamp: Date;
  public entityName = 'Blend';
  public constructor(init?: Partial<Blend>) {
    Object.assign(this, init);
  }
}
