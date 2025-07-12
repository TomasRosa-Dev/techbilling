'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { LineItem, InvoiceContextType } from '../types/invoice';

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<LineItem[]>([]);

  const addItem = useCallback(() =>
    setItems(prev => [...prev, { desc: '', qty: 1, price: 0 }]), []);

  const updateItem = useCallback((index: number, update: Partial<LineItem>) => {
    setItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, ...update } : item))
    );
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSetCustomer = useCallback((name: string) => {
    setCustomer(name);
  }, []);

  const handleSetDate = useCallback((date: string) => {
    setDate(date);
  }, []);

  return (
    <InvoiceContext.Provider value={{
      customer,
      date,
      items,
      setCustomer: handleSetCustomer,
      setDate: handleSetDate,
      addItem,
      updateItem,
      removeItem
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const ctx = useContext(InvoiceContext);
  if (!ctx) throw new Error('useInvoice must be used within InvoiceProvider');
  return ctx;
};
