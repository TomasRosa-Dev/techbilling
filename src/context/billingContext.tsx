'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import billingData from '../jsons/billing.json';
import requirementsData from '../jsons/requirements.json';
import { 
  MonthlyRev, 
  AnnualRev, 
  BillingData 
} from '../types/billing';
import { Requirement } from '../types/requirement';

const typedBillingData = billingData as BillingData;
interface BillingContextType {
  monthlyRevenue: MonthlyRev[];
  annualRevenue: AnnualRev[];
  invoicesCount: number;
  activeClients: number;
  requirements: Requirement[];
  toggleRequirement: (id: number) => void;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider = ({ children }: { children: ReactNode }) => {
  const [requirements, setRequirements] = useState<Requirement[]>(
    requirementsData.map(r => ({ ...r, done: false }))
  );

  const toggleRequirement = (id: number) => {
    setRequirements(rs =>
      rs.map(r => r.id === id ? { ...r, done: !r.done } : r)
    );
  };

  return (
    <BillingContext.Provider value={{
      monthlyRevenue: typedBillingData.monthlyRevenue,
      annualRevenue: typedBillingData.annualRevenue,
      invoicesCount: typedBillingData.invoicesCount,
      activeClients: typedBillingData.activeClients,
      requirements,
      toggleRequirement
    }}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const ctx = useContext(BillingContext);
  if (!ctx) throw new Error('useBilling must be used within BillingProvider');
  return ctx;
};
