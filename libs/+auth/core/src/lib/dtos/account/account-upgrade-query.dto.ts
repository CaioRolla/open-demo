export interface AccountUpgradeQueryDto {
  accountId: string;
  plan: string;
  planType: string;
  coupon: string | null;
}
