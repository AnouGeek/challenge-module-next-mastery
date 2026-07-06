"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        Theme : {isDark ? "🌙 Dark" : "☀️ Light"}
      </span>
      <Button variant="outline" onClick={() => setIsDark(!isDark)}>
        Toggle
      </Button>
    </div>
  );
}
