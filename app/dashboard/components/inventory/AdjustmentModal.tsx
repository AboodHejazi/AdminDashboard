import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdjustmentModal({ item, onClose, onConfirm }: any) {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<"add" | "remove">("add");
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[400px] shadow-xl">
        <h2 className="text-xl font-bold mb-2">Adjust Stock: {item.name}</h2>
        <p className="text-sm text-slate-500 mb-6">Current Quantity: {item.quantity}</p>

        <div className="flex gap-2 mb-4">
          <Button 
            className={`flex-1 ${type === "add" ? "bg-emerald-600" : "bg-slate-100 text-slate-600"}`}
            onClick={() => setType("add")}
          > + Add </Button>
          <Button 
            className={`flex-1 ${type === "remove" ? "bg-rose-600" : "bg-slate-100 text-slate-600"}`}
            onClick={() => setType("remove")}
          > - Remove </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500">QUANTITY</label>
            <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500">REASON</label>
            <select className="w-full border rounded-md p-2 text-sm" onChange={(e) => setReason(e.target.value)}>
              <option>Purchase New Stock</option>
              <option>Damaged Goods</option>
              <option>Return from Customer</option>
              <option>Manual Correction</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          <Button variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 bg-blue-600" onClick={() => onConfirm(amount, type)}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}