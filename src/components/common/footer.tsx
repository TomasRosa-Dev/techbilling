"use client"

import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="px-6 py-4 w-full">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0 w-full">
          <p className="text-sm text-muted-foreground">
            Tomás Rosa
          </p>
          
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/TomasRosa-Dev/techbilling"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
