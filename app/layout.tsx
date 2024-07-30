import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToastProvider from "./components/ToastProvider";
import { ClerkProvider } from "@clerk/nextjs";
// const inter = Inter({ subsets: ["latin"] });
import Modal from 'react-modal';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
// Modal.setAppElement('#__next');
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body>
        <AppRouterCacheProvider>
          <Header />
          <main className="flex-grow mx-auto min-h-screen">
            <ToastProvider>
              {children}
            </ToastProvider>
          </main>
          <Footer />
          </AppRouterCacheProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
