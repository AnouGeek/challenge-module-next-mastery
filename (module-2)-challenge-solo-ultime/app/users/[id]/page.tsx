import Link from "next/link";



export default async function DynamicUserPage(/* À toi de typer et récupérer les params ici */{params}: {params: Promise<{id: string}>}) {
  // Ton travail : remplacer cette constante par le vrai paramètre de l'URL
  // const id = "ID_ICI";
  const {id} = await params

  return (
    <div className="p-10 max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-md border border-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Profil Utilisateur
      </h1>
      <p className="text-gray-500 mb-6">Route générée dynamiquement via les segments entre crochets.</p>
      
      <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
          #
        </div>
        <div>
          <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">Identifiant unique intercepté</p>
          <p className="text-3xl font-black text-emerald-900">{id}</p>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition shadow-sm">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}