import { InventoryItem } from "@/app/types/inventory";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, Edit3, ArrowUpDown } from "lucide-react";

interface Props {
  items: InventoryItem[];
  onAdjustClick: (item: InventoryItem) => void;
  onHistoryClick: (item: InventoryItem) => void;
  onEditClick: (item: InventoryItem) => void;
}

export function InventoryTable({ items, onAdjustClick, onHistoryClick, onEditClick }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-y border-slate-200">
          <tr>
            <th className="p-4 font-semibold text-slate-600 text-sm">Product Name</th>
            <th className="p-4 font-semibold text-slate-600 text-sm text-center">In Stock</th>
            <th className="p-4 font-semibold text-slate-600 text-sm text-center">Status</th>
            <th className="p-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
              <td className="p-4">
                <p className="font-medium text-slate-800">{item.name}</p>
                <p className="text-[10px] text-slate-400 font-mono">{item.sku} • {item.category}</p>
              </td>
              <td className="p-4 text-center">
                <span className="font-bold text-slate-700">{item.quantity}</span>
              </td>
              <td className="p-4 text-center">
                <Badge className={item.status === "In Stock" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}>
                  {item.status}
                </Badge>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" onClick={() => onAdjustClick(item)}><ArrowUpDown className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onHistoryClick(item)}><History className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onEditClick(item)}><Edit3 className="h-4 w-4 text-blue-600" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}