"use client"

import { ThemeToggle } from "@/components/ui/themeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-end justify-between px-6 py-2 w-full">
        <div className="flex items-center gap-4 md:hidden">
          <SidebarTrigger />
        </div>
        
        <div className="flex items-center gap-4 ml-auto">
          <ThemeToggle />
          <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted">
            <div className="flex h-full w-full items-center justify-center rounded-full text-sm font-medium">
              <User className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
