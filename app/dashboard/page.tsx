import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarClock, ListTodo, TrendingUp } from "lucide-react";

// ==========================================
// Mock Session Authentication
// ==========================================
// Nantinya ini akan diganti dengan autentikasi asli (seperti NextAuth / Supabase Auth)
async function getSession() {
  return {
    user: {
      id: "mock-user-id", // ID fiktif untuk tahap ini
      name: "Rizka Aflah" // Menggunakan salah satu nama dari Kelompok 7 sebagai contoh
    }
  };
}

export default async function DashboardPage() {
  const session = await getSession();
  const userId = session.user.id;

  // 1. Ambil data: Aktivitas hari ini (Deadline hari ini)
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayTasksCount = await prisma.task.count({
    where: {
      userId,
      deadline: {
        gte: startOfDay,
        lte: endOfDay,
      }
    }
  });

  // 2. Ambil data: Deadline terdekat (Task PENDING, deadline mulai dari sekarang)
  const nearestDeadlineTask = await prisma.task.findFirst({
    where: {
      userId,
      status: "PENDING",
      deadline: {
        gte: new Date(),
      }
    },
    orderBy: {
      deadline: 'asc'
    }
  });

  // 3. Ambil data: Ringkasan Produktivitas (% Selesai)
  const allTasksCount = await prisma.task.count({ where: { userId } });
  const completedTasksCount = await prisma.task.count({ where: { userId, status: "DONE" } });
  
  const productivityPercentage = allTasksCount > 0 
    ? Math.round((completedTasksCount / allTasksCount) * 100) 
    : 0;

  // Helper untuk format tanggal
  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Halo, {session.user.name}! 👋
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
            Ini adalah ringkasan jadwal dan produktivitas Anda. Tetap fokus dan kelola waktu Anda dengan bijak hari ini.
          </p>
        </header>

        {/* Dashboard Grid Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1: Aktivitas Hari Ini */}
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all rounded-3xl p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Aktivitas Hari Ini
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ListTodo className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-foreground mb-1">{todayTasksCount}</div>
              <p className="text-sm text-muted-foreground font-medium">
                Tugas yang dijadwalkan hari ini
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Deadline Terdekat */}
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all rounded-3xl p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Deadline Terdekat
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <CalendarClock className="h-5 w-5 text-orange-500" />
              </div>
            </CardHeader>
            <CardContent>
              {nearestDeadlineTask ? (
                <div className="mt-2">
                  <div className="text-xl font-bold line-clamp-2 leading-tight mb-3">
                    {nearestDeadlineTask.title}
                  </div>
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 px-3 py-1.5 rounded-lg text-sm font-semibold">
                    <CalendarClock className="w-4 h-4" />
                    <span>{formatDateTime(nearestDeadlineTask.deadline)}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="text-xl font-bold text-muted-foreground/50 mb-2">
                    Bebas Tugas
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Tidak ada deadline tertunda saat ini. Anda luar biasa!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card 3: Ringkasan Produktivitas */}
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-all rounded-3xl p-2 lg:col-span-1 md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Produktivitas
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-4 mt-2">
                <div className="text-5xl font-black text-foreground">
                  {productivityPercentage}<span className="text-3xl text-muted-foreground">%</span>
                </div>
                <div className="text-sm text-muted-foreground text-right mb-1">
                  <span className="text-foreground font-bold">{completedTasksCount}</span> / {allTasksCount} Selesai
                </div>
              </div>
              <Progress value={productivityPercentage} className="h-3 rounded-full bg-secondary" />
              <p className="text-sm text-muted-foreground font-medium mt-4">
                {productivityPercentage >= 80 ? "Kerja bagus! Pertahankan produktivitas Anda." : 
                 productivityPercentage >= 50 ? "Lumayan! Ayo selesaikan tugas yang tersisa." : 
                 "Mari mulai cicil tugas-tugas Anda."}
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
