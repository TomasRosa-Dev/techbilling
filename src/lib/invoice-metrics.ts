import { Invoice } from "@/types/invoice";
import { Metric } from "@/types/metrics";

export const calculateInvoiceTotal = (invoice: Invoice): number => {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const discountAmount = (subtotal * invoice.discount) / 100;
  const discountedSubtotal = subtotal - discountAmount;
  const vatAmount = (discountedSubtotal * invoice.vatRate) / 100;
  return discountedSubtotal + vatAmount;
};

export const calculateInvoiceMetrics = (invoices: Invoice[]): Metric[] => {
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');
  
  const totalRevenue = paidInvoices.reduce((sum, invoice) => sum + calculateInvoiceTotal(invoice), 0);
  const pendingAmount = pendingInvoices.reduce((sum, invoice) => sum + calculateInvoiceTotal(invoice), 0);
  const overdueAmount = overdueInvoices.reduce((sum, invoice) => sum + calculateInvoiceTotal(invoice), 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthInvoices = paidInvoices.filter(invoice => {
    const invoiceDate = new Date(invoice.date);
    return invoiceDate.getFullYear() === currentYear && invoiceDate.getMonth() === currentMonth;
  });
  const monthlyRevenue = currentMonthInvoices.reduce((sum, invoice) => sum + calculateInvoiceTotal(invoice), 0);
  
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const previousMonthInvoices = paidInvoices.filter(invoice => {
    const invoiceDate = new Date(invoice.date);
    return invoiceDate.getFullYear() === previousYear && invoiceDate.getMonth() === previousMonth;
  });
  const previousMonthRevenue = previousMonthInvoices.reduce((sum, invoice) => sum + calculateInvoiceTotal(invoice), 0);
  
  const monthlyTrend = previousMonthRevenue > 0 
    ? Math.round(((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) * 100)
    : 0;
  
  return [
    {
      id: "total-invoices",
      title: "Total de Faturas",
      value: totalInvoices.toString(),
      description: "Faturas criadas",
      icon: "FileText",
      trend: totalInvoices > 0 ? {
        type: "positive",
        value: `${paidInvoices.length}`,
        description: "pagas"
      } : undefined
    },
    {
      id: "revenue",
      title: "Receita Total",
      value: `€${totalRevenue.toFixed(2)}`,
      description: "Faturas pagas",
      icon: "DollarSign",
      trend: monthlyTrend !== 0 ? {
        type: monthlyTrend > 0 ? "positive" : "negative",
        value: `${monthlyTrend > 0 ? '+' : ''}${monthlyTrend}%`,
        description: "do mês passado"
      } : undefined
    },
    {
      id: "pending",
      title: "Pendentes",
      value: `€${pendingAmount.toFixed(2)}`,
      description: `${pendingInvoices.length} faturas`,
      icon: "Clock",
      variant: pendingInvoices.length > 0 ? "info" : "default"
    },
    {
      id: "overdue",
      title: "Em Atraso",
      value: `€${overdueAmount.toFixed(2)}`,
      description: `${overdueInvoices.length} faturas`,
      icon: "AlertTriangle",
      variant: overdueInvoices.length > 0 ? "warning" : "default"
    }
  ];
};

export const generateChartData = (invoices: Invoice[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  
  return months.map((month, index) => {
    const monthInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate.getFullYear() === currentYear && 
             invoiceDate.getMonth() === index && 
             invoice.status === 'paid';
    });
    
    const totalRevenue = monthInvoices.reduce((sum, invoice) => sum + calculateInvoiceTotal(invoice), 0);
    
    return {
      month,
      value: Math.round(totalRevenue)
    };
  });
};

export const getStatusStyle = (status: Invoice['status']) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export const getStatusText = (status: Invoice['status']) => {
  switch (status) {
    case 'paid':
      return 'Pago';
    case 'pending':
      return 'Pendente';
    case 'overdue':
      return 'Em Atraso';
    default:
      return 'Desconhecido';
  }
}; 