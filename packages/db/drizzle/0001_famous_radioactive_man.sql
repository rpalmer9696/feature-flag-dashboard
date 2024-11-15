ALTER TABLE "flag_envs" ALTER COLUMN "enabled" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "flag_envs" ALTER COLUMN "enabled" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "flags" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "flags" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;