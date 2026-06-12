import Link from "next/link";

export default function StandaloneImagePage() {
  return (
    <div className="p-10 bg-gray-50 rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Vue Complète (Standard)</h1>
      <p className="mb-6 text-gray-600">Rechargement de page ou accès direct via URL.</p>
      <div className="w-full max-w-sm h-64 bg-red-400 rounded-lg shadow-md mb-6 flex items-center justify-center text-white font-bold text-xl">
        SUPER IMAGE
      </div>
      <Link href="/gallery" className="text-blue-600 hover:underline">
        Retour à la galerie
      </Link>
    </div>
  );
}