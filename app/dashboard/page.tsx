import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewChart } from "./components/main/OverviewChart";
import { RecentSales } from "./components/main/recent-sales";
import Summary from "./components/main/Summary";
import DashboardTable from "./components/main/DashboardTable";

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-6"> 
     
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      {/* 1. الصف العلوي: ملخص الإحصائيات */}
      <Summary />
<DashboardTable />
      {/* 2. الصف الأوسط: الرسم البياني والمبيعات بجانب بعضهما */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* الرسم البياني يأخذ مساحة 4 أعمدة من أصل 7 */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>

        {/* المبيعات الأخيرة تأخذ 3 أعمدة من أصل 7 */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
        
      </div>
      
    </div>
  );
}