import type { Metadata } from 'next';
import { Barlow, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedOut,
  UserButton,
  SignedIn,
} from '@clerk/nextjs';
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
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
