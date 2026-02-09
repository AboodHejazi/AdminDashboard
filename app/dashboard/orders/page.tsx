"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel, 
  flexRender 
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { OrderToolbar } from "../components/orders/OrderToolbar";
import { getColumns, Order, OrderStatus } from "../components/orders/OrderColumns";



const initialOrders: Order[] = [
  { id: "ORD-1023", customer: "Ali Ahmad", itemsCount: 3, total: 120, status: "Pending", date: "2026-02-05" },
  { id: "ORD-1024", customer: "Sara Jamil", itemsCount: 1, total: 55, status: "Shipped", date: "2026-02-06" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // منطق التحديث (يشبه الباك اند)
  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  // الفلترة
  const filteredData = useMemo(() => {
    return orders.filter(o => 
      (statusFilter === "all" || o.status === statusFilter) &&
      (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search))
    );
  }, [orders, search, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: getColumns(updateStatus), // نمرر دالة التحديث للأعمدة
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage your store transactions here.</p>
      </div>

      <OrderToolbar 
        search={search} 
        onSearchChange={setSearch} 
        statusFilter={statusFilter} 
        onStatusChange={setStatusFilter} 
      />

      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id}>
                {hg.headers.map(h => (
                  <TableHead key={h.id} className="font-bold">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
        </div>
      </div>
    </div>
  );
}