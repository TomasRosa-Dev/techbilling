"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  TrendingUp,
  ClipboardList,
  FileText,
  FileBarChart2,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/themeToggle";

export function SidebarNav() {
  return (
    <Sidebar collapsible="icon" className="min-h-screen border-r bg-white">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg w-10 h-10 flex items-center justify-center text-white font-bold text-lg">
            TB
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive tooltip="Dashboard">
              <Link href="/">
                <Home />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Análise de Receitas">
              <Link href="/invoices">
                <TrendingUp />
                <span>Análise de Receitas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Requisitos">
              <Link href="/requirements">
                <ClipboardList />
                <span>Requisitos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Simulador de Fatura">
              <Link href="/invoice-simulator">
                <FileText />
                <span>Simulador de Fatura</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Relatórios">
              <Link href="/reports">
                <FileBarChart2 />
                <span>Relatórios</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
} 