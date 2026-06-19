"use client"; // Ne l'oublie pas, c'est indispensable ici !

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // On affiche l'erreur dans la console pour le développeur
  useEffect(() => {
    console.error("Erreur interceptée par Next.js :", error);
  }, [error]);

  return (
    <div className="p-10 max-w-md mx-auto mt-20 text-center">
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        
        <h2 className="text-2xl font-bold text-red-800 mb-2">
          Oups, un problème est survenu !
        </h2>
        
        {/* On affiche le message de l'erreur qu'on a "throw" dans le page.tsx */}
        <p className="text-red-600 mb-8 font-medium">
          {error.message || "Impossible de charger ce profil."}
        </p>
        
        <div className="flex flex-col gap-3">
          {/* Le bouton reset recharge uniquement ce composant, sans rafraîchir la page entière */}
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-md"
          >
            Réessayer
          </button>
          
          <Link 
            href="/" 
            className="px-6 py-3 bg-white text-red-600 border border-red-200 font-bold rounded-xl hover:bg-red-50 transition"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}