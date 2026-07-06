import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Order = {
  id: string;
  customer: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
};

const getOrders = async (): Promise<Order[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    { id: "001", customer: "Alice Martin", amount: 120, status: "completed" },
    { id: "002", customer: "Bob Dupont", amount: 85, status: "pending" },
    { id: "003", customer: "Clara Petit", amount: 200, status: "completed" },
    { id: "004", customer: "David Morin", amount: 45, status: "cancelled" },
  ];
};

const statusColor = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

export default async function OrdersList() {
  const orders = await getOrders();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-sm text-muted-foreground">#{order.id}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold">${order.amount}</span>
                <Badge className={statusColor[order.status]}>
                  {order.status}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
