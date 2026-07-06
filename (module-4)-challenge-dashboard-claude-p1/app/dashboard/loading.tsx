// app/dashboard/loading.tsx

// Ce fichier est détecté automatiquement par Next.js
// Il s'affiche pendant que page.tsx charge
// Remplacé par Suspense pour un contrôle plus granulaire par composant

import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Skeleton des stats cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
      {/* Skeleton des composants lents */}
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
    </div>
  )
}

export default Loading