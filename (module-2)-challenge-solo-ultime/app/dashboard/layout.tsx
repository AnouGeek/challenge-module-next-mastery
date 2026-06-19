import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: ReactNode;
  analytics: ReactNode;
  team: ReactNode;
}) {
  return (
    <div className="p-10 max-w-4xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-700">Tableau de bord</h1>
        <Link href="/" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
          Retour à l'accueil
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Affichage de nos routes parallèles */}
        {analytics}
        {team}
      </div>
      
      {/* Affichage de la page principale du dossier */}
      {children}
    </div>
  );
}