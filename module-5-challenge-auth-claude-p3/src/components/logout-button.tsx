"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
    router.refresh(); // force Next.js à revalider les Server Components (état de session)
  }

  return (
    <Button onClick={handleLogout} variant="outline" className="mt-4">
      Se déconnecter
    </Button>
  );
}