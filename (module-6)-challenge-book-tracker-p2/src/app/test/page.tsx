// on importe le client db pour lire les données
import { db } from "@/db";
// on importe les Server Actions créées dans actions.ts (Create / Update / Delete)
import { createBook, toggleBookRead, deleteBook } from "@/app/actions";

export default async function TestPage() {
  // Read (le "R" du CRUD) : on récupère tous les livres,
  // avec leur auteur (relation directe) et leurs tags (via la jointure booksToTags)
  const allBooks = await db.query.books.findMany({
    with: {
      author: true,
      booksToTags: {
        with: { tag: true },
      },
    },
  });

  return (
    <div className="p-6 space-y-4">
      {/* on affiche un bloc par livre */}
      {allBooks.map((book) => (
        <div
          key={book.id}
          className="border p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-bold">{book.title}</p>
            {/* book.author existe directement grâce à la relation One-to-Many */}
            <p className="text-sm text-gray-500">{book.author.name}</p>
            <p className="text-sm">{book.isRead ? "✅ Lu" : "📖 Non lu"}</p>
          </div>

          <div className="flex gap-2">
            {/* Update : bouton pour inverser le statut lu/non lu de CE livre précis
                .bind(null, book.id, book.isRead) pré-remplit les 2 premiers arguments
                de la fonction avant qu'elle soit appelée par le formulaire */}
            <form action={toggleBookRead.bind(null, book.id, book.isRead)}>
              <button
                type="submit"
                className="bg-yellow-500 text-white px-3 py-1"
              >
                Toggle lu
              </button>
            </form>

            {/* Delete : bouton pour supprimer CE livre précis */}
            <form action={deleteBook.bind(null, book.id)}>
              <button type="submit" className="bg-red-500 text-white px-3 py-1">
                Supprimer
              </button>
            </form>
          </div>
        </div>
      ))}

      {/* Create : formulaire pour ajouter un nouveau livre
          action={createBook} envoie directement les données du formulaire (FormData)
          à la Server Action, sans besoin de fetch/API manuelle */}
      <form action={createBook} className="p-6 flex gap-2">
        <input
          name="title"
          placeholder="Titre du livre"
          className="border p-2"
          required
        />
        <input
          name="authorId"
          type="number"
          placeholder="ID de l'auteur (1 ou 2)"
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Ajouter
        </button>
      </form>
    </div>
  );
}
