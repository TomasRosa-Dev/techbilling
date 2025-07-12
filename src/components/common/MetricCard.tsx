"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, FileText, Activity } from "lucide-react"
import { Metric } from "@/types/metrics"

const iconMap = {
  DollarSign,
  Users,
  FileText,
  Activity,
}

interface MetricCardProps {
  metric: Metric
  className?: string
}

export function MetricCard({ metric, className = "" }: MetricCardProps) {
  const IconComponent = iconMap[metric.icon]
  const TrendIcon = metric.trend.type === "positive" ? TrendingUp : TrendingDown
  const trendColor = metric.trend.type === "positive" ? "text-green-500" : "text-red-500"

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <TrendIcon className={`h-3 w-3 mr-1 ${trendColor}`} />
          {metric.trend.value} {metric.trend.description}
        </p>
      </CardContent>
    </Card>
  )
} 