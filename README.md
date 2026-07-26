# 🗓️ Smart Schedule AI

Aplikasi manajemen jadwal berbasis kecerdasan buatan (AI).

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Frontend    | Next.js 15 (App Router) + TypeScript |
| Styling     | Tailwind CSS + shadcn/ui            |
| Database    | PostgreSQL + Prisma ORM             |
| AI          | OpenAI API                          |
| Calendar    | FullCalendar                        |
| Deployment  | Vercel (frontend) + Supabase/Railway (database) |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Folder

```
smart-schedule/
├── app/              # Next.js App Router (pages, layouts, API routes)
├── components/       # Reusable React components
│   └── ui/           # shadcn/ui components
├── lib/              # Utility functions & shared logic
├── prisma/           # Prisma schema & migrations (setup selanjutnya)
├── public/           # Static assets
└── ...config files
```

## Tema

- **Warna utama**: Ungu (`#6D28D9`)
- **Background**: Abu-abu sangat muda
- **Font**: Poppins (Google Fonts)
- **Dark mode**: Supported

## License

MIT
