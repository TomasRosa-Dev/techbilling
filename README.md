# TechBilling 💼

Sistema de gestão de faturação e requisitos de compliance construído com Next.js, React e TypeScript.

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18.17 ou superior
- npm, yarn ou pnpm

### Instalação

1. **Clonar o repositório**
   ```bash
   git clone <repository-url>
   cd techbilling
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Executar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abrir no navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## ✨ Funcionalidades

- **Dashboard** - Métricas de receita, gráficos interativos e análise de tendências
- **Gestão de Faturas** - Criar, editar e acompanhar faturas com estados (pago, pendente, em atraso)
- **Requisitos de Compliance** - Gestão de tarefas com prazos, progresso e prioridades
- **Tema Escuro/Claro** - Alternância automática baseada nas preferências do sistema
- **Design Responsivo** - Otimizado para desktop, tablet e mobile

## 🛠️ Tecnologias

- **Next.js 15.3.5** - Framework React
- **React 19** - Biblioteca de interface
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS
- **shadcn/ui** - Componentes de interface
- **Recharts** - Gráficos e visualizações

## 📊 Dados de Exemplo

O projeto inclui dados de demonstração:
- 38 faturas com diferentes estados e períodos (2023-2024)
- 20 requisitos de compliance com várias prioridades e prazos
- Dados de receita mensal, trimestral e anual

## 📁 Estrutura do Projeto

```
techbilling/
├── src/
│   ├── app/              # Páginas Next.js
│   ├── components/       # Componentes React
│   ├── context/          # Gestão de estado
│   ├── lib/              # Utilitários e cálculos
│   ├── types/            # Definições TypeScript
│   └── jsons/            # Dados de exemplo
├── public/               # Arquivos estáticos
└── ...
```

## 📱 Páginas

- `/` - Dashboard principal
- `/invoices` - Gestão de faturas
- `/requirements` - Gestão de requisitos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para a funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Commit as mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📜 Licença

Este projeto está licenciado sob a Licença MIT.
