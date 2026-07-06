"use client";

import { useSyncExternalStore } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Pattern React 19 pour détecter si on est côté client après hydratation
// Remplace useState(false) + useEffect qui génère un warning en React 19
const useHydrated = () => {
  return useSyncExternalStore(
    () => () => {}, // pas de subscription
    () => true, // côté client → true
    () => false, // côté serveur → false
  );
};

const ClientClock = () => {
  // false pendant SSR et hydratation, true après
  const hydrated = useHydrated();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Clock</CardTitle>
      </CardHeader>
      <CardContent>
        {hydrated ? (
          // Après hydratation → heure réelle côté client
          <p className="text-2xl font-bold">
            {new Date().toLocaleTimeString()}
          </p>
        ) : (
          // Pendant SSR et hydratation → placeholder neutre
          <p className="text-2xl font-bold text-muted-foreground">Loading...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientClock;
