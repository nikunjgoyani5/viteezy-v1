import { IEntity } from './entity';

export class Order implements IEntity {
  public id: number;
  public externalReference: string;
  public orderNumber: string;
  public paymentId: number;
  public sequenceType: string;
  public paymentPlanId: number;
  public blendId: number;
  public customerId: number;
  public recurringMonths: number;
  public shipToFirstName: string;
  public shipToLastName: string;
  public shipToStreet: string;
  public shipToHouseNo: string;
  public shipToAnnex: string;
  public shipToPostalCode: string;
  public shipToCity: string;
  public shipToCountryCode: string;
  public shipToPhone: string;
  public shipToEmail: string;
  public referralCode: string;
  public trackTraceCode: string;
  public pharmacistOrderNumber: string;
  public status: string;
  public created: Date;
  public shipped: Date;
  public lastModified: Date;
  public address?: String;
  public translatedStatus?: string;
  public blendLink?: string;
  public entityName = 'Order';
  public constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
