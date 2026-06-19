import Link from "next/link";

export default function GalleryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-red-600 mb-6">📸 Galerie (Test de Modal)</h1>
      <Link href="/gallery/image" className="inline-block p-4 border border-gray-300 rounded shadow hover:bg-gray-50 transition">
        Ouvrir la Super Image
      </Link>
      <div className="mt-8">
         <Link href="/" className="text-blue-600 underline">Retour accueil</Link>
      </div>
    </div>
  );
}