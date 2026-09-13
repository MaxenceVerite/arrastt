import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arras TT | Club de Tennis de Table",
  description: "Site officiel du club de Tennis de Table d'Arras (Arras TT). Suivez nos actualités, les résultats de nos équipes, et rejoignez-nous !",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: any) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background selection:bg-primary/20 selection:text-primary-dark">
        <Header />
        <main className="flex-grow flex flex-col relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
