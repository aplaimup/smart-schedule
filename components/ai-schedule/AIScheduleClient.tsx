"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, AlertCircle } from "lucide-react";

type Task = {
  id: string;
  title: string;
  deadline: Date;
  duration: number;
  priority: string;
};

type AIScheduleItem = {
  taskId: string;
  reason: string;
};

type Props = {
  tasks: Task[];
};

export default function AIScheduleClient({ tasks }: Props) {
  const [schedule, setSchedule] = useState<AIScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSchedule = async () => {
    if (tasks.length === 0) {
      toast.error("Anda tidak memiliki aktivitas yang berstatus PENDING.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/ai-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal menghubungi AI");
      }

      if (data.schedule && Array.isArray(data.schedule)) {
        setSchedule(data.schedule);
        toast.success("AI berhasil menyusun jadwal Anda!");
      } else {
        throw new Error("Format balasan AI tidak valid");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper untuk mendapatkan detail tugas asli
  const getTaskDetails = (taskId: string) => {
    return tasks.find(t => t.id === taskId);
  };

  return (
    <div className="space-y-8">
      <div className="bg-card p-6 md:p-10 rounded-3xl shadow-sm border border-border/50 text-center">
        <h2 className="text-xl font-bold mb-3 tracking-tight">Optimasi Jadwal Cerdas</h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-lg mx-auto leading-relaxed">
          AI kami akan menganalisis {tasks.length} aktivitas Anda yang belum selesai. Kami mengukur kombinasi <span className="font-medium text-foreground">deadline</span>, <span className="font-medium text-foreground">prioritas</span>, dan <span className="font-medium text-foreground">durasi</span> untuk merekomendasikan urutan pengerjaan yang paling optimal.
        </p>
        
        <Button 
          onClick={generateSchedule} 
          disabled={isLoading || tasks.length === 0}
          className="rounded-full h-12 px-8 shadow-md font-semibold bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <span className="flex items-center gap-2 animate-pulse">
              <Sparkles className="w-5 h-5" /> AI Sedang Menganalisis...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Generate Schedule
            </span>
          )}
        </Button>
      </div>

      {schedule.length > 0 && (
        <div className="bg-card p-6 md:p-8 rounded-3xl shadow-sm border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            Rekomendasi Urutan Pengerjaan
          </h3>
          
          <div className="space-y-4">
            {schedule.map((item, index) => {
              const taskDetail = getTaskDetails(item.taskId);
              if (!taskDetail) return null;

              return (
                <div key={item.taskId} className="flex gap-4 p-5 rounded-2xl bg-secondary/30 border border-secondary hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-lg border border-primary/20">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate text-lg">
                      {taskDetail.title}
                    </h4>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mt-2 mb-3 font-medium">
                      <span className="flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> 
                        Prioritas: {taskDetail.priority}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> 
                        {taskDetail.duration} Menit
                      </span>
                      <span className="flex items-center gap-1.5 text-primary">
                        🗓️ {new Date(taskDetail.deadline).toLocaleDateString("id-ID", {
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="bg-background/80 p-3.5 rounded-xl border border-border/50 text-sm mt-3 flex gap-3 items-start">
                      <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <p className="text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">Alasan AI: </span> 
                        {item.reason}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
