import Link from "next/link";
export default function GalleryPage() {
  const photos = ["1", "2", "3"];

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Ma Galerie</h1>
      <div className="flex gap-4">
        {photos.map((id) => (
          <Link 
            key={id} 
            href={`/gallery/${id}`}
            className="p-10 bg-blue-200 hover:bg-blue-300 rounded-lg text-xl"
          >
            Voir Photo {id}
          </Link>
        ))}
      </div>
    </div>
  );
}