// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SPC System Management",
  description: "SPC Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-slate-50 text-slate-900 antialiased")}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Header />
            <main className="p-6 md:p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}