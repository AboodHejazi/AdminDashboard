// "use client";

// import { Customer } from "@/app/types/customer";
// import { Button } from "@/components/ui/button";
// import { Trash, Eye, Pencil } from "lucide-react";

// interface Props {
//   customer: Customer;
//   onDelete: (id: string) => void;
// }

// export function CustomerActions({ customer, onDelete }: Props) {
//   return (
//     <div className="flex items-center justify-end gap-2">
//       {/* زر العرض */}
//       <Button
//         size="icon"
//         variant="ghost"
//         className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
//         onClick={() => alert(`Viewing ${customer.name}`)}
//       >
//         <Eye className="h-4 w-4" />
//       </Button>

//       {/* زر الحذف */}
//       <Button
//         size="icon"
//         variant="ghost"
//         className="h-8 w-8 text-slate-500 hover:text-rose-600 hover:bg-rose-50"
//         onClick={() => {
//           if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
//             onDelete(customer.id);
//           }
//         }}
//       >
//         <Trash className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }

"use client";

import { Customer } from "@/app/types/customer";
import { Button } from "@/components/ui/button";
import { Trash, Eye, Pencil } from "lucide-react";

interface Props {
  customer: Customer;
  onDelete: (id: string) => void;
  onEdit: (customer: Customer) => void;
}

export function CustomerActions({ customer, onDelete, onEdit }: Props) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
        onClick={() => onEdit(customer)}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 text-slate-500 hover:text-rose-600 hover:bg-rose-50"
        onClick={() => {
          if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
            onDelete(customer.id);
          }
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}