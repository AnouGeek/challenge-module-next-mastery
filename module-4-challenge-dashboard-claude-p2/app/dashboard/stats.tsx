export const revalidate = 30;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    totalUsers: 1240,
    totalOrders: 583,
    revenue: 24300,
    conversionRate: 3.2,
  };
};

async function Stats() {
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
}
export default Stats;
