"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";

export function RecentSales() {
  const sales = [
    { name: "Olivia Martin", email: "olivia@email.com", amount: "+$1,999.00", initial: "OM" },
    { name: "Jackson Lee", email: "jackson@email.com", amount: "+$39.00", initial: "JL" },
    { name: "Isabella Nguyen", email: "isabella@email.com", amount: "+$299.00", initial: "IN" },
    { name: "William Kim", email: "will@email.com", amount: "+$99.00", initial: "WK" },
    { name: "Sofia Davis", email: "sofia@email.com", amount: "+$39.00", initial: "SD" },
    { name: "Fadi H.", email: "fadi@email.com", amount: "+$500.00", initial: "FH" },
    { name: "Ahmad Ali", email: "ahmad@email.com", amount: "+$120.00", initial: "AA" },
    { name: "Sara Noor", email: "sara@email.com", amount: "+$450.00", initial: "SN" },
  ];

  // --- منطق الترقيم ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // عدد المبيعات في كل صفحة

  const totalPages = Math.ceil(sales.length / itemsPerPage);
  
  // تحديد العناصر التي ستظهر في الصفحة الحالية فقط
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSales = sales.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      {/* قائمة المبيعات مع حركة ناعمة عند التغيير */}
      <div className="h-[350px] space-y-8">
        {currentSales.map((sale) => (
          <div key={sale.email} className="flex items-center animate-in fade-in slide-in-from-right-2 duration-300">
            <Avatar className="h-9 w-9 border border-slate-100 shadow-sm">
              <AvatarFallback className="bg-slate-50 text-slate-900 font-semibold text-xs">
                {sale.initial}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-semibold leading-none text-slate-800">{sale.name}</p>
              <p className="text-xs text-muted-foreground">{sale.email}</p>
            </div>
            <div className="ml-auto font-bold text-emerald-600 text-sm tracking-tight">
              {sale.amount}
            </div>
          </div>
        ))}
      </div>

      {/* --- أزرار الترقيم المحسنة --- */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <p className="text-xs text-muted-foreground font-medium">
          Showing <span className="text-slate-900">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sales.length)}</span> of {sales.length}
        </p>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg shadow-sm disabled:opacity-30"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "ghost"}
                className={cn(
                  "h-8 w-8 p-0 rounded-lg text-xs font-bold transition-all",
                  currentPage === i + 1 ? "shadow-md shadow-slate-200" : "hover:bg-slate-100"
                )}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg shadow-sm disabled:opacity-30"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}