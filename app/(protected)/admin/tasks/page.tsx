import { prisma } from "@/lib/prisma";
import AdminTasksClient from "./AdminTasksClient";

export const metadata = {
  title: "Pantau Tugas - Admin",
};

export default async function AdminTasksPage() {
  const tasks = await prisma.task.findMany({
    include: {
      user: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Pantau Seluruh Task</h1>
        <p className="text-muted-foreground mt-1">Melihat seluruh tugas dari seluruh pengguna dalam sistem (Read-Only).</p>
      </div>

      <AdminTasksClient initialTasks={tasks} />
    </div>
  );
}
