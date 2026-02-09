// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
// import { CustomerActions } from "./CustomerActions";
// import { Customer } from "@/app/types/customer";

// export const columns: ColumnDef<Customer>[] = [
//   {
//     accessorKey: "name",
//     header: "Customer",
//     cell: ({ row }) => (
//       <div className="flex items-center gap-3">
//         <Avatar className="h-9 w-9 border border-slate-200">
//           {row.original.avatar && <AvatarImage src={row.original.avatar} />}
//           <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
//         </Avatar>
//         <div className="flex flex-col">
//           <span className="font-bold text-slate-700 text-sm">{row.original.name}</span>
//           <span className="text-xs text-slate-400">{row.original.email}</span>
//         </div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.getValue("status") as string;
//       return (
//         <Badge
//           className={
//             status === "Active"
//               ? "bg-emerald-50 text-emerald-700 border-emerald-100"
//               : "bg-rose-50 text-rose-700 border-rose-100"
//           }
//         >
//           {status}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "totalSpent",
//     header: "Total Spent",
//     cell: ({ row }) => (
//       <span className="font-mono font-bold text-slate-700">${row.original.totalSpent}</span>
//     ),
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => <CustomerActions customer={row.original} />,
//   },
// ];


"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { CustomerActions } from "./CustomerActions";
import { Customer } from "@/app/types/customer";

export const getColumns = (
  onDelete: (id: string) => void,
  onEdit: (customer: Customer) => void
): ColumnDef<Customer>[] => [
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 border border-slate-200">
          {row.original.avatar && <AvatarImage src={row.original.avatar} />}
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-bold text-slate-700 text-sm">{row.original.name}</span>
          <span className="text-xs text-slate-400">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          className={
            status === "Active"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-rose-50 text-rose-700 border-rose-100"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent",
    cell: ({ row }) => (
      <span className="font-mono font-bold text-slate-700">${row.original.totalSpent}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CustomerActions 
        customer={row.original} 
        onDelete={onDelete} 
        onEdit={onEdit} 
      />
    ),
  },
];