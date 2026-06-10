export default function ModalPhotoPage({ params }: { params: { id: string } }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-xl shadow-xl flex flex-col items-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          MODALE INTERCEPTÉE - Photo {params.id}
        </h2>
        <div className="w-64 h-64 bg-gray-200 flex items-center justify-center text-4xl">
          📸 {params.id}
        </div>
      </div>
    </div>
  );
}
