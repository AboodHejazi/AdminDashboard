// "use client";

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { TableToolbar } from "../common/TableToolbar";
// import { useState, useMemo } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// // 1. تأكد أن المصفوفة معرفة هنا (خارج الكومبوننت)
// type Product = {
//   id: number;
//   name: string;
//   price: string;
//   stock: number;
// };

// const initialProducts: Product[] = [
//   { id: 1, name: "Running Shoes", price: "$120", stock: 5 },
//   { id: 2, name: "T-Shirt", price: "$30", stock: 0 },
//   { id: 3, name: "Jeans", price: "$60", stock: 14 },
//   { id: 4, name: "Smart Watch", price: "$200", stock: 8 },
//   { id: 5, name: "Laptop Bag", price: "$45", stock: 0 },
//   { id: 6, name: "Hoodie", price: "$55", stock: 20 },
//   { id: 7, name: "Socks", price: "$10", stock: 50 },
// ];

// const filterOptions = [
//   { label: "All Products", value: "all" },
//   { label: "Out of Stock", value: "oos" },
//   { label: "In Stock", value: "in-stock" },
// ];

// export default function ProductsItems() {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // 2. منطق الفلترة (الآن initialProducts أصبحت مرئية هنا)
//   const filteredData = useMemo(() => {
//     let data = [...initialProducts]; // نأخذ نسخة من البيانات
//     if (statusFilter === "oos") data = data.filter((p) => p.stock === 0);
//     if (statusFilter === "in-stock") data = data.filter((p) => p.stock > 0);
//     return data;
//   }, [statusFilter]);

//   const columns: ColumnDef<Product>[] = [
//     {
//       accessorKey: "id",
//       header: "# ID",
//       cell: ({ row }) => <span className="text-muted-foreground">#{row.getValue("id")}</span>,
//     },
//     {
//       accessorKey: "name",
//       header: "Product Name",
//       cell: ({ row }) => <span className="font-bold">{row.getValue("name")}</span>,
//     },
//     {
//       accessorKey: "price",
//       header: "Price",
//       cell: ({ row }) => <span className="font-mono">{row.getValue("price")}</span>,
//     },
//     {
//       accessorKey: "stock",
//       header: "Inventory",
//       cell: ({ row }) => {
//         const stock = row.getValue("stock") as number;
//         return (
//           <Badge variant={stock === 0 ? "destructive" : stock < 10 ? "outline" : "secondary"}>
//             {stock === 0 ? "Out of Stock" : `${stock} in stock`}
//           </Badge>
//         );
//       },
//     },
//   ];

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     state: {
//       globalFilter: search,
//     },
//     onGlobalFilterChange: setSearch,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: {
//       pagination: {
//         pageSize: 5, 
//       },
//     },
//   });

//   return (
//     <div className="max-w-6xl mx-auto space-y-6">
//       <TableToolbar
//         searchValue={search}
//         onSearchChange={setSearch}
//         filterOptions={filterOptions}
//         onFilterChange={(val) => setStatusFilter(val)}
//         addLabel="Add Product"
//         onAddClick={() => console.log("Add clicked")}
//       />

//       <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader className="bg-slate-50/50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id} className="h-12 px-6 font-bold text-slate-700">
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id} className="hover:bg-slate-50/50">
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id} className="px-6 py-4">
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                   No products found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>

//         {/* الترقيم (Pagination) */}
//         <div className="flex items-center justify-between px-6 py-4 border-t bg-slate-50/30">
//           <div className="text-sm text-slate-500">
//             Showing {table.getRowModel().rows.length} products
//           </div>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>

//             {/* أرقام الصفحات */}
//             <div className="flex gap-1">
//               {Array.from({ length: table.getPageCount() }, (_, i) => (
//                 <Button
//                   key={i}
//                   variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
//                   size="sm"
//                   className="w-8 h-8 p-0"
//                   onClick={() => table.setPageIndex(i)}
//                 >
//                   {i + 1}
//                 </Button>
//               ))}
//             </div>

//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableToolbar } from "../common/TableToolbar";
import { 
  ChevronLeft, 
  ChevronRight, 
  PackagePlus, 
  UploadCloud, 
  X, 
  Image as ImageIcon 
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// --- Types ---
type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  image?: string;
  discount?: string;
};

// --- Mock Data ---
const initialData: Product[] = [
  { id: 1, name: "Running Shoes", price: "$120", stock: 5 },
  { id: 2, name: "T-Shirt", price: "$30", stock: 0 },
];

export default function ProductsItems() {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State للفورم
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: 0,
    discount: "",
    image: "" // سنخزن هنا الـ Base64 أو الـ URL للصورة
  });

  // --- Image Drag & Drop Logic ---
  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.image) return alert("Please upload a product image!");

    const productToAdd: Product = {
      id: Date.now(), // ID فريد أكثر
      name: newProduct.name,
      price: `$${newProduct.price}`,
      stock: Number(newProduct.stock),
      discount: newProduct.discount,
      image: newProduct.image
    };

    setProducts([productToAdd, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: "", price: "", stock: 0, discount: "", image: "" });
  };

  // --- Table Columns ---
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border flex items-center justify-center">
           {row.original.image ? (
             <img src={row.original.image} alt="product" className="w-full h-full object-cover" />
           ) : (
             <PackagePlus className="w-6 h-6 text-slate-400" />
           )}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">{row.getValue("name")}</span>
          {row.original.discount && (
            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded w-fit mt-1">
               -{row.original.discount}% OFF
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span className="font-semibold text-blue-600">{row.getValue("price")}</span>,
    },
    {
      accessorKey: "stock",
      header: "Inventory",
      cell: ({ row }) => {
        const stock = row.getValue("stock") as number;
        return (
          <Badge variant={stock === 0 ? "destructive" : stock < 10 ? "outline" : "secondary"}>
            {stock === 0 ? "Out of Stock" : `${stock} Units`}
          </Badge>
        );
      },
    },
  ];

  const filteredData = useMemo(() => {
    let data = [...products]; 
    if (statusFilter === "oos") data = data.filter((p) => p.stock === 0);
    if (statusFilter === "in-stock") data = data.filter((p) => p.stock > 0);
    return data;
  }, [statusFilter, products]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter: search },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <TableToolbar
        searchValue={search}
        onSearchChange={setSearch}
        filterOptions={[
            { label: "All Products", value: "all" },
            { label: "Out of Stock", value: "oos" },
            { label: "In Stock", value: "in-stock" },
        ]}
        onFilterChange={(val) => setStatusFilter(val)}
        addLabel="Add Product"
        onAddClick={() => setIsModalOpen(true)}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[450px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New Product</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddProduct} className="space-y-5 py-4">
            
            {/* Drag & Drop Area */}
            <div className="space-y-2">
              <Label>Product Image <span className="text-red-500">*</span></Label>
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className={cn(
                  "relative group border-2 border-dashed rounded-xl p-4 transition-all flex flex-col items-center justify-center gap-2 min-h-[160px]",
                  newProduct.image ? "border-blue-400 bg-blue-50/10" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                )}
              >
                {newProduct.image ? (
                  <div className="relative w-full aspect-video">
                    <img src={newProduct.image} className="w-full h-full object-contain rounded-lg" alt="Preview" />
                    <button 
                      type="button"
                      onClick={() => setNewProduct({...newProduct, image: ""})}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Drag and drop or click to upload</p>
                      <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                placeholder="Enter product name"
                required 
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  placeholder="0.00"
                  required 
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Inventory</Label>
                <Input 
                  id="stock" 
                  type="number" 
                  placeholder="0"
                  required 
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount Percentage (%)</Label>
              <div className="relative">
                <Input 
                  id="discount" 
                  type="number"
                  placeholder="Optional" 
                  value={newProduct.discount}
                  onChange={(e) => setNewProduct({...newProduct, discount: e.target.value})}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                Create Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* الجدول */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-12 px-6 font-bold text-slate-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="w-8 h-8 opacity-20" />
                    No products found.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}