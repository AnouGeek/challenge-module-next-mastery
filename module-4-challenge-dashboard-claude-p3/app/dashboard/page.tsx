import { Suspense } from "react";
import Stats from "./stats";
import OrdersList from "./orders-list";
import RevenueChart from "./revenue-chart";

export default function DashboardPage() {
  return (
    <div>
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
