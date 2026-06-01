import type { Metadata } from "next";
import { Prompt, Sarabun } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "Slippy — แค่แชะ slip ก็จบ บันทึกรายรับรายจ่ายง่ายๆ อัจฉริยะ",
  description: "ระบบจัดการรายรับ-รายจ่ายอัจฉริยะ สำหรับเจ้าของกิจการ SME, ฟรีแลนซ์, และบุคคลทั่วไป",
};

import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.variable} ${sarabun.variable} font-body antialiased bg-slate-50 text-slate-800`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
