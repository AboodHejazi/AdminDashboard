"use client";

import { DataTable } from "@/app/components/ui/data-table";
import { Customer } from "@/app/types/customer";
import { ColumnDef } from "@tanstack/react-table";

interface CustomersTableProps {
  data: Customer[];
  columns: ColumnDef<Customer>[];
}

export function CustomersTable({ data, columns }: CustomersTableProps) {
  return <DataTable columns={columns} data={data} />;
}