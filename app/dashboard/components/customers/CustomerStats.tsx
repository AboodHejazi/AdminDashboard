"use client";

import { Users, UserCheck, UserMinus, DollarSign } from "lucide-react";

export function CustomerStats() {
  const stats = [
    { label: "Total Customers", value: "1,245", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Now", value: "842", icon: UserCheck, iconColor: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Blocked", value: "12", icon: UserMinus, iconColor: "text-rose-600", bg: "bg-rose-50" },
    { label: "Avg. Lifetime Value", value: "$1,230", icon: DollarSign, iconColor: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className={`p-3 rounded-lg ${stat.bg}`}>
            <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
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
