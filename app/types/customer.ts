export type Customer = {
  id: string;
  name: string;
  phone:string
  email: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  status: "Active" | "Blocked";
};