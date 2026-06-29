import { Suspense } from "react";
import Stats from "./stats";
import OrdersList from "./orders-list";
import RevenueChart from "./revenue-chart";
import ThemeToggle from "./theme-toggle";
import ClientClock from "./client-clock";

export default function DashboardPage() {
  return (
    <div>
      <ThemeToggle/>
      <ClientClock/>
      <Stats />
      <Suspense>
        <OrdersList />
      </Suspense>
      <Suspense>
        <RevenueChart />
      </Suspense>
    </div>
  );
}
