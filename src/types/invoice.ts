export type LineItem = { desc: string; qty: number; price: number };

export interface InvoiceContextType {
  customer: string;
  customerEmail: string;
  customerAddress: string;
  date: string;
  items: LineItem[];
  vatRate: number;
  discount: number;
  savedInvoices: Invoice[];
  setCustomer: (name: string) => void;
  setCustomerEmail: (email: string) => void;
  setCustomerAddress: (address: string) => void;
  setDate: (date: string) => void;
  setVatRate: (rate: number) => void;
  setDiscount: (discount: number) => void;
  addItem: () => void;
  updateItem: (index: number, item: Partial<LineItem>) => void;
  removeItem: (index: number) => void;
  saveCurrentInvoice: (status: Invoice['status']) => void;
  loadInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  clearForm: () => void;
}

export interface Invoice {
  id: string;
  customer: string;
  customerEmail: string;
  customerAddress: string;
  date: string;
  items: LineItem[];
  vatRate: number;
  discount: number;
  status: 'paid' | 'pending' | 'overdue';
}

export interface InvoiceFormData {
  customer: string;
  customerEmail: string;
  customerAddress: string;
  date: string;
  items: LineItem[];
  vatRate: number;
  discount: number;
} 