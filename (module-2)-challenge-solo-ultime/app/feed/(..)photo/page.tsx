import Link from "next/link";

export default function InterceptedPhotoPage() {
  return (
    <div className="p-10 max-w-2xl mx-auto mt-10 bg-yellow-100 border-4 border-yellow-400 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-yellow-800 mb-4">🕵️‍♂️ INTERCEPTÉ !</h1>
      <p className="text-yellow-700 mb-6">
        Tu as cliqué depuis le /feed. Next.js a intercepté la navigation vers l'URL /photo pour afficher ce composant. 
        Regarde ton URL, c'est bien /photo. <br/><br/>
        <b>Test :</b> Si tu rafraîchis ton navigateur maintenant (F5), tu verras la vraie page s'afficher !
      </p>
      <Link href="/feed" className="px-4 py-2 bg-yellow-800 text-white rounded hover:bg-yellow-700 transition">
        Retour au Feed
      </Link>
    </div>
  );
}