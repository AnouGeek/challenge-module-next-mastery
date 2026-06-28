// app/dashboard/orders-list.tsx

// RSC lent — simule un fetch de commandes qui prend 3 secondes
// Ce composant sera wrappé dans un <Suspense> dans page.tsx
// pendant ces 3s, le skeleton s'affichera à sa place

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Order = {
  id: string;
  customer: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
};

// Simulation d'un fetch lent (3 secondes)
const getOrders = async (): Promise<Order[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    { id: "001", customer: "Alice Martin", amount: 120, status: "completed" },
    { id: "002", customer: "Bob Dupont", amount: 85, status: "pending" },
    { id: "003", customer: "Clara Petit", amount: 200, status: "completed" },
    { id: "004", customer: "David Morin", amount: 45, status: "cancelled" },
  ];
};

// Couleur du badge selon le statut de la commande
const statusColor = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

const OrdersList = async () => {
  // fetch lent — Next.js streamera ce composant dès qu'il est prêt
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
};

export default OrdersList;
