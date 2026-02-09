export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock" | "Inactive";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  reserved: number;
  threshold: number; // حد التنبيه
  status: StockStatus;
  lastUpdated: string;
}

export interface StockHistory {
  id: string;
  productId: string;
  productName: string;
  action: "Added" | "Removed" | "Correction";
  quantity: number;
  reason: string;
  adminName: string;
  date: string;
}