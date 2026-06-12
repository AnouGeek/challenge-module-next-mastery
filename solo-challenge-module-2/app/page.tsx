import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-white">🏠 Page d'Accueil</h1>

      <Link
        href="/user/123"
        className="px-6 py-3 bg-lime-500 text-black font-bold rounded-xl hover:bg-lime-400 transition-colors"
      >
        Voir le profil 123
      </Link>
    </div>
  );
}
