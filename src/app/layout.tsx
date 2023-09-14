import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DB Mania",
  description: "A SQL query competition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <nav className="container border-b-2 border-primary">
          <div className="flex justify-between items-center py-5">
            <Link href="/">
              <h1 className="font-bold text-3xl">DB Mania</h1>
            </Link>
          </div>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
