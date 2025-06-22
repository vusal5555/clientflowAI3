import { pgTable, serial, timestamp, integer, text } from "drizzle-orm/pg-core";
import { projects } from "./project";
import { user } from "./user";

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  leftBy: integer("left_by")
    .references(() => user.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
