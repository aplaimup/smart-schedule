import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Schedule AI | Manajemen Jadwal Berbasis AI",
  description:
    "Kelola jadwal Anda dengan cerdas menggunakan kecerdasan buatan. Smart Schedule AI membantu mengoptimalkan waktu, mengatur prioritas, dan menyinkronkan kalender Anda secara otomatis.",
  keywords: [
    "jadwal",
    "manajemen waktu",
    "AI scheduler",
    "kalender pintar",
    "smart schedule",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
