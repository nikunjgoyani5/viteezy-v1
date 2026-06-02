import { IEntity } from './entity';

export class Payment implements IEntity {
  public id: number;
  public amount: number;
  public molliePaymentId: string;
  public retriedMolliePaymentId: string;
  public paymentPlanId: number;
  public creationDate: Date;
  public paymentDate: string;
  public lastModified: Date;
  public status: string;
  public reason: string;
  public sequenceType: string;
  
  public entityName = 'Payment';
  public constructor(init?: Partial<Payment>) {
    Object.assign(this, init);
  }
}
