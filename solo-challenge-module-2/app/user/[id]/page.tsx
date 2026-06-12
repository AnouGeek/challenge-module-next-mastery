interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params;

  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();

  const user = data.results[0];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-md w-full text-center">
        <img
          className="w-24 h-24 bg-zinc-800 rounded-full mx-auto mb-4 border-2 border-lime-400"
          src={user.picture.large}
          alt=""
        />
        <h1 className="text-2xl font-bold text-white mb-2">
          {user.name.first}
        </h1>
        <p className="text-zinc-400">ID de l'URL : {id} </p>
      </div>
    </div>
  );
}
