'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { LineItem, InvoiceContextType, Invoice } from '../types/invoice';
import invoicesData from '@/jsons/invoices.json';

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<LineItem[]>([{ desc: '', qty: 1, price: 0 }]);
  const [vatRate, setVatRate] = useState(23);
  const [discount, setDiscount] = useState(0);
  const [savedInvoices, setSavedInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    setSavedInvoices(invoicesData as Invoice[]);
  }, []);

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

  const handleSetCustomerEmail = useCallback((email: string) => {
    setCustomerEmail(email);
  }, []);

  const handleSetCustomerAddress = useCallback((address: string) => {
    setCustomerAddress(address);
  }, []);

  const handleSetVatRate = useCallback((rate: number) => {
    setVatRate(rate);
  }, []);

  const handleSetDiscount = useCallback((discount: number) => {
    setDiscount(discount);
  }, []);

  const generateInvoiceId = useCallback(() => {
    const year = new Date().getFullYear();
    const existingIds = savedInvoices
      .filter(inv => inv.id.startsWith(`INV-${year}-`))
      .map(inv => parseInt(inv.id.split('-')[2]))
      .sort((a, b) => b - a);
    
    const nextNumber = existingIds.length > 0 ? existingIds[0] + 1 : 1;
    return `INV-${year}-${nextNumber.toString().padStart(3, '0')}`;
  }, [savedInvoices]);

  const clearForm = useCallback(() => {
    setCustomer('');
    setCustomerEmail('');
    setCustomerAddress('');
    setDate(new Date().toISOString().split('T')[0]);
    setItems([{ desc: '', qty: 1, price: 0 }]);
    setVatRate(23);
    setDiscount(0);
  }, []);

  const saveCurrentInvoice = useCallback((status: Invoice['status'] = 'pending') => {
    const newInvoice: Invoice = {
      id: generateInvoiceId(),
      customer,
      customerEmail,
      customerAddress,
      date,
      items: items.filter(item => item.desc.trim() !== ''),
      vatRate,
      discount,
      status
    };

    setSavedInvoices(prev => [newInvoice, ...prev]);
    clearForm();
  }, [customer, customerEmail, customerAddress, date, items, vatRate, discount, generateInvoiceId, clearForm]);

  const loadInvoice = useCallback((invoice: Invoice) => {
    setCustomer(invoice.customer);
    setCustomerEmail(invoice.customerEmail);
    setCustomerAddress(invoice.customerAddress);
    setDate(invoice.date);
    setItems(invoice.items);
    setVatRate(invoice.vatRate);
    setDiscount(invoice.discount);
  }, []);

  const deleteInvoice = useCallback((id: string) => {
    setSavedInvoices(prev => prev.filter(inv => inv.id !== id));
  }, []);

  return (
    <InvoiceContext.Provider value={{
      customer,
      customerEmail,
      customerAddress,
      date,
      items,
      vatRate,
      discount,
      savedInvoices,
      setCustomer: handleSetCustomer,
      setCustomerEmail: handleSetCustomerEmail,
      setCustomerAddress: handleSetCustomerAddress,
      setDate: handleSetDate,
      setVatRate: handleSetVatRate,
      setDiscount: handleSetDiscount,
      addItem,
      updateItem,
      removeItem,
      saveCurrentInvoice,
      loadInvoice,
      deleteInvoice,
      clearForm
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
