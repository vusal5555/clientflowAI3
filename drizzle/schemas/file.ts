import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { projects } from "./project";
import { user } from "./user";

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  url: text("url").notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  uploadedBy: integer("uploaded_by")
    .references(() => user.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type File = typeof files.$inferSelect;
