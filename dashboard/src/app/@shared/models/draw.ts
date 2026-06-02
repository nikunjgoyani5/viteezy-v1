import { IEntity } from './entity';

export class Draw implements IEntity {
  public id: number;
  public type: string;
  public totalPrize: number;
  public initialSignupTimestamp: Date;
  public lastSignupTimestamp: Date;
  public lastSignupMoment: string;
  public lastPaymentTimestamp: Date;
  public performingTimestamp: Date;
  public ticketTypeId: number;
  public mainDraw: boolean;
  public mainDrawId: number;
  public status: DrawStatus;
  public entityName = 'Draw';
  public constructor(init?: Partial<Draw>) {
    Object.assign(this, init);
  }
}

export enum DrawStatus {
  REQUESTED = 'REQUESTED',
  READY = 'READY',
  FAILED = 'FAILED',
  CLOSED = 'CLOSED',
  PURGED = 'PURGED',
}
