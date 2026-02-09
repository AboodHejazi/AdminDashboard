"use client";

import { Search, Plus, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SelectGroup, SelectLabel, SelectSeparator } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";


interface FilterOption {
  label: string;
  value: string;
}

interface TableToolbarProps {
  searchPlaceholder?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterPlaceholder?: string;
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;
  onAddClick?: () => void;
  addLabel?: string;
}

export function TableToolbar({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filterPlaceholder = "Filter by",
  filterOptions = [],
  onFilterChange,
  onAddClick,
  addLabel = "Add New",
}: TableToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex flex-1 items-center gap-3 w-full md:max-w-md">
        {/* حقل البحث */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white shadow-sm focus-visible:ring-blue-500"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* الفلترة */}
       {/* الفلترة الـ Dropdown الجميل - يفتح للأسفل دائماً */}
{filterOptions.length > 0 && (
  <Select onValueChange={onFilterChange}>
    <SelectTrigger 
      className={cn(
        " h-11 bg-white border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all",
        "focus:ring-2 focus:ring-blue-500/20 data-[state=open]:border-blue-500 group"
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-md bg-slate-100 group-data-[state=open]:bg-blue-50 transition-colors">
           <Filter className="h-3.5 w-3.5 text-slate-500 group-data-[state=open]:text-blue-600" />
        </div>
        <SelectValue placeholder={filterPlaceholder} />
      </div>
    </SelectTrigger>
    
    {/* السحر هنا: side="bottom" تجعله يفتح للأسفل، و sideOffset تعطي مسافة بسيطة */}
    <SelectContent 
      side="bottom" 
      sideOffset={8} 
      className="rounded-xl border-slate-200 shadow-xl p-1 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <SelectGroup>
        <SelectLabel className="text-[10px] uppercase tracking-widest text-slate-400 px-3 py-2 font-bold">
          Filter Status
        </SelectLabel>
        <SelectSeparator className="mx-1 bg-slate-100" />
        {filterOptions.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="rounded-lg cursor-pointer focus:bg-blue-50 focus:text-blue-700 py-2.5 my-0.5 transition-colors"
          >
            <span className="font-medium text-sm">{option.label}</span>
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
)}
      </div>

      {/* زر الإضافة */}
      {onAddClick && (
        <Button 
          onClick={onAddClick}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100 transition-all active:scale-95"
        >
          <Plus className="mr-2 h-4 w-4" />
          {addLabel}
        </Button>
      )}
      
    </div>
    
  );
}