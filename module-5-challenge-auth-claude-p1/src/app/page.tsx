"use client";

import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = useSession();

  return (
    <div className="p-8">
      <h1>Test session</h1>
      {isPending ? (
        <p>Chargement...</p>
      ) : session ? (
        <p>Connecté en tant que : {session.user.email}</p>
      ) : (
        <p>Pas connecté</p>
      )}
    </div>
  );
}