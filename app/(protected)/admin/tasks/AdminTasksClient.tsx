"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type TaskWithUser = {
  id: string;
  title: string;
  deadline: Date;
  duration: number;
  priority: string;
  status: string;
  createdAt: Date;
  user: {
    name: string;
    email: string;
  };
};

export default function AdminTasksClient({ initialTasks }: { initialTasks: TaskWithUser[] }) {
  const [tasks] = useState<TaskWithUser[]>(initialTasks);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH": return "destructive";
      case "MEDIUM": return "default";
      case "LOW": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/50">
          <TableRow>
            <TableHead>Pemilik</TableHead>
            <TableHead>Task</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Durasi</TableHead>
            <TableHead>Prioritas</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <div className="font-medium">{task.user.name}</div>
                <div className="text-xs text-muted-foreground">{task.user.email}</div>
              </TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                {format(new Date(task.deadline), "dd MMM yyyy, HH:mm", { locale: localeId })}
              </TableCell>
              <TableCell>{task.duration} mnt</TableCell>
              <TableCell>
                <Badge variant={getPriorityColor(task.priority) as any}>
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Badge variant={task.status === "DONE" ? "outline" : "default"} className={task.status === "DONE" ? "text-green-500 border-green-500" : ""}>
                  {task.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                Belum ada task di sistem.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
