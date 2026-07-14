// on importe le client db (Pool + schema combinés)
import { db } from './index'
// on importe toutes les tables qu'on veut remplir
import { users, authors, books, tags, booksToTags } from './schema'

async function seed() {
  console.log('🌱 Seeding database...')

  // ---------- USERS ----------
  // insert().values() retourne les lignes insérées grâce à .returning()
  const [user1] = await db.insert(users).values({ name: 'Anou' }).returning()

  // ---------- AUTHORS ----------
  const [tolkien] = await db.insert(authors).values({ name: 'J.R.R. Tolkien' }).returning()
  const [asimov] = await db.insert(authors).values({ name: 'Isaac Asimov' }).returning()

  // ---------- TAGS ----------
  const [fantasy] = await db.insert(tags).values({ name: 'Fantasy' }).returning()
  const [scifi] = await db.insert(tags).values({ name: 'Science-Fiction' }).returning()
  const [classic] = await db.insert(tags).values({ name: 'Classique' }).returning()

  // ---------- BOOKS ----------
  // chaque book référence un authorId ET un userId (les FK qu'on a définies)
  const [hobbit] = await db.insert(books).values({
    title: 'Le Hobbit',
    authorId: tolkien.id,
    userId: user1.id,
    isRead: true,
  }).returning()

  const [foundation] = await db.insert(books).values({
    title: 'Fondation',
    authorId: asimov.id,
    userId: user1.id,
    isRead: false,
  }).returning()

  // ---------- LIENS Many-to-Many (books <-> tags) ----------
  // "Le Hobbit" a le tag Fantasy
  await db.insert(booksToTags).values({ bookId: hobbit.id, tagId: fantasy.id })

  // "Fondation" a DEUX tags : Science-Fiction ET Classique
  // (exactement l'illustration du Many-to-Many : un book peut avoir plusieurs tags)
  await db.insert(booksToTags).values({ bookId: foundation.id, tagId: scifi.id })
  await db.insert(booksToTags).values({ bookId: foundation.id, tagId: classic.id })

  console.log('✅ Seed completed!')
}

seed()