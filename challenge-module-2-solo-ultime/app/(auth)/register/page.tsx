import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-orange-500 mb-4">Inscription</h1>
      <p className="text-gray-700 mb-6">
        Même principe ici, l'URL est /register grâce au Route Group.
      </p>
      <Link href="/" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
        Retour à l'accueil
      </Link>
    </div>
  );
}