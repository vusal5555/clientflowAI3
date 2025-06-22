import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: text("status", { enum: ["active", "completed", "archived"] }).default(
    "active"
  ),
  createdAt: timestamp("created_at").defaultNow(),
});
