"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateInvoiceTotal, getStatusStyle, getStatusText } from "@/lib/dashboard-metrics"
import { Invoice } from "@/types/invoice"

interface RecentInvoicesProps {
  recentInvoices: Invoice[]
}

export function RecentInvoices({ recentInvoices }: RecentInvoicesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Faturas Recentes</CardTitle>
        <p className="text-sm text-muted-foreground">
          Últimas {recentInvoices.length} faturas criadas
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.length > 0 ? (
            recentInvoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{invoice.id}</p>
                  <p className="text-xs text-muted-foreground">{invoice.customer}</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm font-medium">€{calculateInvoiceTotal(invoice).toFixed(2)}</p>
                  <div className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(invoice.status)}`}>
                    {getStatusText(invoice.status)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <p className="text-sm">Nenhuma fatura encontrada</p>
              <p className="text-xs">Crie a sua primeira fatura</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 