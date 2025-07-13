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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  TrendingUp,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarNav() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="min-h-screen border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <SidebarTrigger className={`cursor-pointer pr-3 ${isCollapsed ? 'pr-3' : 'pr-2'}`} />
          <h1 
            className={`text-xl font-bold text-primary transition-all duration-200 ${
              isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
            }`}
          >
            TechBilling
          </h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Dashboard">
              <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/invoices"} tooltip="Faturas">
              <Link href="/invoices" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent">
                <TrendingUp className="h-5 w-5" />
                <span>Faturas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/requirements"} tooltip="Requisitos">
              <Link href="/requirements" className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent">
                <ClipboardList className="h-5 w-5" />
                <span>Requisitos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-2">
          <div 
            className={`text-xs text-muted-foreground text-center transition-all duration-200 ${
              isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'
            }`}
          >
            © 2025 TechBilling
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
} 