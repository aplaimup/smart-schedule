import { getSession, requireSession } from "@/lib/session";
import TasksClient from "@/components/tasks/TasksClient";

export default async function TasksPage() {
  const session = await requireSession();
  
  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Manajemen Aktivitas</h1>
          <p className="text-muted-foreground mt-2">Catat, kelola, dan selesaikan jadwal harian Anda.</p>
        </header>

        <TasksClient userId={session.user.id} />
      </div>
    </div>
  );
}
