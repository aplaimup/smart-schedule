import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.includes("AIza...")) {
      return NextResponse.json(
        { error: "API Key Gemini belum dikonfigurasi di environment variables." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Menggunakan gemini-3.5-flash karena versi 2.5 sudah tidak tersedia
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const { tasks } = await req.json();

    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json(
        { error: "Tidak ada aktivitas PENDING yang dikirimkan." },
        { status: 400 }
      );
    }

    // Simplifikasi payload tugas untuk menghemat token
    const simplifiedTasks = tasks.map((t: any) => ({
      id: t.id,
      title: t.title,
      deadline: t.deadline,
      duration: t.duration,
      priority: t.priority
    }));

    const prompt = `
      Anda adalah AI penjadwal cerdas. Berikut adalah daftar tugas pengguna yang belum selesai:
      ${JSON.stringify(simplifiedTasks, null, 2)}
      
      Tugas Anda adalah menyusun urutan pengerjaan tugas-tugas ini seoptimal mungkin. 
      Aturan:
      1. Utamakan "deadline" yang paling dekat.
      2. Perhatikan "priority" (HIGH > MEDIUM > LOW).
      3. Jika deadline dan prioritas mirip, pertimbangkan "duration" (tugas singkat untuk "quick win").
      
      Anda HARUS mengembalikan output HANYA dalam format JSON berikut:
      {
        "schedule": [
          {
            "taskId": "id_tugas_disini",
            "reason": "Alasan singkat dan padat (maksimal 1 kalimat) mengapa tugas ini ada di urutan ini"
          }
        ]
      }
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      }
    });

    const responseText = result.response.text();
    if (!responseText) {
      throw new Error("Respons kosong dari Gemini");
    }

    const session = await getSession();
    // Increment aiUsageCount for the user
    if (session?.user?.id) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { aiUsageCount: { increment: 1 } }
      });
    }

    const parsedData = JSON.parse(responseText);
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("AI Schedule API error (Gemini):", error);
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan internal pada server AI." },
      { status: 500 }
    );
  }
}
