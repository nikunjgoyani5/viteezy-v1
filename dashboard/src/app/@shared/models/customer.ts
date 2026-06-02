import { IEntity } from './entity';

export class Customer implements IEntity {
  public id: number;
  public email: string;
  public externalReference: string;
  public firstName: string;
  public lastName: string;
  public street: string;
  public houseNumber: number;
  public houseNumberAddition: string;
  public postcode: string;
  public city: string;
  public country: string;
  public phoneNumber: string;
  public referralCode: string;
  public domainLink?: string;
  public entityName = 'Customer';
  public constructor(init?: Partial<Customer>) {
    Object.assign(this, init);
  }
}
