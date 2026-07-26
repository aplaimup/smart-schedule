import { getSession, requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import CalendarClient from "@/components/calendar/CalendarClient";
import { CalendarDays } from "lucide-react";

export default async function CalendarPage() {
  const session = await requireSession();
  
  // Ambil semua task milik user
  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      deadline: "asc"
    }
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
             <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Kalender Jadwal</h1>
            <p className="text-muted-foreground mt-1">Pantau seluruh tenggat waktu aktivitas Anda dalam satu pandangan.</p>
          </div>
        </header>

        {/* Client Component */}
        <CalendarClient tasks={tasks} />
      </div>
    </div>
  );
}
