// app/dashboard/page.tsx

// RSC principal du dashboard
// dynamic → forcé par l'utilisation de cookies()
// Next.js détecte automatiquement cookies() et bascule en dynamic rendering

import { cookies } from "next/headers"
import { Suspense } from "react"

import Stats from "./stats"
import OrdersList from "./orders-list"
import RevenueChart from "./revenue-chart"
import ThemeToggle from "./theme-toggle"
import ClientClock from "./client-clock"

import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const DashboardPage = async () => {
  // cookies() → force le dynamic rendering sur toute la page
  // Next.js ne peut plus mettre cette page en cache
  const cookieStore = await cookies()
  const userId = cookieStore.get("userid")?.value

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">

      {/* Header du dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {/* Affiche l'utilisateur connecté si cookie userid présent */}
          <p className="text-muted-foreground">
            {userId ? `Connecté en tant que : ${userId}` : "Non connecté"}
          </p>
        </div>
        {/* ThemeToggle → RCC importé dans un RSC (Composition Pattern) */}
        {/* Il garde son contexte client car importé depuis un RSC */}
        <ThemeToggle />
      </div>

      <Separator />

      {/* Stats → RSC statique avec revalidate */}
      {/* Pas de Suspense nécessaire car revalidate gère le cache */}
      <Stats />

      <Separator />

      {/* ClientClock → RCC, re-render post-hydratation */}
      <ClientClock />

      <Separator />

      {/* OrdersList → RSC lent 3s, wrappé dans Suspense */}
      {/* fallback → Skeleton affiché pendant les 3s de chargement */}
      <h2 className="text-xl font-bold">Recent Orders</h2>
      <Suspense fallback={<Skeleton className="h-48 rounded-xl" />}>
        <OrdersList />
      </Suspense>

      <Separator />

      {/* RevenueChart → RSC lent 5s, wrappé dans Suspense */}
      {/* S'affichera 2s après OrdersList */}
      <h2 className="text-xl font-bold">Revenue</h2>
      <Suspense fallback={<Skeleton className="h-48 rounded-xl" />}>
        <RevenueChart />
      </Suspense>

    </div>
  )
}

export default DashboardPage