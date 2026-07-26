import Link from 'next/link';
import { Sparkles, LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 font-sans">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowRight className="w-4 h-4 rotate-180" /> Kembali
      </Link>
      
      <div className="w-full max-w-md bg-card p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
             <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-center tracking-tight">Selamat Datang</h1>
          <p className="text-muted-foreground text-sm text-center mt-2">
            Masuk untuk melanjutkan ke dashboard Anda.
          </p>
        </div>

        {/* Karena belum ada backend asli, form ini langsung diarahkan ke /dashboard */}
        <form className="space-y-5" action="/dashboard">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="halo@example.com" required className="h-11 rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-xs text-primary hover:underline font-medium">
                Lupa Password?
              </Link>
            </div>
            <Input id="password" type="password" required className="h-11 rounded-lg" />
          </div>
          
          <Button type="submit" className="w-full mt-2 rounded-full h-12 font-semibold shadow-sm">
            Masuk <LogIn className="ml-2 w-4 h-4" />
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Belum punya akun?{' '}
          <Link href="/register" className="text-primary hover:underline font-semibold">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
