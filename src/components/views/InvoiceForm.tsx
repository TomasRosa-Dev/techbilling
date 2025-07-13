"use client"

import React from 'react';
import { useInvoice } from '@/context/invoiceContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, FileText, Calculator, Save } from 'lucide-react';

interface InvoiceFormProps {
  onGeneratePreview: () => void;
}

export function InvoiceForm({ onGeneratePreview }: InvoiceFormProps) {
  const { 
    customer, 
    customerEmail, 
    customerAddress,
    date, 
    items, 
    vatRate,
    discount,
    setCustomer, 
    setCustomerEmail,
    setCustomerAddress,
    setDate, 
    setVatRate,
    setDiscount,
    addItem, 
    updateItem, 
    removeItem,
    saveCurrentInvoice,
    clearForm
  } = useInvoice();

  const handleSaveInvoice = () => {
    if (!customer.trim() || items.length === 0 || !items.some(item => item.desc.trim())) {
      alert('Preencha pelo menos o nome do cliente e um item antes de guardar.');
      return;
    }
    saveCurrentInvoice('pending');
    alert('Fatura guardada com sucesso!');
  };

  return (
    <Card className="h-full border-none shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Dados da Fatura
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Preencha os dados necessários para gerar a fatura
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Informações do Cliente</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nome do Cliente
              </label>
              <Input
                value={customer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
                placeholder="Ex: Empresa ABC Lda"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email do Cliente
              </label>
              <Input
                type="email"
                value={customerEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerEmail(e.target.value)}
                placeholder="cliente@empresa.com"
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Morada do Cliente
            </label>
            <Textarea
              value={customerAddress}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomerAddress(e.target.value)}
              placeholder="Rua, Cidade, Código Postal"
              className="w-full resize-none"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Data da Fatura
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Itens da Fatura</h3>
            <Button onClick={addItem} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Item
            </Button>
          </div>
          
          {items.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium">
                  Item {index + 1}
                </span>
                {items.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Descrição do Serviço/Produto
                </label>
                <Textarea
                  value={item.desc}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateItem(index, { desc: e.target.value })}
                  placeholder="Descreva o serviço ou produto faturado"
                  className="w-full resize-none"
                  rows={2}
                  
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantidade
                  </label>
                  <Input
                    type="number"
                    value={item.qty}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateItem(index, { qty: parseInt(e.target.value) || 0 })}
                    min="1"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Preço Unitário (€)
                  </label>
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateItem(index, { price: parseFloat(e.target.value) || 0 })}
                    step="0.01"
                    min="0"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">
                  Subtotal: €{(item.qty * item.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Taxas e Descontos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Taxa de IVA (%)
              </label>
              <Select value={vatRate.toString()} onValueChange={(value: string) => setVatRate(parseInt(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% - Isento</SelectItem>
                  <SelectItem value="6">6% - Taxa Reduzida</SelectItem>
                  <SelectItem value="13">13% - Taxa Intermédia</SelectItem>
                  <SelectItem value="23">23% - Taxa Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Desconto (%)
              </label>
              <Input
                type="number"
                value={discount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                step="0.01"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={onGeneratePreview} 
            className="w-full"
            size="lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Gerar Pré-visualização
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              onClick={handleSaveInvoice} 
              variant="outline"
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Fatura
            </Button>
            <Button 
              onClick={clearForm} 
              variant="outline"
              className="w-full"
            >
              Limpar Formulário
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 