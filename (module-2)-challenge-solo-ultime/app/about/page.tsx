import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-4">À Propos</h1>
      <p className="text-gray-700 mb-6">
        Ceci est une route statique classique. Le composant est rendu côté serveur par défaut.
      </p>
      <Link href="/" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
        Retour à l'accueil
      </Link>
    </div>
  );
}