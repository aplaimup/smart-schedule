import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("smart-schedule-session");
  cookieStore.delete("smart-schedule-role");
  
  return NextResponse.json({ message: "Logout berhasil" });
}
