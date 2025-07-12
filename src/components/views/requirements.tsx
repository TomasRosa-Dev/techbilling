"use client"

import { useBilling } from "@/context/billingContext"
import { RequirementCard } from "@/components/ui/requirementCard"

export function RequirementsView() {
  const { requirements, toggleRequirement } = useBilling();
  console.log(requirements);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lista de Requisitos</h1>
        <div className="text-sm text-gray-500">
          {requirements.filter(r => r.done).length} de {requirements.length} concluídos
        </div>
      </div>
      
      <div className="gap-4">
        {requirements.map((requirement) => (
          <RequirementCard 
            key={requirement.id} 
            requirement={requirement}
            onToggle={toggleRequirement}
          />
        ))}
      </div>
      
      {requirements.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum requisito encontrado
        </div>
      )}
    </div>
  )
}
