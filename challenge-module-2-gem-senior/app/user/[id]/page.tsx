export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {

const {id} = await params

  return (
    <div className="p-10">
      <h1>Profil de l'utilisateur : {id}</h1>
    </div>
  );
}