export type LineItem = { desc: string; qty: number; price: number };

export interface InvoiceContextType {
  customer: string;
  date: string;
  items: LineItem[];
  setCustomer: (name: string) => void;
  setDate: (date: string) => void;
  addItem: () => void;
  updateItem: (index: number, item: Partial<LineItem>) => void;
  removeItem: (index: number) => void;
} 