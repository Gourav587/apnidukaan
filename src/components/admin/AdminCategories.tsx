import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, ArrowUpDown } from "lucide-react";

export function AdminCategories() {
    const queryClient = useQueryClient();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [search, setSearch] = useState("");

    const [form, setForm] = useState({
        name: "", icon: "", sort_order: 0
    });

    const { data: categories } = useQuery({
        queryKey: ["admin-categories"],
        queryFn: async () => {
            const { data } = await supabase.from("categories").select("*").order("sort_order");
            return data || [];
        },
    });

    const saveMutation = useMutation({
        mutationFn: async (payload: any) => {
            const dataToSave: any = {
                name: payload.name,
                sort_order: payload.sort_order,
            };
            if (payload.icon) dataToSave.icon = payload.icon;

            if (editing?.id) {
                const { error } = await supabase.from("categories").update(dataToSave).eq("id", editing.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("categories").insert(dataToSave);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            setDialogOpen(false);
            setEditing(null);
            toast.success(editing ? "Category updated!" : "Category created!");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("categories").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            toast.success("Category deleted");
        },
        onError: (err: any) => {
            toast.error(err.message || "Cannot delete category (it may be used by products)");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveMutation.mutate(form);
    };

    const openForm = (cat?: any) => {
        setEditing(cat);
        setForm(cat ? {
            name: cat.name, icon: cat.icon || "", sort_order: cat.sort_order || 0
        } : {
            name: "", icon: "", sort_order: 0
        });
        setDialogOpen(true);
    };

    const filtered = categories?.filter((c: any) =>
        !search || c.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="font-heading text-2xl font-bold">Categories</h1>
                    <p className="text-sm text-muted-foreground">{filtered.length} categories</p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={(v) => { setDialogOpen(v); if (!v) setEditing(null); }}>
                    <DialogTrigger asChild>
                        <Button className="rounded-xl gap-1" onClick={() => openForm()}><Plus className="h-4 w-4" /> Add Category</Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby={undefined}>
                        <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Category</DialogTitle></DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label>Name *</Label>
                                <Input className="rounded-xl mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                            </div>
                            <div>
                                <Label>Icon (Emoji or URL)</Label>
                                <Input className="rounded-xl mt-1" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
                            </div>
                            <div>
                                <Label>Display Order</Label>
                                <Input type="number" className="rounded-xl mt-1" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
                                <p className="text-[10px] text-muted-foreground mt-1">Lower numbers appear first</p>
                            </div>
                            <Button type="submit" className="w-full rounded-xl" disabled={saveMutation.isPending}>
                                {saveMutation.isPending ? "Saving..." : editing ? "Update Category" : "Add Category"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search categories..." className="pl-9 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="rounded-xl border bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead><div className="flex items-center gap-1"><ArrowUpDown className="h-3 w-3" /> Order</div></TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    No categories found. Create one to get started!
                                </TableCell>
                            </TableRow>
                        ) : filtered.map((c: any) => (
                            <TableRow key={c.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        {c.icon && c.icon.startsWith("http") ? (
                                            <img src={c.icon} alt="" className="h-10 w-10 rounded-lg object-cover bg-muted" />
                                        ) : (
                                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                                {c.icon || c.name.charAt(0)}
                                            </div>
                                        )}
                                        <span className="font-medium">{c.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{c.sort_order}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openForm(c)}><Pencil className="h-3.5 w-3.5" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { if (confirm("Delete this category?")) deleteMutation.mutate(c.id); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
