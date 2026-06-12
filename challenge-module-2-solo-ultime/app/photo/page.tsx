import Link from "next/link";

export default function PhotoPage() {
  return (
    <div className="p-10 max-w-2xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">🖼️ Photo (Vue Standard)</h1>
      <p className="text-gray-700 mb-6">
        Tu as accédé à cette page directement via l'URL ou après un rafraîchissement.
        C'est la vraie page de la photo.
      </p>
      <Link href="/feed" className="text-blue-600 hover:underline">
        Retour au Feed
      </Link>
    </div>
  );
}