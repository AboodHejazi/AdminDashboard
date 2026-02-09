// components/main/Summary.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";

export default function Summary() {
  const stats = [
    { title: "Total Sales", value: "$12,345", description: "+12% last month", icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Orders", value: "+78", description: "+5% today", icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" /> },
    { title: "Total Products", value: "120", description: "5 out of stock", icon: <Package className="h-4 w-4 text-muted-foreground" /> },
    { title: "Revenue Today", value: "$980", description: "Highest this week", icon: <TrendingUp className="h-4 w-4 text-muted-foreground" /> },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm border-none bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}