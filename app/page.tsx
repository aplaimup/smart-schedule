"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, CheckSquare, Sparkles, BarChart3, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden">
      
      {/* Navigation Bar */}
      <header className="px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
             <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">Smart Schedule <span className="text-primary">AI</span></span>
        </div>
        <nav className="hidden md:flex gap-3 items-center">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" className="font-medium">Masuk</Button>
          </Link>
          <Link href="/register">
            <Button variant="ghost" className="font-medium">Daftar</Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-full px-6 font-medium shadow-sm">Mulai Sekarang</Button>
          </Link>
        </nav>
        
        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="h-11 w-11" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full h-12 text-base font-medium">Masuk</Button>
          </Link>
          <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full h-12 text-base rounded-xl font-medium shadow-sm">Daftar & Mulai Sekarang</Button>
          </Link>
        </div>
      )}

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-4 md:px-6 lg:px-8 py-16 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] md:h-[500px] bg-primary/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 ring-1 ring-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>Kendalikan Waktu Anda dengan AI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            Manajemen Jadwal Cerdas <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Tanpa Usaha Ekstra
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Smart Schedule AI membantu Anda mengoptimalkan waktu, mengatur prioritas tugas, dan menyinkronkan kalender harian secara otomatis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base h-14 px-8 rounded-full shadow-lg shadow-primary/25 transition-transform hover:scale-105 font-semibold">
                Mulai Sekarang <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-base h-14 px-8 rounded-full font-semibold border-2 hover:bg-secondary/50">
                Masuk
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 md:px-6 lg:px-8 py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30 border-t border-border/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Fitur Unggulan</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tingkatkan produktivitas Anda dengan serangkaian alat cerdas yang didesain khusus untuk kebutuhan manajemen waktu modern.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className="bg-card text-card-foreground p-6 md:p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <CheckSquare className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl mb-3">Task Management</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Catat, atur, dan pantau seluruh tugas harian Anda di satu tempat terpusat dengan antarmuka yang bersih dan mudah digunakan.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-card text-card-foreground p-6 md:p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl mb-3">Kalender Visual</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Lihat jadwal Anda secara komprehensif dalam tampilan kalender yang interaktif, dinamis, dan terhubung dengan semua tugas.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-card text-card-foreground p-6 md:p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl mb-3">AI Schedule Generator</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Biarkan kecerdasan buatan menyusun jadwal paling optimal untuk Anda berdasarkan prioritas, estimasi waktu, dan tenggat waktu.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-card text-card-foreground p-6 md:p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl mb-3">Productivity Summary</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Dapatkan wawasan berharga tentang pola kerja mingguan Anda dan tingkatkan efisiensi serta produktivitas harian secara terukur.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-4 md:px-6 lg:px-8 py-12 md:py-16 bg-card border-t border-border/50 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-8 opacity-80 hover:opacity-100 transition-opacity cursor-default">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight">Smart Schedule AI</span>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground font-medium">
              © 2026 Smart Schedule AI • Kelompok 7 • Teknik Informatika • Universitas Malikussaleh
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-border/80 w-12 hidden md:block"></div>
              <p className="text-sm md:text-base text-foreground/80 font-semibold tracking-wide leading-relaxed max-w-lg md:max-w-none">
                Rizka Aflah Hasibuan • Aisyah Wanda Delfia • Nyak Khairiah • Fuzia Nizla Siregar
              </p>
              <div className="h-px bg-border/80 w-12 hidden md:block"></div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
