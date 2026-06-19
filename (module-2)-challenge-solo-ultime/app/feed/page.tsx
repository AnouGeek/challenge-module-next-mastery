import Link from "next/link";

export default function FeedPage() {
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">📱 Ton Feed</h1>
      <p className="text-gray-700 mb-6">
        Clique sur la photo ci-dessous. Au lieu de charger la page standard,
        Next.js va intercepter la route !
      </p>

      <Link
        href="/photo"
        className="block p-6 bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition shadow-sm"
      >
        <h2 className="text-xl font-bold text-indigo-800">Voir la photo</h2>
      </Link>
    </div>
  );
}
