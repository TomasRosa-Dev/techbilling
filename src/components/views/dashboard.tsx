"use client"

import { MetricCard } from "@/components/common/MetricCard"
import { RevenueChart } from "./RevenueChart"
import { RecentInvoices } from "./RecentInvoices"
import { useInvoice } from "@/context/invoiceContext"
import { useBilling } from "@/context/billingContext"
import { calculateDashboardMetrics } from "@/lib/dashboard-metrics"
import { Metric } from "@/types/metrics"
import { useMemo } from "react"

const fallbackInvoiceMetrics: Metric[] = [
  {
    id: "totalRevenue",
    title: "Receita Total",
    value: "€ 0,00",
    icon: "DollarSign",
    description: "Faturas pagas",
    trend: {
      type: "positive",
      value: "0%",
      description: "do mês passado"
    }
  },
  {
    id: "totalInvoices", 
    title: "Total de Faturas",
    value: "0",
    icon: "FileText",
    description: "Faturas criadas",
    trend: {
      type: "positive",
      value: "0",
      description: "pagas"
    }
  },
  {
    id: "pendingInvoices",
    title: "Pendentes", 
    value: "€ 0,00",
    icon: "Clock",
    description: "0 faturas",
    variant: "info"
  },
  {
    id: "overdueInvoices",
    title: "Em Atraso",
    value: "€ 0,00",
    icon: "AlertTriangle",
    description: "0 faturas",
    variant: "default"
  }
]

const fallbackRequirementsMetrics: Metric[] = [
  {
    id: "progress",
    title: "Progresso Geral de Compliance",
    value: "0/0",
    icon: "CheckCircle",
    variant: "progress",
    description: "0% concluído",
    progress: {
      current: 0,
      total: 0,
      percentage: 0
    }
  },
  {
    id: "upcoming",
    title: "Próximos Deadlines",
    value: "0",
    icon: "Clock",
    variant: "info",
    description: "Próximos 30 dias"
  },
  {
    id: "overdue",
    title: "Em Atraso",
    value: "0",
    icon: "AlertTriangle",
    variant: "default",
    description: "Tudo em dia"
  }
]

export function DashboardView() {
  const { savedInvoices } = useInvoice()
  const { requirements } = useBilling()
  
  const dashboardData = useMemo(() => {
    if (savedInvoices.length === 0) {
      return {
        invoiceMetrics: fallbackInvoiceMetrics,
        requirementsMetrics: fallbackRequirementsMetrics,
        chartData: { monthly: [], quarterly: [], yearly: [] },
        recentInvoices: [],
        totals: {
          totalRevenue: 0,
          pendingAmount: 0,
          overdueAmount: 0,
          totalInvoices: 0,
          paidInvoices: 0,
          pendingInvoices: 0,
          overdueInvoices: 0
        }
      }
    }
    return calculateDashboardMetrics(savedInvoices, requirements)
  }, [savedInvoices, requirements])

  const allMetrics = useMemo(() => {
    return [...dashboardData.invoiceMetrics, ...dashboardData.requirementsMetrics.slice(0, 2)]
  }, [dashboardData])

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da sua faturação e requisitos de compliance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RevenueChart dashboardData={dashboardData} />
        <RecentInvoices recentInvoices={dashboardData.recentInvoices} />
      </div>

      
    </div>
  )
}
