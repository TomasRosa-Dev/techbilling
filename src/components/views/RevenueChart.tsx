"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, AreaChart, Area } from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DashboardData } from "@/lib/dashboard-metrics"
import { TrendingUp, TrendingDown, BarChart3, LineChart as LineChartIcon, Activity } from "lucide-react"
import { useState, useMemo } from "react"

const chartConfig = {
  value: {
    label: "Receita",
    color: "hsl(var(--primary))",
  },
}

type TimeWindow = "monthly" | "quarterly" | "yearly"
type ChartType = "line" | "bar" | "area"

interface RevenueChartProps {
  dashboardData: DashboardData
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{value: number, payload: {period: string, value: number}}>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Período
            </span>
            <span className="font-bold text-muted-foreground">
              {label}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Receita
            </span>
            <span className="font-bold">
              €{payload[0].value.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function RevenueChart({ dashboardData }: RevenueChartProps) {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("monthly")
  const [chartType, setChartType] = useState<ChartType>("line")

  const chartData = useMemo(() => {
    switch (timeWindow) {
      case "monthly":
        return dashboardData.chartData.monthly
      case "quarterly":
        return dashboardData.chartData.quarterly
      case "yearly":
        return dashboardData.chartData.yearly
      default:
        return dashboardData.chartData.monthly
    }
  }, [dashboardData, timeWindow])

  const metrics = useMemo(() => {
    if (chartData.length === 0) return { total: 0, average: 0, growth: 0 }
    
    const total = chartData.reduce((sum, item) => sum + item.value, 0)
    const average = total / chartData.length
    const current = chartData[chartData.length - 1]?.value || 0
    const previous = chartData[chartData.length - 2]?.value || 0
    const growth = previous > 0 ? ((current - previous) / previous) * 100 : 0
    
    return { total, average, growth }
  }, [chartData])

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    }

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#3b82f6" radius={4} />
          </BarChart>
        )
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.3}
            />
          </AreaChart>
        )
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
            />
          </LineChart>
        )
    }
  }

  const getTimeWindowLabel = (window: TimeWindow) => {
    switch (window) {
      case "monthly": return "Mensal"
      case "quarterly": return "Trimestral"
      case "yearly": return "Anual"
      default: return "Mensal"
    }
  }

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Receita {getTimeWindowLabel(timeWindow)}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {timeWindow === 'monthly' ? 'Receita mensal de faturas pagas (2024)' : 'Análise de receita de faturas pagas por período'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeWindow} onValueChange={(value: TimeWindow) => setTimeWindow(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensal</SelectItem>
                <SelectItem value="quarterly">Trimestral</SelectItem>
                <SelectItem value="yearly">Anual</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-md">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="rounded-r-none"
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="rounded-none"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("area")}
                className="rounded-l-none"
              >
                <Activity className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total:</span>
            <span className="font-semibold">€{metrics.total.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Média:</span>
            <span className="font-semibold">€{metrics.average.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Crescimento:</span>
            <Badge variant={metrics.growth >= 0 ? "default" : "destructive"} className="gap-1">
              {metrics.growth >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(metrics.growth).toFixed(1)}%
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 