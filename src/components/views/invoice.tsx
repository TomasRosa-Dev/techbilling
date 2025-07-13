"use client"

import React from 'react';
import { InvoiceForm } from './InvoiceForm';
import { InvoicePreview } from './InvoicePreview';
import { InvoiceTable } from './InvoiceTable';
import toast from 'react-hot-toast';

export function InvoiceView() {
  const handleGeneratePreview = () => {
    toast.success('Pré-visualização gerada com sucesso!');
  };

  const handleSendEmail = () => {
    toast.success('Fatura enviada por email!');
  };

  const handleDownloadPDF = () => {
    toast.success('PDF da fatura em download!');
  };

  return (
    <div className="p-6 space-y-8">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Faturas
          </h1>
          <p className=" text-muted-foreground">
            Crie e visualize as suas faturas.
          </p>
        </div>

        <div className="space-y-8">
          <InvoiceTable />
          <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Simulação de Fatura
          </h1>
        </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[800px]">
            
            <InvoiceForm onGeneratePreview={handleGeneratePreview} />

            <InvoicePreview 
              onDownloadPDF={handleDownloadPDF}
              onSendEmail={handleSendEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
