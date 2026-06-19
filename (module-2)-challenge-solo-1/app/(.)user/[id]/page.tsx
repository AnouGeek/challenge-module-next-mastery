export default async function ModalUserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // TO DO : Refaire le fetch ici pour récupérer l'utilisateur
  // const user = ...
  const response = await fetch('https://randomuser.me/api/')
  const data = await response.json()

  const user = data.results[0]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-lime-500/50 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl shadow-lime-500/20">
        <div className="w-24 h-24 bg-zinc-800 rounded-full mx-auto mb-4 border-2 border-lime-400 overflow-hidden">
          <img src={user.picture.large} alt="profile" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          {user.name.first}
        </h1>
        <p className="text-zinc-400">ID (depuis la Modal) : {id}</p>
      </div>
    </div>
  );
}