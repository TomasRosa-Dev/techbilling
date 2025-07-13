import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { Requirement } from "@/types/requirement"
import { Switch } from "./switch"
import { Progress } from "./progress"
import { Clock, User, Tag, Calendar } from "lucide-react"

interface RequirementCardProps {
  requirement: Requirement;
  onToggle: (id: number) => void;
}

export function RequirementCard({ requirement, onToggle }: RequirementCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in_progress':
        return 'Em Progresso';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Em Atraso';
      default:
        return 'Desconhecido';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Normal';
    }
  };

  const getDeadlineColor = (deadline: string, status: string) => {
    if (status === 'completed') {
      return 'text-muted-foreground';
    }
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0 || status === 'overdue') {
      return 'text-red-500 dark:text-red-400';
    } else if (diffDays <= 7) {
      return 'text-yellow-600 dark:text-yellow-400';
    } else {
      return 'text-green-600 dark:text-green-400';
    }
  };

  const isDone = requirement.status === 'completed' || requirement.done;

  const handleToggle = () => {
    onToggle(requirement.id);
  };

  return (
    <Card className={`transition-all duration-200 ${isDone ? 'bg-muted/30 border-muted' : 'bg-card border-border'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={`text-base mb-2 ${isDone ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
              {requirement.label}
            </CardTitle>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className={getStatusColor(requirement.status)}>
                {getStatusText(requirement.status)}
              </Badge>
              <Badge variant="outline" className={getPriorityColor(requirement.priority)}>
                {getPriorityText(requirement.priority)}
              </Badge>
            </div>
          </div>
          <Switch
            checked={isDone}
            onCheckedChange={handleToggle}
            disabled={requirement.status === 'completed'}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <p className={`text-sm ${isDone ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
          {requirement.description}
        </p>
        
        {requirement.progress !== undefined && requirement.status === 'in_progress' && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progresso</span>
              <span>{requirement.progress}%</span>
            </div>
            <Progress value={requirement.progress} className="h-2" />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span className="text-muted-foreground">Prazo:</span>
            <span className={`font-medium ${getDeadlineColor(requirement.deadline, requirement.status)}`}>
              {formatDate(requirement.deadline)}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span className="text-muted-foreground">Responsável:</span>
            <span className="font-medium">{requirement.assignee}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs">
          <Tag className="w-3 h-3" />
          <span className="text-muted-foreground">Categoria:</span>
          <span className="font-medium capitalize">{requirement.category}</span>
        </div>
        
        {requirement.completedDate && (
          <div className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" />
            <span className="text-muted-foreground">Concluído em:</span>
            <span className="font-medium text-green-600">{formatDate(requirement.completedDate)}</span>
          </div>
        )}
        
        {requirement.overdueBy && requirement.status === 'overdue' && (
          <div className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" />
            <span className="text-muted-foreground">Em atraso há:</span>
            <span className="font-medium text-red-600">{requirement.overdueBy} dias</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}   