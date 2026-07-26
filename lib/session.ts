import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("smart-schedule-session")?.value;

  if (!sessionId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionId },
    });

    if (!user) return null;

    return {
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      }
    };
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}

import { redirect } from "next/navigation";

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}
