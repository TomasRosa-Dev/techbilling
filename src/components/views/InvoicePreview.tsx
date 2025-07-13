"use client"

import React, { useState, useEffect } from 'react';
import { useInvoice } from '@/context/invoiceContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Mail, Download } from 'lucide-react';

interface InvoicePreviewProps {
  onDownloadPDF: () => void;
  onSendEmail: () => void;
}

export function InvoicePreview({ onDownloadPDF, onSendEmail }: InvoicePreviewProps) {
  const { 
    customer, 
    customerEmail, 
    customerAddress, 
    date, 
    items, 
    vatRate, 
    discount 
  } = useInvoice();

  const [previewId, setPreviewId] = useState<string>('PREVIEW');

  useEffect(() => {
    const generatePreviewId = () => {
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      return `INV-${year}-${randomNum}`;
    };
    setPreviewId(generatePreviewId());
  }, []);

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const discountAmount = (subtotal * discount) / 100;
  const discountedSubtotal = subtotal - discountAmount;
  const vatAmount = (discountedSubtotal * vatRate) / 100;
  const total = discountedSubtotal + vatAmount;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Pré-visualização da Fatura
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Visualização da fatura antes da emissão final
        </p>
      </CardHeader>
      <CardContent className="p-8 h-full flex flex-col justify-between">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">TechBilling</h2>
              <p className="text-muted-foreground">Sistema de Faturação</p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold">FATURA</h3>
              <p className="text-muted-foreground">{previewId}</p>
              <p className="text-muted-foreground">Data: {new Date(date).toLocaleDateString('pt-PT')}</p>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h4 className="font-semibold mb-2">Faturar a:</h4>
            <div>
              <p className="font-medium">{customer || 'Nome do Cliente'}</p>
              <p className="text-sm">{customerEmail || 'Email do Cliente'}</p>
              <p className="text-sm whitespace-pre-line">{customerAddress || 'Morada do Cliente'}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="font-semibold mb-4">Descrição:</h4>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="border p-3 rounded">
                <p className="text-sm font-medium">
                  {item.desc || 'Descrição do serviço/produto'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.qty} × €{item.price.toFixed(2)} = €{(item.qty * item.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>
                Subtotal ({items.length}x €{items.length > 0 ? (subtotal / items.length).toFixed(2) : '0.00'})
              </span>
              <span className="font-medium">
                €{subtotal.toFixed(2)}
              </span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between">
                <span>Desconto ({discount}%)</span>
                <span>-€{discountAmount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>IVA ({vatRate}%)</span>
              <span className="font-medium">
                €{vatAmount.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button 
            onClick={onDownloadPDF} 
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Descarregar PDF
          </Button>
          <Button 
            onClick={onSendEmail} 
            variant="outline" 
            className="flex-1"
          >
            <Mail className="w-4 h-4 mr-2" />
            Enviar por Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 