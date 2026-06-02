export interface Transaction {
  id: number;
  status: string;
  type: string;
  creationTimestamp: Date;
  lastModificationTimestamp: Date;
  externalReference: string;
  distributionId: number;
  phoneId: number;
  amount: number;
}

export interface PendingTransaction {
  id?: number;
  type?: 'CHARGE' | 'REFUND' | 'PAYOUT';
  originReferenceId: string;
  amount: number;
  currency: string;
  msisdn: number;
  userId: number;
  approvedBy?: number;
  distributionChannelId?: number;
  narration: string;
  expirationTimestamp: Date;
  creationTimestamp: Date;
  lastModificationTimestamp: Date;
}
