import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes("sk-...")) {
      return NextResponse.json(
        { error: "API Key OpenAI belum dikonfigurasi di environment variables." },
        { status: 500 }
      );
    }

    const { tasks } = await req.json();

    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json(
        { error: "Tidak ada tugas PENDING yang dikirimkan." },
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

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Model cepat dan murah yang mendukung JSON mode
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a helpful scheduling assistant designed to output JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2, // Rendah agar lebih deterministik
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("Respons kosong dari OpenAI");
    }

    const parsedData = JSON.parse(responseContent);
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("AI Schedule API error:", error);
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan internal pada server AI." },
      { status: 500 }
    );
  }
}
