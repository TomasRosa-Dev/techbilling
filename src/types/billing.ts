export type MonthlyRev = { month: string; value: number };
export type AnnualRev = { year: number; value: number };

export type BillingData = {
  monthlyRevenue: MonthlyRev[];
  annualRevenue: AnnualRev[];
  invoicesCount: number;
  activeClients: number;
}; 