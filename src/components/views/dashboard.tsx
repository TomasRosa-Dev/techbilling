"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { MetricCard } from "@/components/common/MetricCard"
import { Metric } from "@/types/metrics"
import metricsData from "@/jsons/metrics.json"

const chartData = [
  { month: "Jan", value: 2400 },
  { month: "Feb", value: 1398 },
  { month: "Mar", value: 9800 },
  { month: "Apr", value: 3908 },
  { month: "May", value: 4800 },
  { month: "Jun", value: 3800 },
  { month: "Jul", value: 4300 },
]

const recentInvoices = [
  { id: "INV-001", client: "Empresa ABC", amount: "R$ 2.500", status: "Pago" },
  { id: "INV-002", client: "Empresa XYZ", amount: "R$ 1.200", status: "Pendente" },
  { id: "INV-003", client: "Empresa 123", amount: "R$ 3.400", status: "Pago" },
  { id: "INV-004", client: "Empresa DEF", amount: "R$ 800", status: "Vencido" },
  { id: "INV-005", client: "Empresa GHI", amount: "R$ 1.900", status: "Pago" },
]

const chartConfig = {
  value: {
    label: "Receita",
    color: "hsl(var(--primary))",
  },
}

export function DashboardView() {
  const metrics = metricsData.dashboardMetrics as Metric[]

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-value)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-value)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Faturas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{invoice.id}</p>
                    <p className="text-xs text-muted-foreground">{invoice.client}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium">{invoice.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      invoice.status === 'Pago' 
                        ? 'bg-green-100 text-green-800' 
                        : invoice.status === 'Pendente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
