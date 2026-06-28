import ClientClock from "./client-clock";
import OrdersList from "./orders-list";
import RevenueChart from "./revenue-chart";
import Stats from "./stats";
import ThemeToggle from "./theme-toggle";

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ThemeToggle />
      <Stats />
      <OrdersList />
      <RevenueChart />
      <ClientClock />
    </div>
  );
}
