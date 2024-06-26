import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ToastProvider from "./components/ToastProvider";
import { ClerkProvider } from "@clerk/nextjs";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main className="flex-grow container mx-auto p-4 min-h-screen">
            <ToastProvider>
              {children}
            </ToastProvider>
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
