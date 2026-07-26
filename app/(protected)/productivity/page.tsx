import { getSession, requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, CheckCircle2, CircleDashed } from "lucide-react";

export default async function ProductivityPage() {
  const session = await requireSession();
  const userId = session.user.id;

  // Mengambil total task yang sudah selesai dan belum selesai
  const completedTasksCount = await prisma.task.count({
    where: { userId, status: "DONE" },
  });

  const pendingTasksCount = await prisma.task.count({
    where: { userId, status: "PENDING" },
  });

  const totalTasksCount = completedTasksCount + pendingTasksCount;
  
  // Menghitung persentase produktivitas
  const productivityPercentage = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <header className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
             <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Produktivitas Anda</h1>
            <p className="text-muted-foreground mt-1">Pantau seberapa efisien Anda menyelesaikan aktivitas.</p>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card: Total Selesai */}
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all rounded-3xl p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Aktivitas Selesai
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-foreground mb-1">{completedTasksCount}</div>
              <p className="text-sm text-muted-foreground font-medium">
                Tugas yang berhasil Anda taklukkan
              </p>
            </CardContent>
          </Card>

          {/* Card: Total Belum Selesai */}
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all rounded-3xl p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Aktivitas Belum Selesai
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <CircleDashed className="h-5 w-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-foreground mb-1">{pendingTasksCount}</div>
              <p className="text-sm text-muted-foreground font-medium">
                Tugas yang masih menunggu antrean
              </p>
            </CardContent>
          </Card>

          {/* Card: Persentase (Span full width) */}
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all rounded-3xl p-2 md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Tingkat Produktivitas
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-4 mt-2">
                <div className="text-5xl font-black text-foreground">
                  {productivityPercentage}<span className="text-3xl text-muted-foreground">%</span>
                </div>
                <div className="text-sm text-muted-foreground text-right mb-1">
                  <span className="text-foreground font-bold">{completedTasksCount}</span> dari {totalTasksCount} Aktivitas
                </div>
              </div>
              <Progress value={productivityPercentage} className="h-4 rounded-full bg-secondary" />
              
              <div className="mt-5 p-4 rounded-xl bg-background border border-border/50 flex gap-3 items-center">
                <div className="shrink-0 text-3xl">
                  {productivityPercentage >= 80 ? "🏆" : productivityPercentage >= 50 ? "🔥" : "🌱"}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {productivityPercentage >= 80 
                    ? "Luar biasa! Anda berada di jalur yang sangat produktif. Pertahankan momentum ini!" 
                    : productivityPercentage >= 50 
                    ? "Kerja bagus! Anda sudah menyelesaikan lebih dari separuh tugas Anda. Ayo selesaikan sisanya!" 
                    : "Mari mulai! Fokus pada satu tugas kecil terlebih dahulu untuk membangun momentum Anda hari ini."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
