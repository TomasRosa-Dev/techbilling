import { Metric } from "@/types/metrics"
import { Requirement } from "@/types/requirement"

export function calculateRequirementsMetrics(requirements: Requirement[]): Metric[] {
  const completedCount = requirements.filter(r => r.status === 'completed').length;
  const totalCount = requirements.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const now = new Date();
  const next30Days = new Date();
  next30Days.setDate(now.getDate() + 30);
  
  const upcomingDeadlines = requirements.filter(r => {
    if (r.status === 'completed') return false;
    const deadline = new Date(r.deadline);
    return deadline >= now && deadline <= next30Days;
  }).length;
  
  const overdue = requirements.filter(r => {
    if (r.status === 'completed') return false;
    const deadline = new Date(r.deadline);
    return deadline < now;
  }).length;
  
  const requirementMetrics: Metric[] = [
    {
      id: "progress",
      title: "Progresso Geral de Compliance",
      value: `${completedCount}/${totalCount}`,
      icon: "CheckCircle",
      variant: "progress",
      description: ``,
      progress: {
        current: completedCount,
        total: totalCount,
        percentage: percentage
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
      value: overdue.toString(),
      icon: "AlertTriangle",
      variant: overdue > 0 ? "warning" : "default",
      description: overdue > 0 ? "Requer atenção imediata" : "Tudo em dia"
    }
  ];
  
  return requirementMetrics;
} 