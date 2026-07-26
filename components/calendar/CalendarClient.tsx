"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { CheckCircle2, Circle } from "lucide-react";

// Types
type Task = {
  id: string;
  title: string;
  description: string | null;
  deadline: Date;
  duration: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "DONE";
};

type CalendarClientProps = {
  tasks: Task[];
};

export default function CalendarClient({ tasks }: CalendarClientProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Define colors based on priority
  const getEventColors = (priority: "LOW" | "MEDIUM" | "HIGH") => {
    switch (priority) {
      case "HIGH":
        return { bg: "#fca5a5", text: "#7f1d1d" }; // light red
      case "MEDIUM":
        return { bg: "#fef08a", text: "#713f12" }; // light yellow
      case "LOW":
        return { bg: "#bbf7d0", text: "#14532d" }; // light green
      default:
        return { bg: "#6D28D9", text: "#ffffff" };
    }
  };

  const events = tasks.map((task) => {
    const colors = getEventColors(task.priority);
    return {
      id: task.id,
      title: task.title,
      // Use YYYY-MM-DD to span the whole day in DayGrid month
      date: new Date(task.deadline).toISOString().split("T")[0],
      backgroundColor: colors.bg,
      borderColor: colors.bg,
      textColor: colors.text,
      extendedProps: {
        originalTask: task
      }
    };
  });

  const handleEventClick = (clickInfo: any) => {
    setSelectedTask(clickInfo.event.extendedProps.originalTask);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-card p-6 md:p-8 rounded-3xl shadow-sm border border-border/50">
      <FullCalendar
        plugins={[dayGridPlugin as any]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        headerToolbar={{
          left: "title",
          right: "prev,next today"
        }}
        height="auto"
        aspectRatio={1.35}
      />

      {/* Task Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedTask?.status === "DONE" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
              {selectedTask?.title}
            </DialogTitle>
            <DialogDescription>
              Detail jadwal Anda
            </DialogDescription>
          </DialogHeader>
          
          {selectedTask && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <span className="font-medium text-muted-foreground">Deadline:</span>
                <span className="col-span-2">
                  {new Date(selectedTask.deadline).toLocaleString("id-ID", {
                    dateStyle: "full",
                    timeStyle: "short"
                  })}
                </span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <span className="font-medium text-muted-foreground">Prioritas:</span>
                <span className="col-span-2 font-semibold">
                  {selectedTask.priority}
                </span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <span className="font-medium text-muted-foreground">Durasi:</span>
                <span className="col-span-2">{selectedTask.duration} Menit</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4 text-sm">
                <span className="font-medium text-muted-foreground">Status:</span>
                <span className="col-span-2">
                  {selectedTask.status === "DONE" ? (
                    <span className="text-green-600 font-semibold">Selesai</span>
                  ) : (
                    <span className="text-orange-600 font-semibold">Belum Selesai (Pending)</span>
                  )}
                </span>
              </div>
              
              {selectedTask.description && (
                <div className="pt-2 border-t mt-4">
                  <span className="font-medium text-sm text-muted-foreground block mb-1">Deskripsi:</span>
                  <p className="text-sm">{selectedTask.description}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
