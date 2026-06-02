import { IEntity } from './entity';

export class PaymentPlan implements IEntity {
  public id: number;
  public firstAmount: number;
  public recurringAmount: number;
  public recurringMonths: number;
  public customerId: number;
  public blendId: number;
  public externalReference: string;
  public creationDate: Date;
  public lastModified: Date;
  public status: string;
  public paymentDate: Date;
  public stopReason: string;
  public deliveryDate: Date;
  public nextPaymentDate: Date;
  public nextDeliveryDate: Date;
  public translatedStatus?: string;
  public couponCode?: string;
  public entityName = 'PaymentPlan';
  public constructor(init?: Partial<PaymentPlan>) {
    Object.assign(this, init);
  }
}
