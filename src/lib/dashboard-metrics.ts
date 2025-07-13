import { Invoice } from "@/types/invoice";
import { Requirement } from "@/types/requirement";
import { Metric } from "@/types/metrics";

export const calculateInvoiceTotal = (invoice: Invoice): number => {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const discountAmount = (subtotal * invoice.discount) / 100;
  const discountedSubtotal = subtotal - discountAmount;
  const vatAmount = (discountedSubtotal * invoice.vatRate) / 100;
  return discountedSubtotal + vatAmount;
};

export interface DashboardData {
  invoiceMetrics: Metric[];
  requirementsMetrics: Metric[];
  chartData: {
    monthly: { month: string; value: number }[];
    quarterly: { month: string; value: number }[];
    yearly: { month: string; value: number }[];
  };
  recentInvoices: Invoice[];
  totals: {
    totalRevenue: number;
    pendingAmount: number;
    overdueAmount: number;
    totalInvoices: number;
    paidInvoices: number;
    pendingInvoices: number;
    overdueInvoices: number;
  };
}

export const calculateDashboardMetrics = (
  invoices: Invoice[],
  requirements: Requirement[]
): DashboardData => {
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

  const monthlyChartData = generateMonthlyChartData(invoices);
  const quarterlyChartData = generateQuarterlyChartData(monthlyChartData);
  const yearlyChartData = generateYearlyChartData(paidInvoices);

  const recentInvoices = invoices
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const completedRequirements = requirements.filter(r => r.status === 'completed').length;
  const totalRequirements = requirements.length;
  const requirementsPercentage = totalRequirements > 0 ? Math.round((completedRequirements / totalRequirements) * 100) : 0;
  
  const now = new Date();
  const next30Days = new Date();
  next30Days.setDate(now.getDate() + 30);
  
  const upcomingDeadlines = requirements.filter(r => {
    if (r.status === 'completed') return false;
    const deadline = new Date(r.deadline);
    return deadline >= now && deadline <= next30Days;
  }).length;
  
  const overdueRequirements = requirements.filter(r => {
    if (r.status === 'completed') return false;
    const deadline = new Date(r.deadline);
    return deadline < now;
  }).length;

  const invoiceMetrics: Metric[] = [
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

  const requirementsMetrics: Metric[] = [
    {
      id: "progress",
      title: "Progresso Geral de Compliance",
      value: `${completedRequirements}/${totalRequirements}`,
      icon: "CheckCircle",
      variant: "progress",
      description: ``,
      progress: {
        current: completedRequirements,
        total: totalRequirements,
        percentage: requirementsPercentage
      }
    },
    {
      id: "upcoming",
      title: "Próximos Deadlines",
      value: upcomingDeadlines.toString(),
      icon: "Clock",
      variant: "info",
      description: "Próximos 30 dias"
    },
    {
      id: "overdue",
      title: "Em Atraso",
      value: overdueRequirements.toString(),
      icon: "AlertTriangle",
      variant: overdueRequirements > 0 ? "warning" : "default",
      description: overdueRequirements > 0 ? "Requer atenção imediata" : "Tudo em dia"
    }
  ];

  return {
    invoiceMetrics,
    requirementsMetrics,
    chartData: {
      monthly: monthlyChartData,
      quarterly: quarterlyChartData,
      yearly: yearlyChartData
    },
    recentInvoices,
    totals: {
      totalRevenue,
      pendingAmount,
      overdueAmount,
      totalInvoices,
      paidInvoices: paidInvoices.length,
      pendingInvoices: pendingInvoices.length,
      overdueInvoices: overdueInvoices.length
    }
  };
};

const generateMonthlyChartData = (invoices: Invoice[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const currentYear = now.getFullYear();
  
  const invoiceYears = invoices.map(invoice => new Date(invoice.date).getFullYear());
  const mostRecentYear = Math.max(...invoiceYears);
  const yearToShow = invoiceYears.length > 0 ? mostRecentYear : currentYear;
  
  return months.map((month, index) => {
    const monthInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate.getFullYear() === yearToShow && 
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

const generateQuarterlyChartData = (monthlyData: { month: string; value: number }[]) => {
  return [
    { 
      month: "Q1", 
      value: monthlyData.slice(0, 3).reduce((sum, item) => sum + item.value, 0) 
    },
    { 
      month: "Q2", 
      value: monthlyData.slice(3, 6).reduce((sum, item) => sum + item.value, 0) 
    },
    { 
      month: "Q3", 
      value: monthlyData.slice(6, 9).reduce((sum, item) => sum + item.value, 0) 
    },
    { 
      month: "Q4", 
      value: monthlyData.slice(9, 12).reduce((sum, item) => sum + item.value, 0) 
    }
  ];
};

const generateYearlyChartData = (paidInvoices: Invoice[]) => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear];
  
  return years.map(year => {
    const yearInvoices = paidInvoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate.getFullYear() === year;
    });
    const totalRevenue = yearInvoices.reduce((sum, invoice) => sum + calculateInvoiceTotal(invoice), 0);
    return {
      month: year.toString(),
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