import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { projects } from "./project";
import { user } from "./user";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  status: text("status").default("todo"),
  createdBy: integer("created_by")
    .references(() => user.id)
    .notNull(),
  assignedTo: integer("assigned_to").references(() => user.id),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
});
