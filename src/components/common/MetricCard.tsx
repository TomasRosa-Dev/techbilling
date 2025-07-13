"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, FileText, Activity, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Metric } from "@/types/metrics"

const iconMap = {
  DollarSign,
  Users,
  FileText,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
}

const variantStyles = {
  default: "border-border",
  progress: "border-border",
  warning: "border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-900/20",
  info: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20"
}

interface MetricCardProps {
  metric: Metric
  className?: string
}

export function MetricCard({ metric, className = "" }: MetricCardProps) {
  const IconComponent = iconMap[metric.icon]
  const variant = metric.variant || "default"
  
  const renderTrend = () => {
    if (!metric.trend) return null
    
    const TrendIcon = metric.trend.type === "positive" ? TrendingUp : TrendingDown
    const trendColor = metric.trend.type === "positive" ? "text-green-500" : "text-red-500"
    
    return (
      <p className="text-xs text-muted-foreground flex items-center">
        <TrendIcon className={`h-3 w-3 mr-1 ${trendColor}`} />
        {metric.trend.value} {metric.trend.description}
      </p>
    )
  }

  const renderProgress = () => {
    if (!metric.progress) return null
    
    return (
      <div className="mt-2 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-medium">{metric.progress.percentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${metric.progress.percentage}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <Card className={`${variantStyles[variant]} ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        {metric.description && (
          <p className="text-xs text-muted-foreground mt-1">
            {metric.description}
          </p>
        )}
        {renderTrend()}
        {renderProgress()}
      </CardContent>
    </Card>
  )
} 