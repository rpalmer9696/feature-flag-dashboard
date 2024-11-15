DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('development', 'testing', 'production');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "envs" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flag_envs" (
	"flag_id" integer,
	"env_id" integer,
	"enabled" boolean,
	CONSTRAINT "flag_envs_env_id_flag_id_pk" PRIMARY KEY("env_id","flag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flags" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "flags_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "flags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flag_envs" ADD CONSTRAINT "flag_envs_flag_id_flags_id_fk" FOREIGN KEY ("flag_id") REFERENCES "public"."flags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "flag_envs" ADD CONSTRAINT "flag_envs_env_id_envs_id_fk" FOREIGN KEY ("env_id") REFERENCES "public"."envs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uuid_idx" ON "flags" USING btree ("uuid");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "flags" USING btree ("name");