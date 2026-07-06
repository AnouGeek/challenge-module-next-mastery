// app/dashboard/revenue-chart.tsx

// RSC lent — simule un fetch de données de revenue qui prend 5 secondes
// Plus lent que orders-list → streamera après lui
// Grâce au Streaming, orders-list s'affichera à 3s sans attendre ce composant

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type RevenueData = {
  month: string
  revenue: number
}

// Simulation d'un fetch lent (5 secondes)
const getRevenueData = async (): Promise<RevenueData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  return [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 3900 },
    { month: "Apr", revenue: 7200 },
    { month: "May", revenue: 6100 },
    { month: "Jun", revenue: 8400 },
  ]
}

const RevenueChart = async () => {
  // fetch lent — streamera après orders-list
  const data = await getRevenueData()

  // Valeur max pour calculer les proportions des barres
  const maxRevenue = Math.max(...data.map((d) => d.revenue))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Chart</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Chart simple en CSS — pas besoin de lib externe pour l'instant */}
        <div className="flex items-end gap-2 h-40">
          {data.map((item) => (
            <div key={item.month} className="flex flex-col items-center flex-1">
              {/* Barre proportionnelle au revenue */}
              <div
                className="w-full bg-blue-500 rounded-t"
                style={{
                  height: `${(item.revenue / maxRevenue) * 100}%`,
                }}
              />
              <p className="text-xs mt-1 text-muted-foreground">{item.month}</p>
              <p className="text-xs font-bold">${item.revenue / 1000}k</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RevenueChart