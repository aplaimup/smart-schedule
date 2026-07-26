export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-2xl">
        {/* Logo & Brand */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-foreground"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <path d="m9 16 2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Smart Schedule{" "}
            <span className="text-primary">AI</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          Manajemen jadwal cerdas berbasis kecerdasan buatan.
          <br />
          Optimalkan waktu Anda, atur prioritas, dan sinkronkan kalender secara otomatis.
        </p>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          Project Setup Complete — Ready for Development
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            "Next.js 15",
            "TypeScript",
            "Tailwind CSS",
            "shadcn/ui",
            "Prisma",
            "OpenAI",
            "FullCalendar",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-md bg-accent text-accent-foreground text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
