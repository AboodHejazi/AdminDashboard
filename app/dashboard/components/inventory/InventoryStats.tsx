import { InventoryItem } from "@/app/types/inventory";
import { Package, AlertTriangle, XCircle, PowerOff } from "lucide-react";

export function InventoryStats({ data }: { data: InventoryItem[] }) {
  const stats = [
    { label: "Total Products", value: data.length, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Low Stock", value: data.filter(i => i.status === "Low Stock").length, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Out of Stock", value: data.filter(i => i.status === "Out of Stock").length, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Inactive", value: data.filter(i => i.status === "Inactive").length, icon: PowerOff, color: "text-slate-600", bg: "bg-slate-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}