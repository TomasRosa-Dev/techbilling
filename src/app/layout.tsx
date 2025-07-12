import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BillingProvider } from "../context/billingContext";
import { InvoiceProvider } from "../context/invoiceContext";
import { SidebarNav } from "@/components/common/SidebarNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from 'next-themes';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Billing",
  description: "Billing and invoice management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <BillingProvider>
          <InvoiceProvider>
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <SidebarNav />
                <main className="flex-1 w-full overflow-auto">{children}</main>
              </div>
            </SidebarProvider>
            </InvoiceProvider>
          </BillingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
