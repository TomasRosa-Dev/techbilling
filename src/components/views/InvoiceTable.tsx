"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Trash, Edit } from 'lucide-react';
import { Invoice } from '@/types/invoice';
import { useInvoice } from '@/context/invoiceContext';
import toast from 'react-hot-toast';

const getStatusStyle = (status: Invoice['status']) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getStatusText = (status: Invoice['status']) => {
  switch (status) {
    case 'paid':
      return 'Pago';
    case 'pending':
      return 'Pendente';
    case 'overdue':
      return 'Em Atraso';
    default:
      return 'Desconhecido';
  }
};

const calculateInvoiceTotal = (invoice: Invoice) => {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const discountAmount = (subtotal * invoice.discount) / 100;
  const discountedSubtotal = subtotal - discountAmount;
  const vatAmount = (discountedSubtotal * invoice.vatRate) / 100;
  return discountedSubtotal + vatAmount;
};

export function InvoiceTable() {
  const { savedInvoices, loadInvoice, deleteInvoice } = useInvoice();

  const handleLoadInvoice = (invoice: Invoice) => {
    loadInvoice(invoice);
    toast.success('Fatura carregada no formulário!');
  };

  const handleDeleteInvoice = (id: string) => {
    if (confirm('Tem certeza que deseja eliminar esta fatura?')) {
      deleteInvoice(id);
      toast.success('Fatura eliminada com sucesso!');
    }
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.success(`Download da fatura ${invoice.id} - Funcionalidade em desenvolvimento`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Faturas Existentes ({savedInvoices.length})
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Histórico de faturas emitidas
        </p>
      </CardHeader>
      <CardContent>
        {savedInvoices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma fatura encontrada</p>
            <p className="text-sm">Crie uma nova fatura usando o formulário abaixo</p>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto border rounded-md">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString('pt-PT')}</TableCell>
                    <TableCell className="font-medium">€{calculateInvoiceTotal(invoice).toFixed(2)}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusStyle(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLoadInvoice(invoice)}
                          title="Carregar no formulário"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice)}
                          title="Descarregar PDF"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          title="Eliminar fatura"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 