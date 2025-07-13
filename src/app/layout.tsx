import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers'; 
import { SidebarNav } from '@/components/common/SidebarNav';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tech Billing',
  description: 'Billing and invoice management system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <SidebarProvider>
            <SidebarNav />
            <SidebarInset>
              <Header />
              <main className="flex-1 p-6 overflow-auto">
                {children}
              </main>
              <Footer />
            </SidebarInset>
          </SidebarProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: '8px',
                background: 'var(--card)',
                color: 'var(--foreground)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}