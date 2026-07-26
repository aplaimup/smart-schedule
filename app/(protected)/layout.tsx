import Sidebar from "@/components/Sidebar";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-background">
      <Sidebar role={session.user.role} />
      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden relative">
        {children}
      </main>
    </div>
  );
}
