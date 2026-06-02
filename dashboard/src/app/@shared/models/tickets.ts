import { Lot } from './lot';

export interface Ticket {
  id: number;
  drawId: number;
  phoneId: number;
  transactionId: number;
  ticketTypeId: number;
  creationTimestamp: Date;
  lastModificationTimestamp: Date;
  lotNumber: Lot;
}

export interface TicketWithFullLotNumber extends Ticket {
  fullLotNumber: string;
}
