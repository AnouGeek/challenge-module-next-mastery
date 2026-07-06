// app/dashboard/stats.tsx

// Ce composant est un RSC statique
// revalidate = 30 → Next.js regénère ce composant toutes les 30 secondes
export const revalidate = 30;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simulation d'un fetch de stats (base de données, API...)
// async → obligatoire pour await
const getStats = async () => {
  // Simule un délai réseau de 1 seconde
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    totalUsers: 1240,
    totalOrders: 583,
    revenue: 24300,
    conversionRate: 3.2,
  };
};

// RSC → pas de "use client", peut être async
const Stats = async () => {
  const stats = await getStats();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Total Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${stats.revenue}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Conversion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.conversionRate}%</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
