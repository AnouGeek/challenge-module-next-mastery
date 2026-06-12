export default function LoadingProfile() {
  return (
    <div className="max-w-md mx-auto mt-32 flex flex-col items-center justify-center">
      {/* Le conteneur du spinner */}
      <div className="relative flex justify-center items-center w-24 h-24">
        {/* Anneau de fond (statique) */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
        
        {/* Anneau extérieur (cyan, tourne dans le sens horaire) */}
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
        
        {/* Anneau intérieur (bleu, tourne en sens inverse) */}
        <div className="absolute w-14 h-14 rounded-full border-4 border-blue-600 border-b-transparent animate-[spin_1.5s_linear_infinite_reverse]"></div>
      </div>
      
      {/* Texte animé avec dégradé */}
      <h2 className="mt-8 text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent animate-pulse tracking-wide">
        Récupération du profil...
      </h2>
    </div>
  );
}