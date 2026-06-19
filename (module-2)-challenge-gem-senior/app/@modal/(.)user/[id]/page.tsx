export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
    <div className="bg-white p-10 rounded-xl text-black border-4 border-red-500">
      <h1>MODALE INTERCEPTÉE : {resolvedParams.id}</h1>
    </div>
  </div>
  );
}