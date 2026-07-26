import { prisma } from "@/lib/prisma";
import AdminUsersClient from "./AdminUsersClient";

export const metadata = {
  title: "Kelola Pengguna - Admin",
};

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: { tasks: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Kelola Pengguna</h1>
        <p className="text-muted-foreground mt-1">Manajemen akun pengguna dan hak akses sistem.</p>
      </div>

      <AdminUsersClient initialUsers={users} />
    </div>
  );
}
