import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const flags = pgTable(
  "flags",
  {
    id: serial("id").primaryKey().notNull(),
    uuid: uuid("uuid")
      .notNull()
      .unique()
      .default(sql`uuid_generate_v4()`),
    name: text("name").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => {
    return {
      uuidIdx: uniqueIndex("uuid_idx").on(table.uuid),
      nameIdx: uniqueIndex("name_idx").on(table.name),
    };
  }
);

export const envType = pgEnum("type", ["development", "testing", "production"]);

export const envs = pgTable("envs", {
  id: serial("id").primaryKey().notNull(),
  type: envType("type").notNull(),
});

export const flagEnvs = pgTable(
  "flag_envs",
  {
    flagId: integer("flag_id").references(() => flags.id),
    envId: integer("env_id").references(() => envs.id),
    enabled: boolean("enabled").default(false).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.envId, table.flagId] }),
    };
  }
);
