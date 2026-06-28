// app/dashboard/theme-toggle.tsx

// Ce composant est un RCC (React Client Component)
// "use client" obligatoire car il utilise useState
// Il sera importé dans page.tsx (RSC) via le Composition Pattern
// → le RSC importe le RCC, pas l'inverse
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const ThemeToggle = () => {
  // useState → uniquement possible dans un RCC
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        {/* Affiche le thème actuel */}
        Theme : {isDark ? "🌙 Dark" : "☀️ Light"}
      </span>
      <Button
        variant="outline"
        size="sm"
        // onClick → event listener, uniquement possible côté client
        onClick={() => setIsDark(!isDark)}
      >
        Toggle
      </Button>
    </div>
  )
}

export default ThemeToggle