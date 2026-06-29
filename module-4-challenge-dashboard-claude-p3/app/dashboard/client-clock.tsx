"use client";

import { useSyncExternalStore } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ClientClock() {
  const hydrated = useHydrated();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Clock</CardTitle>
      </CardHeader>
      <CardContent>
        {hydrated ? (
          <p className="text-2xl font-bold">
            {new Date().toLocaleTimeString()}
          </p>
        ) : (
          <p className="text-2xl font-bold text-muted-foreground">Loading...</p>
        )}
      </CardContent>
    </Card>
  );
}
