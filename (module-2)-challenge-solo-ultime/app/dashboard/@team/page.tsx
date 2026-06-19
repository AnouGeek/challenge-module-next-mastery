export default function TeamSlot() {
  return (
    <div className="p-6 bg-pink-50 rounded-lg shadow-sm border border-pink-200">
      <h2 className="text-lg font-bold text-pink-800 mb-2">👥 Équipe</h2>
      <p className="text-pink-600">
        Ceci est l'autre route parallèle injectée depuis le slot team.
      </p>
    </div>
  );
}