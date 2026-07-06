export const revalidate = 30;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    totalUsers: 1240,
    totalOrders: 583,
    revenu: 24300,
    conversionRate: 3.2,
  };
};

export default async function Stats() {
  const stats = await getStats();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-bold">
          {stats.totalUsers}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Total Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-bold">
          {stats.totalOrders}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Revenus
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-bold">{stats.revenu}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Rate Conversions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-bold">
          {stats.conversionRate}
        </CardContent>
      </Card>
    </div>
  );
}
