"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = () => {
    // Simulasi registrasi & set cookie login
    document.cookie = "smart-schedule-session=true; path=/; max-age=86400";
    toast.success("Akun berhasil dibuat!");
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md bg-card p-8 rounded-3xl shadow-lg border border-border/50 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-foreground">Buat Akun Baru</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Mulai atur waktu Anda lebih cerdas hari ini.
        </p>

        <div className="space-y-4 text-left">
          {/* Form palsu untuk estetika */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Nama Lengkap</label>
            <input type="text" placeholder="Rizka Aflah" className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" disabled />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <input type="email" placeholder="nama@email.com" className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" disabled />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Kata Sandi</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" disabled />
          </div>

          <Button 
            onClick={handleRegister} 
            className="w-full h-12 rounded-xl mt-4 font-semibold text-base shadow-md group"
          >
            Simulasi Daftar <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Sudah punya akun? <Link href="/login" className="text-primary hover:underline font-medium">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
