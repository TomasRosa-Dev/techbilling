export interface Requirement {
  id: number;
  label: string;
  description: string;
  deadline: string;
  status: "completed" | "in_progress" | "pending" | "overdue";
  priority: "high" | "medium" | "low";
  category: string;
  assignee: string;
  progress?: number;
  completedDate?: string;
  overdueBy?: number;
  done?: boolean; 
}
