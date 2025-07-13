'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { BillingProvider } from '@/context/billingContext';
import { InvoiceProvider } from '@/context/invoiceContext';
import { SidebarProvider } from '@/components/ui/sidebar';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BillingProvider>
        <InvoiceProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </InvoiceProvider>
      </BillingProvider>
    </ThemeProvider>
  );
}
