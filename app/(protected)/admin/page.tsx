import { prisma } from "@/lib/prisma";
import { Users, ListTodo, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Admin Dashboard - Smart Schedule AI",
};

export default async function AdminDashboardPage() {
  const totalUsers = await prisma.user.count();
  const totalTasks = await prisma.task.count();
  
  // Aggregate sum of aiUsageCount
  const aiUsageAgg = await prisma.user.aggregate({
    _sum: {
      aiUsageCount: true,
    }
  });
  
  const totalAiUsage = aiUsageAgg._sum.aiUsageCount || 0;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Ringkasan metrik platform Smart Schedule AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Pengguna</p>
            <h3 className="text-3xl font-bold">{totalUsers}</h3>
            <Link href="/admin/users" className="text-xs text-primary hover:underline mt-1 inline-block">
              Kelola pengguna &rarr;
            </Link>
          </div>
        </div>

        {/* Total Tasks */}
        <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
            <ListTodo className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Task Sistem</p>
            <h3 className="text-3xl font-bold">{totalTasks}</h3>
            <Link href="/admin/tasks" className="text-xs text-primary hover:underline mt-1 inline-block">
              Pantau tasks &rarr;
            </Link>
          </div>
        </div>

        {/* Total AI Usage */}
        <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Pemakaian AI</p>
            <h3 className="text-3xl font-bold">{totalAiUsage}</h3>
            <span className="text-xs text-muted-foreground mt-1 inline-block">Generate Schedule hits</span>
          </div>
        </div>
      </div>
    </div>
  );
}
