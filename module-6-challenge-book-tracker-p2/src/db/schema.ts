//pgTable = creation d'une table postgreSql
//serial = de type auto incrément pour les ids
//varchar = text court avec une longueur max
//integer = nombre entier, pour les foreign keys
//boolean = true/false
//timestamp = date + heure
//primaryKey = marque les ids en tant que primary key

import {
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  isRead: boolean("is_read").notNull().default(false),
  authorId: integer("author_id")
    .references(() => authors.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const booksToTags = pgTable(
  "books_to_tags",
  {
    bookId: integer("books_id")
      .references(() => books.id)
      .notNull(),
    tagId: integer("tag_id")
      .references(() => tags.id)
      .notNull(),
  },
  //evite d'avoir des doublons
  (table) => [primaryKey({ columns: [table.bookId, table.tagId] })],
);

export const authorsRelations = relations(authors, ({ many }) => ({
  books: many(books),
}));

export const userRelations = relations(users, ({ many }) => ({
  books: many(books),
}));

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
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  booksToTags: many(booksToTags),
}));

export const booksToTagsRelations = relations(booksToTags, ({ one }) => ({
  book: one(books, {
    fields: [booksToTags.bookId],
    references: [books.id],
  }),
  tag: one(tags, {
    fields: [booksToTags.tagId],
    references: [tags.id],
  }),
}));
