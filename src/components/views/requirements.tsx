"use client"

import { useBilling } from "@/context/billingContext"
import { useInvoice } from "@/context/invoiceContext"
import { RequirementCard } from "@/components/ui/requirementCard"
import { MetricCard } from "@/components/common/MetricCard"
import { calculateDashboardMetrics } from "@/lib/dashboard-metrics"
import { useMemo } from "react"
import { ClipboardList } from "lucide-react"

export function RequirementsView() {
  const { requirements, toggleRequirement } = useBilling();
  const { savedInvoices } = useInvoice();
  
  const metrics = useMemo(() => {
    const dashboardData = calculateDashboardMetrics(savedInvoices, requirements);
    return dashboardData.requirementsMetrics;
  }, [savedInvoices, requirements]);

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Requisitos de Compliance</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Lista de Requisitos ({requirements.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe o status e progresso de cada requisito
          </p>
        </div>
      </div>
      
      {requirements.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum requisito encontrado</p>
          <p className="text-sm">Os requisitos serão carregados automaticamente do sistema</p>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto border rounded-lg p-4 space-y-4">
          {requirements.map((requirement) => (
            <RequirementCard 
              key={requirement.id} 
              requirement={requirement}
              onToggle={toggleRequirement}
            />
          ))}
        </div>
      )}
    </div>
  )
}
