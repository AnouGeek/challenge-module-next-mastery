import {
  pgTable,
  serial,
  primaryKey,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const studentsToCourses = pgTable(
  "students_to_courses",
  {
    studentsId: integer("students_id").references(() => students.id),
    coursesId: integer("courses_id").references(() => courses.id),
  },
  (t) => [primaryKey({ columns: [t.studentsId, t.coursesId] })],
);

export const studentsRelations = relations(students, ({ many }) => ({
  studentsToCourses: many(studentsToCourses),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  studentsToCourses: many(studentsToCourses),
}));

export const studentsToCoursesRelations = relations(
  studentsToCourses,
  ({ one }) => ({
    student: one(students, {
      fields: [studentsToCourses.studentsId],
      references: [students.id],
    }),
    course: one(courses, {
      fields: [studentsToCourses.coursesId],
      references: [courses.id],
    }),
  }),
);
