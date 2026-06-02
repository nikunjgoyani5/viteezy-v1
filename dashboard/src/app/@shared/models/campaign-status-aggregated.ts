export interface CampaignStatusAggregated {
  campaignSent: number;
  smsEnroute: number;
  smsDelivered: number;
  smsExpired: number;
  smsRejected: number;
  smsUndelivered: number;
}
