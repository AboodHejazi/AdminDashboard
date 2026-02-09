"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, ChevronLeft, ChevronRight, Package, User, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* =======================
    Interfaces & Types
======================= */
export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Refunded";

export interface Order {
  id: string;
  customer: string;
  status: OrderStatus;
  amount: string;
}

/* =======================
    Data
======================= */
const orders: Order[] = [
  { id: "ORD-7281", customer: "Sarah Ahmed", status: "Shipped", amount: "$120.00" },
  { id: "ORD-7282", customer: "Michael Chen", status: "Processing", amount: "$45.00" },
  { id: "ORD-7283", customer: "Layla Hassan", status: "Delivered", amount: "$320.00" },
  { id: "ORD-7284", customer: "James Wilson", status: "Cancelled", amount: "$89.00" },
  { id: "ORD-7285", customer: "Ahmad Sami", status: "Pending", amount: "$210.00" },
  { id: "ORD-7286", customer: "Noor Ali", status: "Refunded", amount: "$55.00" },
  { id: "ORD-7287", customer: "Samer Ali", status: "Shipped", amount: "$55.00" },
  { id: "ORD-7288", customer: "Huda Mansour", status: "Delivered", amount: "$150.00" },
  { id: "ORD-7289", customer: "Huda Mansour", status: "Delivered", amount: "$150.00" },
];

const lowStockItems = [
  { name: "G5 Bluetooth Earbuds", stock: 3 },
  { name: "airpods copy2", stock: 1 },
  { name: "mac laptop", stock: 0 },
  { name: "hp lap", stock: 4 },
  { name: "gaming keypoard", stock: 9 },
  { name: "razer mouse", stock: 11 },
];

/* =======================
    Columns Configuration
======================= */
const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: () => <div className="flex items-center gap-2"><Package size={14}/> ID</div>,
    cell: ({ row }) => <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded tracking-tighter">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "customer",
    header: () => <div className="flex items-center gap-2"><User size={14}/> Customer</div>,
    cell: ({ row }) => <span className="font-semibold text-slate-700">{row.getValue("customer")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as OrderStatus;
      const statusStyles: Record<OrderStatus, string> = {
        Pending: "bg-slate-100 text-slate-700 border-slate-200",
        Processing: "bg-blue-50 text-blue-700 border-blue-100",
        Shipped: "bg-amber-50 text-amber-700 border-amber-100",
        Delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
        Cancelled: "bg-rose-50 text-rose-700 border-rose-100",
        Refunded: "bg-purple-50 text-purple-700 border-purple-100",
      };
      return (
        <span className={cn(
          "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm shrink-0 min-h-[24px] flex items-center justify-center",
          statusStyles[status]
        )}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right flex items-center justify-end gap-1"><DollarSign size={14}/> Amount</div>,
    cell: ({ row }) => <div className="text-right font-black text-slate-900 tabular-nums">{row.getValue("amount")}</div>,
  },
];

/* =======================
    Main Component
======================= */
export default function DashboardTable() {
  // --- Pagination Logic for Orders Table ---
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
        pagination: { pageSize: 5 }
    }
  });

  // --- Manual Pagination Logic for Stock Alerts ---
  const [stockPage, setStockPage] = useState(0);
  const stockPageSize = 4; // عدد العناصر في الكارد الصغير
  const totalStockPages = Math.ceil(lowStockItems.length / stockPageSize);
  
  const currentStockItems = lowStockItems.slice(
    stockPage * stockPageSize,
    (stockPage + 1) * stockPageSize
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 w-full p-2">

      {/* 1. Recent Orders Section */}
      <Card className="col-span-full lg:col-span-5 border border-slate-200 shadow-xl shadow-slate-200/50 bg-white rounded-2xl overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-5 border-b border-slate-50">
          <div className="space-y-1">
            <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Recent Orders</CardTitle>
            <p className="text-xs text-slate-400 font-medium">Monthly performance overview</p>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex-grow">
          <div className="overflow-x-auto px-2">
            <table className="w-full text-sm border-separate border-spacing-y-2 align-middle">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest align-middle">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="group bg-white hover:bg-slate-50 transition-all duration-200 align-middle">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-4 first:rounded-l-xl last:rounded-r-xl border-y first:border-l last:border-r border-slate-100 group-hover:border-slate-200 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>

        {/* Orders Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/50 border-t mt-auto">
          <span className="text-[11px] text-slate-500 font-bold tracking-widest uppercase">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border border-slate-200 shadow-sm rounded-lg bg-white disabled:opacity-40"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border border-slate-200 shadow-sm rounded-lg bg-white disabled:opacity-40"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </Card>

      {/* 2. Stock Alerts Section with Pagination */}
      <Card className="col-span-full lg:col-span-2 border border-slate-200 bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden flex flex-col h-full min-h-[500px]">
        <CardHeader className="bg-orange-50/30 border-b border-orange-100 py-5 px-6">
          <CardTitle className="text-lg font-black flex items-center gap-2 text-orange-700 tracking-tight">
            <AlertTriangle size={18} className="animate-pulse text-orange-600" />
            Stock Alerts
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 space-y-3 flex-grow">
          <div className="space-y-3 min-h-[320px]">
              {currentStockItems.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-100 hover:border-orange-300 transition-all duration-300 shadow-sm animate-in fade-in slide-in-from-right-2"
                >
                  <div className="space-y-1.5">
                    <p className="text-[13px] font-black text-slate-800 leading-tight">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        item.stock === 0 ? "bg-red-500" : "bg-orange-500 animate-ping"
                      )} />
                      <p className={cn(
                        "text-[10px] font-black tracking-widest uppercase italic",
                        item.stock === 0 ? "text-red-600" : "text-orange-600"
                      )}>
                        {item.stock === 0 ? "Out of Stock" : `${item.stock} left`}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="h-8 px-4 text-[10px] bg-slate-900 hover:bg-orange-600 text-white font-black rounded-lg transition-all active:scale-90"
                  >
                    RESTOCK
                  </Button>
                </div>
              ))}
          </div>
        </CardContent>

        {/* Stock Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-orange-50/20 border-t mt-auto">
            <span className="text-[10px] text-orange-800 font-bold uppercase tracking-tighter">
              page {stockPage + 1} of {totalStockPages}
            </span>
            <div className="flex gap-2">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full hover:bg-orange-100 text-orange-700"
                    onClick={() => setStockPage(prev => Math.max(0, prev - 1))}
                    disabled={stockPage === 0}
                >
                    <ChevronLeft size={14} />
                </Button>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-full hover:bg-orange-100 text-orange-700"
                    onClick={() => setStockPage(prev => Math.min(totalStockPages - 1, prev + 1))}
                    disabled={stockPage === totalStockPages - 1}
                >
                    <ChevronRight size={14} />
                </Button>
            </div>
        </div>
      </Card>
    </div>
  );
}