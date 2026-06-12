import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 font-sans max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🚀 Challenge Routing Next.js</h1>
      <nav className="flex flex-col gap-4 bg-slate-100 p-6 rounded-lg shadow-sm border">
        <Link
          href="/about"
          className="text-blue-600 hover:underline font-medium"
        >
          → Route Statique : À propos
        </Link>
        <Link
          href="/contact"
          className="text-blue-600 hover:underline font-medium"
        >
          → Route Statique : Contact
        </Link>
        {/* On ajoutera les autres liens au fur et à mesure */}
        <Link
          href="/login"
          className="text-orange-600 hover:underline font-medium"
        >
          → Route Groupée : Connexion
        </Link>
        <Link
          href="/register"
          className="text-orange-600 hover:underline font-medium"
        >
          → Route Groupée : Inscription
        </Link>
        <Link
          href="/dashboard"
          className="text-teal-600 hover:underline font-medium"
        >
          → Routes Parallèles : Dashboard
        </Link>
        <Link
          href="/feed"
          className="text-indigo-600 hover:underline font-medium"
        >
          → Interception : Le Feed
        </Link>
        <Link
          href="/gallery"
          className="text-red-600 hover:underline font-medium"
        >
          → Combinaison : Galerie Modal
        </Link>
        <Link
          href="/users/99"
          className="text-emerald-600 hover:underline font-medium"
        >
          → Route Dynamique : Utilisateur 99
        </Link>
        <Link
          href="/random/abc"
          className="text-cyan-600 hover:underline font-medium"
        >
          → Dynamique + Fetch : Profil (id: abc)
        </Link>
      </nav>
    </main>
  );
}
