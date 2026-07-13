import { requireAdmin } from "@/lib/auth-helpers";

export default async function AdminPage() {
  const session = await requireAdmin();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Panel Admin</h1>
      <p>Bienvenue {session.user.name}, tu as les droits admin.</p>
    </div>
  );
}