"use client";

import { useState, useMemo } from "react";
import { InventoryItem } from "@/app/types/inventory";
import { InventoryStats } from "../components/inventory/InventoryStats";
import { InventoryToolbar } from "../components/inventory/InventoryToolbar";
import { InventoryTable } from "../components/inventory/InventoryTable";
import { HistoryDrawer } from "../components/inventory/HistoryDrawer";
import { AdjustmentModal } from "../components/inventory/AdjustmentModal";

export default function InventoryPage() {
  const [data, setData] = useState<InventoryItem[]>([
    { id: "1", name: "iPhone 15 Pro", sku: "PHN-15-P", category: "Electronics", quantity: 3, reserved: 1, threshold: 5, status: "Low Stock", lastUpdated: "2 mins ago" },
    { id: "2", name: "Samsung S24", sku: "PHN-S24", category: "Electronics", quantity: 15, reserved: 2, threshold: 5, status: "In Stock", lastUpdated: "5 mins ago" },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // منطق الفلترة
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                           item.sku.toLowerCase().includes(searchValue.toLowerCase());
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [data, searchValue, categoryFilter]);

  const handleAdjustStock = (amount: number, type: "add" | "remove") => {
    if (!selectedItem) return;
    setData(prev => prev.map(item => {
      if (item.id === selectedItem.id) {
        const newQty = type === "add" ? item.quantity + amount : Math.max(0, item.quantity - amount);
        let newStatus: any = "In Stock";
        if (newQty === 0) newStatus = "Out of Stock";
        else if (newQty <= item.threshold) newStatus = "Low Stock";
        
        return { ...item, quantity: newQty, status: newStatus, lastUpdated: "Just now" };
      }
      return item;
    }));
    setIsAdjustOpen(false);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <InventoryStats data={data} />
      
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <InventoryToolbar 
          onSearch={setSearchValue} 
          onFilterChange={setCategoryFilter} 
        />
        
        <InventoryTable 
          items={filteredData} 
          onAdjustClick={(item) => { setSelectedItem(item); setIsAdjustOpen(true); }}
          onHistoryClick={(item) => { setSelectedItem(item); setIsHistoryOpen(true); }}
          onEditClick={(item) => alert(`Edit ${item.name}`)}
        />
      </div>

      {isAdjustOpen && selectedItem && (
        <AdjustmentModal 
          item={selectedItem} 
          onClose={() => setIsAdjustOpen(false)} 
          onConfirm={handleAdjustStock}
        />
      )}

      {isHistoryOpen && selectedItem && (
        <HistoryDrawer 
          item={selectedItem} 
          onClose={() => setIsHistoryOpen(false)} 
        />
      )}
    </div>
  );
}