export default function FullPhotoPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        PAGE ENTIÈRE - Photo {params.id}
      </h1>
      <div className="w-96 h-96 bg-gray-300 flex items-center justify-center text-4xl">
        📷 {params.id}
      </div>
    </div>
  );
}