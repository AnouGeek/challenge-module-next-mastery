import Stats from "./stats";
import OrdersList from "./orders-list";
import RevenueChart from "./revenue-chart";
import ThemeToggle from "./theme-toggle";
import ClientClock from "./client-clock";

import { Suspense } from "react";
import { cookies } from "next/headers";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userid")?.value;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {userId ? `Connecté en tant que : ${userId}` : "Non connecté"}
          </p>
        </div>
        <ThemeToggle />
      </div>

      <Separator />

      <Stats />
      <Separator />
      <ClientClock />
      <Separator />

      <h2>Recent Orders</h2>
      <Suspense fallback={<Skeleton className="h-48 rounded-xl" />}>
        <OrdersList />
      </Suspense>

      <Separator />
      <h2>Revenue</h2>
      <Suspense
        fallback={<Skeleton className="h-48 rounded-xl bg-yellow-400" />}
      >
        <RevenueChart />
      </Suspense>
    </div>
  );
}
