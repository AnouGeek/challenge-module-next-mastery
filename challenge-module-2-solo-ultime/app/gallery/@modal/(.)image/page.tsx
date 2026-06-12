import Link from "next/link";

export default function ModalImagePage() {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Vue Modal 👀</h2>
        <div className="w-full h-48 bg-red-400 rounded-lg mb-4 flex items-center justify-center text-white font-bold">
          SUPER IMAGE
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Cliqué depuis la galerie ! <br/>
          (Fais F5 pour voir la différence)
        </p>
        <Link href="/gallery" className="block text-center w-full py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 transition">
          Fermer
        </Link>
      </div>
    </div>
  );
}