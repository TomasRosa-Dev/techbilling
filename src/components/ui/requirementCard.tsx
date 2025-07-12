import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Requirement } from "@/types/requirement"
import { Switch } from "@/components/ui/switch"

interface RequirementCardProps {
  requirement: Requirement;
  onToggle: (id: number) => void;
}

export function RequirementCard({ requirement, onToggle }: RequirementCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className={`transition-all duration-200 ${requirement.done ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-lg ${requirement.done ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {requirement.label}
          </CardTitle>
          <Switch
            checked={requirement.done}
            onCheckedChange={() => onToggle(requirement.id)}
            className="ml-2"
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className={`text-sm mb-3 ${requirement.done ? 'text-gray-500' : 'text-gray-600'}`}>
          {requirement.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Prazo:</span>
          <span className={`text-sm font-medium ${requirement.done ? 'text-gray-500' : 'text-red-600'}`}>
            {formatDate(requirement.deadline)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}   