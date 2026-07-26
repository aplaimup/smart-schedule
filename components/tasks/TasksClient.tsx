"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, CheckCircle2, Circle } from "lucide-react";

// Types
type Task = {
  id: string;
  title: string;
  description: string | null;
  deadline: string;
  duration: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "DONE";
};

export default function TasksClient({ userId }: { userId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    duration: 30,
    priority: "MEDIUM" as "LOW" | "MEDIUM" | "HIGH",
  });

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      toast.error("Gagal mengambil data tugas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Format Date
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", deadline: "", duration: 30, priority: "MEDIUM" });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingId(task.id);
    setFormData({
      title: task.title,
      description: task.description || "",
      deadline: new Date(task.deadline).toISOString().slice(0, 16), // datetime-local format YYYY-MM-DDThh:mm
      duration: task.duration,
      priority: task.priority,
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.deadline) {
        toast.error("Judul dan Deadline wajib diisi");
        return;
      }

      const method = editingId ? "PATCH" : "POST";
      const url = editingId ? `/api/tasks/${editingId}` : "/api/tasks";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan tugas");

      toast.success(editingId ? "Tugas berhasil diperbarui!" : "Tugas baru berhasil ditambahkan!");
      setIsFormOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error("Gagal menyimpan tugas");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      const res = await fetch(`/api/tasks/${deletingId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus tugas");
      
      toast.success("Tugas berhasil dihapus!");
      setIsDeleteOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error("Gagal menghapus tugas");
    }
  };

  const toggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === "PENDING" ? "DONE" : "PENDING";
      
      // Optimistic update
      setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t));

      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        // revert on fail
        setTasks(tasks);
        throw new Error("Gagal mengubah status");
      }
      
      if (newStatus === "DONE") {
        toast.success("Tugas diselesaikan!");
      }
    } catch (error) {
      toast.error("Gagal mengubah status tugas");
    }
  };

  return (
    <div className="bg-card rounded-3xl shadow-sm border border-border/50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Semua Aktivitas</h2>
        <Button onClick={handleOpenAdd} className="rounded-full shadow-sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Aktivitas
        </Button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Memuat data...</div>
      ) : tasks.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          Belum ada aktivitas. Klik "Tambah Aktivitas" untuk mulai.
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Prioritas</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className={task.status === "DONE" ? "opacity-50 bg-secondary/20" : ""}>
                  <TableCell>
                    <button 
                      onClick={() => toggleStatus(task)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {task.status === "DONE" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className={task.status === "DONE" ? "line-through text-muted-foreground" : ""}>
                      {task.title}
                    </div>
                  </TableCell>
                  <TableCell>{formatDateTime(task.deadline)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      task.priority === "HIGH" ? "bg-red-100 text-red-700" :
                      task.priority === "MEDIUM" ? "bg-orange-100 text-orange-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {task.priority}
                    </span>
                  </TableCell>
                  <TableCell>{task.duration} mnt</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(task)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDelete(task.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Aktivitas" : "Tambah Aktivitas"}</DialogTitle>
            <DialogDescription>
              Isi detail tugas di bawah ini lalu klik simpan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul Tugas</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                placeholder="Rapat tim Mingguan" 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                placeholder="Membahas progres proyek..." 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input 
                  id="deadline" 
                  type="datetime-local" 
                  value={formData.deadline} 
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Durasi (Menit)</Label>
                <Input 
                  id="duration" 
                  type="number" 
                  value={formData.duration} 
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})} 
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Prioritas</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(val: "LOW"|"MEDIUM"|"HIGH") => setFormData({...formData, priority: val})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih prioritas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Rendah (LOW)</SelectItem>
                  <SelectItem value="MEDIUM">Sedang (MEDIUM)</SelectItem>
                  <SelectItem value="HIGH">Tinggi (HIGH)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hapus Aktivitas</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
