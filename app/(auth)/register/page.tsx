"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sparkles, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Gagal mendaftar");

      toast.success("Akun berhasil dibuat! Silakan masuk.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Nama Lengkap</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Nama" className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" className="w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Kata Sandi</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full rounded-xl border border-input bg-transparent px-3 py-2 pr-10 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full h-12 rounded-xl mt-4 font-semibold text-base shadow-md group"
          >
            {isLoading ? "Memproses..." : "Daftar"} {!isLoading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Sudah punya akun? <Link href="/login" className="text-primary hover:underline font-medium">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
