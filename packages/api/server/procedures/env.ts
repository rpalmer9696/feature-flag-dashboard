import { db } from "db";
import { publicProcedure } from "../trpc";
import { envs } from "db/schema";

export const getEnvs = publicProcedure.query(() => {
  return db.select({ type: envs.type }).from(envs);
});
