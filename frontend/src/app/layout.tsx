    // frontend/src/app/layout.tsx
    import type { Metadata } from 'next';
    import { Inter } from 'next/font/google';
    import './globals.css';
    import { CartProvider } from '../context/CartContext'; // <-- ADD THIS IMPORT

    const inter = Inter({ subsets: ['latin'] });

    export const metadata: Metadata = {
      title: 'Mini E-commerce Store',
      description: 'A mini e-commerce storefront built with Next.js, React, and Node.js',
    };

    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <html lang="en">
          <body className={inter.className}>
            <CartProvider> {/* <-- WRAP CHILDREN WITH CARTPROVIDER */}
              {children}
            </CartProvider>
          </body>
        </html>
      );
    }
    