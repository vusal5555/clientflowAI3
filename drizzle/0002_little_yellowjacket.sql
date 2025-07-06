ALTER TABLE "feedback" RENAME COLUMN "left_by" TO "author_name";--> statement-breakpoint
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_left_by_user_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "status" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "status" SET DEFAULT 'todo';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "client_name" varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "priority" text DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "due_date" timestamp;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "progress" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "updated_at" timestamp DEFAULT now();