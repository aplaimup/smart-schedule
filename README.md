# Smart Schedule AI 🚀

Smart Schedule AI adalah aplikasi manajemen jadwal cerdas yang dirancang untuk membantu Anda mengoptimalkan waktu, mengatur prioritas tugas, dan menyusun urutan pekerjaan secara otomatis menggunakan kecerdasan buatan (Google Gemini).

## 🌟 Fitur Utama
- **Manajemen Tugas Lengkap**: Buat, edit, hapus, dan tandai tugas Anda (CRUD).
- **Kalender Visual**: Tampilan kalender bulanan interaktif yang menampilkan *deadline* tugas Anda secara visual dengan indikator warna berbasis prioritas.
- **AI Schedule Generator**: Biarkan Google Gemini menganalisis prioritas, *deadline*, dan durasi tugas-tugas Anda yang belum selesai untuk memberikan rekomendasi urutan pengerjaan terbaik (memanfaatkan fitur *JSON Structured Output*).
- **Dashboard & Produktivitas**: Pantau kinerja Anda melalui grafik/ringkasan produktivitas harian.
- **Autentikasi (Simulasi)**: Rute-rute internal sepenuhnya terproteksi melalui Next.js Proxy/Middleware.

## 🛠️ Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **UI/Styling**: Tailwind CSS + Shadcn UI
- **Database ORM**: Prisma
- **Database**: PostgreSQL
- **Kecerdasan Buatan**: SDK `@google/generative-ai` (Model: Gemini 1.5 Flash)
- **Komponen Spesial**: FullCalendar (untuk fitur kalender interaktif)

---

## 💻 Panduan Instalasi (Development)

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di lingkungan lokal Anda.

### 1. Clone & Install Dependencies
Pastikan Anda sudah menginstal Node.js dan NPM.
```bash
git clone https://github.com/aplaimup/smart-schedule.git
cd smart-schedule
npm install
```

### 2. Setup Environment Variables
Salin file konfigurasi contoh ke `.env`:
```bash
cp .env.example .env
```
Buka file `.env` dan sesuaikan nilainya:
- `DATABASE_URL`: Pastikan mengarah ke database PostgreSQL lokal atau *cloud* (seperti Supabase/Neon/Railway).
- `GEMINI_API_KEY`: Dapatkan kunci API secara gratis dari [Google AI Studio](https://aistudio.google.com/) dan letakkan di sini.

### 3. Migrasi Database (Prisma)
Agar struktur tabel tercipta di database PostgreSQL Anda, jalankan:
```bash
npm run dev -- prisma generate
npm run dev -- prisma db push
```
*(Catatan: Anda juga bisa menggunakan `prisma migrate dev` jika Anda ingin menyimpan riwayat migrasi).*

### 4. Jalankan Server Lokal
```bash
npm run dev
```
Buka peramban (browser) dan akses `http://localhost:3000`.

---

## 🧠 Catatan AI Schedule
Jika fitur AI Schedule menampilkan peringatan atau error, pastikan:
1. File `.env` sudah memuat `GEMINI_API_KEY` yang benar.
2. Anda memiliki jaringan internet yang stabil untuk menghubungi server Google.
3. Anda memiliki minimal satu tugas berstatus `PENDING` di sistem.

## 📜 Lisensi
Aplikasi ini dikembangkan sebagai purwarupa (prototype) untuk manajemen waktu yang efisien.
© 2026 Kelompok 7 • Teknik Informatika • Universitas Malikussaleh.
