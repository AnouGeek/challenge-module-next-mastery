import Link from "next/link";

// 1. TYPAGE PRO : On définit la forme exacte des données dont on a besoin
interface RandomUserResponse {
  results: Array<{
    name: {
      first: string;
      last: string;
    };
    email: string;
    location: {
      city: string;
      country: string;
    };
    picture: {
      large: string;
    };
  }>;
}

export default async function RandomProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await new Promise((resolve) => setTimeout(resolve, 400));

  // 2. LE FETCH ROBUSTE
  const res = await fetch(`https://randomuser.me/api/?seed=${id}`);

  // GESTION D'ERREUR : Si le serveur de l'API répond mal (ex: erreur 500)
  if (!res.ok) {
    // Dans Next.js, ça déclenchera le fichier error.tsx le plus proche s'il existe
    throw new Error("Impossible de récupérer les données de l'utilisateur");
  }

  // EXTRACTION DES DONNÉES avec notre typage
  const data: RandomUserResponse = await res.json();

  // L'API met l'utilisateur dans un tableau 'results', on prend le premier élément (index 0)
  const user = data.results[0];

  // 3. TON TRAVAIL : Injecter les données de 'user' ci-dessous
  return (
    <div className="p-10 max-w-md mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

        <div className="px-6 pb-6 relative">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2">
            <img
              src={user.picture.large} // <-- Utilise user.picture.large
              alt="Avatar de profil"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-gray-100"
            />
          </div>

          <div className="mt-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {user.name.first} {user.name.last}
            </h1>
            <p className="text-gray-500 font-medium mb-4">
              📍 {user.location.city} {user.location.country}
            </p>

            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6 border border-blue-100 shadow-inner">
              ✉️ {user.email}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="text-cyan-700 hover:text-cyan-800 font-bold hover:underline flex items-center gap-2"
        >
          <span>←</span> Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}
