export interface MetricTrend {
  type: "positive" | "negative"
  value: string
  description: string
}

export interface ProgressData {
  current: number
  total: number
  percentage: number
}

export interface Metric {
  id: string
  title: string
  value: string
  icon: "DollarSign" | "Users" | "FileText" | "Activity" | "CheckCircle" | "Clock" | "AlertTriangle"
  trend?: MetricTrend
  variant?: "default" | "progress" | "warning" | "info"
  progress?: ProgressData
  description?: string
}

export interface ChartDataPoint {
  month: string
  value: number
}

export interface MetricsData {
  dashboardMetrics: {
    fallback: Metric[]
  }
  requirementsMetrics: {
    fallback: Metric[]
  }
  chartData: {
    fallback: ChartDataPoint[]
  }
} 