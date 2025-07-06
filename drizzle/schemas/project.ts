import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { integer } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  clientName: varchar("client_name", { length: 255 }),
  status: text("status", {
    enum: ["active", "completed", "archived", "awaiting-feedback"],
  }).default("active"),
  priority: text("priority", { enum: ["low", "medium", "high"] }).default(
    "medium"
  ),
  dueDate: timestamp("due_date"),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
