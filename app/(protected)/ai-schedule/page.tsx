import { getSession, requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AIScheduleClient from "@/components/ai-schedule/AIScheduleClient";
import { Bot } from "lucide-react";

export default async function AISchedulePage() {
  const session = await requireSession();
  
  // Ambil hanya task yang belum selesai (PENDING)
  const pendingTasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
      status: "PENDING"
    }
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
             <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Schedule</h1>
            <p className="text-muted-foreground mt-1">Biarkan AI cerdas menentukan urutan terbaik untuk menyelesaikan aktivitas Anda.</p>
          </div>
        </header>

        {/* Client Component */}
        <AIScheduleClient tasks={pendingTasks} />
      </div>
    </div>
  );
}
