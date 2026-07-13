// pgTable : crée une table PostgreSQL
// serial : type auto-incrémenté (1, 2, 3...) utilisé pour les id
// varchar : texte court avec une longueur max (comme VARCHAR en SQL)
// integer : nombre entier, utilisé ici pour les clés étrangères (FK)
// boolean : true/false
// timestamp : date + heure
// primaryKey : marque la colonne id comme clé primaire de la table
import { relations } from 'drizzle-orm'
import { pgTable, serial, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core'

// ---------- USERS ----------
// Table simulant un utilisateur (pas de vraie auth pour ce projet)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
})

// ---------- AUTHORS ----------
// Un author peut avoir plusieurs books (relation One-to-Many)
export const authors = pgTable('authors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
})

// ---------- BOOKS ----------
// Chaque book appartient à un author ET à un user (celui qui l'a ajouté à sa liste)
export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  isRead: boolean('is_read').notNull().default(false),

  // FK vers authors : ce livre appartient à quel auteur
  authorId: integer('author_id').references(() => authors.id).notNull(),

  // FK vers users : ce livre appartient à quel utilisateur (sa bibliothèque perso)
  userId: integer('user_id').references(() => users.id).notNull(),

  createdAt: timestamp('created_at').defaultNow(),
})

// ---------- TAGS (genres) ----------
// Un tag peut être sur plusieurs books, un book peut avoir plusieurs tags
// => relation Many-to-Many, nécessite une table de jointure (booksToTags plus bas)
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
})

// ---------- TABLE DE JOINTURE books <-> tags ----------
// Chaque ligne ici représente "ce livre a ce tag"
export const booksToTags = pgTable('books_to_tags', {
  bookId: integer('book_id').references(() => books.id).notNull(),
  tagId: integer('tag_id').references(() => tags.id).notNull(),
})

// ---------------------------------------------------------------------------------------------------------

// ---------- RELATIONS ----------
// Un author a plusieurs books
export const authorsRelations = relations(authors, ({ many }) => ({
  books: many(books),
}))

// Un user a plusieurs books (sa bibliothèque)
export const usersRelations = relations(users, ({ many }) => ({
  books: many(books),
}))

// Un book appartient à un author, à un user, et a plusieurs tags (via booksToTags)
export const booksRelations = relations(books, ({ one, many }) => ({
  author: one(authors, {
    fields: [books.authorId],
    references: [authors.id],
  }),
  user: one(users, {
    fields: [books.userId],
    references: [users.id],
  }),
  booksToTags: many(booksToTags),
}))

// Un tag est utilisé sur plusieurs books (via booksToTags)
export const tagsRelations = relations(tags, ({ many }) => ({
  booksToTags: many(booksToTags),
}))

// La table de jointure fait le lien : chaque ligne pointe vers UN book et UN tag
export const booksToTagsRelations = relations(booksToTags, ({ one }) => ({
  book: one(books, {
    fields: [booksToTags.bookId],
    references: [books.id],
  }),
  tag: one(tags, {
    fields: [booksToTags.tagId],
    references: [tags.id],
  }),
}))