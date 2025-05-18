import type { Metadata } from 'next';
import { Barlow, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['500', '700'],
});

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: "Let's Buy",
  description: "Let's Buy is a platform for buying and selling products online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${barlow.variable} ${inter.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
