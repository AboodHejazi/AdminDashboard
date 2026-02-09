"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MoreVertical,
  ArrowRight
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";


export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  customer: string;
  itemsCount: number;
  total: number;
  status: OrderStatus;
  date: string;
};

export const getColumns = (updateStatus: (id: string, s: OrderStatus) => void): ColumnDef<Order>[] => [
  // ... بقية الأعمدة السابقة (ID, Customer, Total)
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <span className="font-mono font-medium text-slate-500">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <span className="font-semibold text-slate-700">{row.getValue("customer")}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as OrderStatus;
      const config = {
        Pending: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
        Processing: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: Truck },
        Shipped: { color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: Truck },
        Delivered: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
        Cancelled: { color: "bg-rose-100 text-rose-700 border-rose-200", icon: XCircle },
      };
      const { color, icon: Icon } = config[status];
      return (
        <Badge variant="outline" className={`${color} flex w-fit items-center gap-1.5 px-2.5 py-0.5 capitalize shadow-none font-medium`}>
          <Icon className="w-3.5 h-3.5" />
          {status}
        </Badge>
      );
    },
  },
  // ... (نفس الـ Imports السابقة)

{
  id: "actions",
  header: () => <div className="text-right px-4">Operations</div>,
  cell: ({ row }) => {
    const orderId = row.original.id;

    return (
      <div className="flex items-center justify-end px-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border-slate-300 shadow-sm px-4 h-9 rounded-lg transition-all"
            >
              <span className="text-xs font-bold text-slate-700">Manage Order</span>
              <MoreVertical className="h-4 w-4 text-slate-500" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={8}
            className="w-[260px] rounded-xl bg-slate-50 border border-slate-200 p-1.5 shadow-xl z-[9999]"
          >
            {/* --- Section: General --- */}
            <div className="px-3 py-2 mb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">General</p>
            </div>

            <button className="cursor-pointer  group w-full flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200">
              <div className="p-2 rounded-md bg-white group-hover:bg-blue-50 text-blue-600 shadow-sm transition-colors">
                <Eye className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-700">View Details</p>
                <p className="text-[10px] text-slate-500">Full information</p>
              </div>
            </button>

            <div className="my-1 border-b border-slate-200/60" />

            {/* --- Section: Status Control --- */}
            <div className="px-3 py-2 mb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Status</p>
            </div>

            {/* Processing */}
            <button
              onClick={() => updateStatus(orderId, "Processing")}
              className="cursor-pointer  group w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200 mb-1"
            >
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              <span className="text-sm font-bold text-slate-700">Mark as Processing</span>
            </button>

            {/* Shipped */}
            <button
              onClick={() => updateStatus(orderId, "Shipped")}
              className="  cursor-pointer group w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200 mb-1"
            >
              <Truck className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              <span className="text-sm font-bold text-slate-700">Mark as Shipped</span>
            </button>

            {/* Delivered */}
            <button
              onClick={() => updateStatus(orderId, "Delivered")}
              className="cursor-pointer  group w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-200 mb-1"
            >
              <CheckCircle2 className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              <span className="text-sm font-bold text-slate-700">Mark as Delivered</span>
            </button>

            {/* Cancelled */}
           {/* زر الإلغاء - Cancel Order */}
<button
  onClick={() => updateStatus(orderId, "Cancelled")}
  className="cursor-pointer  group w-full mt-2 flex items-center gap-3 py-2.5 px-3 rounded-lg 
  bg-transparent border border-transparent 
  hover:bg-red-50 hover:border-red-200 
  hover:shadow-sm hover:scale-[1.02]
  transition-all duration-200"
>
  <div className="p-2 rounded-md bg-slate-100 
    text-slate-500 
    group-hover:bg-red-100 
    group-hover:text-red-600 
    group-hover:scale-110 
    transition-all duration-200"
  >
    <XCircle className="h-4 w-4" />
  </div>

  <div className="text-left flex flex-col">
    <span className="text-sm font-bold text-slate-700 group-hover:text-red-700 transition-colors">
      Cancel Order
    </span>
    <span className="text-[10px] text-slate-500 group-hover:text-red-500 transition-colors">
      Terminate process
    </span>
  </div>
</button>

          </PopoverContent>
        </Popover>
      </div>
    );
  },
}
];