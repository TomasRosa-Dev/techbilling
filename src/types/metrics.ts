export interface MetricTrend {
  type: "positive" | "negative"
  value: string
  description: string
}

export interface Metric {
  id: string
  title: string
  value: string
  icon: "DollarSign" | "Users" | "FileText" | "Activity"
  trend: MetricTrend
}

export interface MetricsData {
  dashboardMetrics: Metric[]
} 