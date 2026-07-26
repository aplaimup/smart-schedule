import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import bcrypt from "bcryptjs";

// Helper function untuk cek admin role
async function checkAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return false;
  }
  return true;
}

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
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

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id, action, password, role } = await req.json();

    if (!id || !action) {
      return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
    }

    if (action === "RESET_PASSWORD") {
      if (!password) return NextResponse.json({ error: "Password baru dibutuhkan" }, { status: 400 });
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id },
        data: { password: hashedPassword }
      });
      return NextResponse.json({ message: "Password berhasil di-reset" });
    }

    if (action === "UPDATE_ROLE") {
      if (role !== "USER" && role !== "ADMIN") return NextResponse.json({ error: "Role tidak valid" }, { status: 400 });
      await prisma.user.update({
        where: { id },
        data: { role }
      });
      return NextResponse.json({ message: `Role berhasil diubah menjadi ${role}` });
    }

    return NextResponse.json({ error: "Aksi tidak dikenali" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID user dibutuhkan" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: "User berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
