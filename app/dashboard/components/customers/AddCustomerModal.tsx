"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { X, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Customer } from "@/app/types/customer";

type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  onAdd: (customer: Customer) => void;
};

export const AddCustomerModal = ({ open, onOpenChange, onAdd }: Props) => {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: ""
  });

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setNewCustomer(prev => ({ ...prev, avatar: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) return alert("Name and email required!");

    onAdd({
      id: Date.now().toString(),
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      avatar: newCustomer.avatar,
      status: "Active",
    });

    setNewCustomer({ name: "", email: "", phone: "", avatar: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className={cn(
              "relative group border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 min-h-[120px]",
              newCustomer.avatar ? "border-blue-400 bg-blue-50/10" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
            )}
          >
            {newCustomer.avatar ? (
              <div className="relative w-24 h-24">
                <img src={newCustomer.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                <button
                  type="button"
                  onClick={() => setNewCustomer({...newCustomer, avatar: ""})}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="w-6 h-6 text-blue-600" />
                <span className="text-xs text-slate-400">Drag & drop or click to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </>
            )}
          </div>

          <div>
            <Label>Name</Label>
            <Input value={newCustomer.name} onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})} required />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={newCustomer.email} onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})} type="email" required />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={newCustomer.phone} onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})} />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Add Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
