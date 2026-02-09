import { X, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function HistoryDrawer({ item, onClose }: any) {
  // بيانات تجريبية للسجل
  const logs = [
    { id: 1, type: "add", qty: 10, reason: "Restock", date: "2024-05-10 14:00" },
    { id: 2, type: "remove", qty: 2, reason: "Customer Order #102", date: "2024-05-09 09:30" },
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl z-50 p-6 border-l animate-in slide-in-from-right">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">Stock History</h2>
        <button onClick={onClose}><X /></button>
      </div>
      
      <div className="mb-6 p-4 bg-slate-50 rounded-lg">
        <p className="text-sm text-slate-500">Product</p>
        <p className="font-bold text-lg">{item.name}</p>
        <p className="text-xs font-mono text-slate-400">{item.sku}</p>
      </div>

      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${log.type === "add" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                {log.type === "add" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
              <div>
                <p className="text-sm font-bold">{log.reason}</p>
                <p className="text-[10px] text-slate-400">{log.date}</p>
              </div>
            </div>
            <span className={`font-mono font-bold ${log.type === "add" ? "text-emerald-600" : "text-rose-600"}`}>
              {log.type === "add" ? "+" : "-"}{log.qty}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}