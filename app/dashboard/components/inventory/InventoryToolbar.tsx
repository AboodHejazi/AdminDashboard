import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";

export function InventoryToolbar({ onSearch, onFilterChange }: any) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
      <div className="flex flex-1 gap-2 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input 
            placeholder="Search SKU or Product name..." 
            className="pl-10" 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Select onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Plus className="mr-2 h-4 w-4" /> Add Product
      </Button>
    </div>
  );
}