import OrdersList from "./orders-list";
import RevenueChart from "./revenue-chart";
import Stats from "./stats";

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Stats />
      <OrdersList/>
      <RevenueChart/>
    </div>
  );
} 
