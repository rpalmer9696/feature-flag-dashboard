import { publicProcedure } from "../trpc";
import z from "zod";
import { flags, envs, flagEnvs } from "db/schema";
import { db } from "db";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { env } from "../../env";

export const getFlags = publicProcedure.query(async () => {
  const flagRows = await db.select().from(flags);

  const rows = await Promise.all(
    flagRows.map(async (flag) => {
      const envToggles = await db
        .select()
        .from(flagEnvs)
        .innerJoin(envs, eq(flagEnvs.envId, envs.id))
        .where(eq(flagEnvs.flagId, flag.id));

      return {
        uuid: flag.uuid,
        name: flag.name,
        createdAt: flag.createdAt,
        updatedAt: flag.updatedAt,
        envs: envToggles.map((envToggle) => {
          return {
            type: envToggle.envs.type,
            enabled: envToggle.flag_envs.enabled,
          };
        }),
      };
    })
  );

  return rows.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
});

export const isEnabled = publicProcedure
  .input(z.object({ name: z.string() }))
  .query(async ({ input }) => {
    const flag = await db
      .select()
      .from(flags)
      .innerJoin(flagEnvs, eq(flags.id, flagEnvs.flagId))
      .innerJoin(envs, eq(envs.id, flagEnvs.envId))
      .where(
        and(
          eq(envs.type, env.NODE_ENV),
          eq(flags.name, input.name),
          eq(flagEnvs.enabled, true)
        )
      );

    return !!flag.length;
  });

export const createFlag = publicProcedure
  .input(z.object({ name: z.string() }))
  .mutation(async ({ input }) => {
    const flagRows = await db
      .select()
      .from(flags)
      .where(eq(flags.name, input.name));
    if (flagRows.length) {
      throw new TRPCError({
        message: "Flag name already exists.",
        code: "BAD_REQUEST",
      });
    }

    const flag = await db
      .insert(flags)
      .values({ name: input.name })
      .returning();
    const envRows = await db.select().from(envs);

    await Promise.all(
      envRows.map((env) =>
        db
          .insert(flagEnvs)
          .values({ flagId: flag[0].id, envId: env.id, enabled: false })
      )
    );

    return flag;
  });

export const deleteFlag = publicProcedure
  .input(z.object({ uuid: z.string() }))
  .mutation(async ({ input }) => {
    const [flag] = await db
      .select()
      .from(flags)
      .where(eq(flags.uuid, input.uuid));

    await db.delete(flagEnvs).where(eq(flagEnvs.flagId, flag.id));

    return db.delete(flags).where(eq(flags.uuid, input.uuid));
  });

export const updateFlag = publicProcedure
  .input(z.object({ uuid: z.string(), name: z.string() }))
  .mutation(async ({ input }) => {
    return db
      .update(flags)
      .set({ name: input.name })
      .where(eq(flags.uuid, input.uuid));
  });

export const updateFlagEnvToggle = publicProcedure
  .input(
    z.object({
      uuid: z.string(),
      env: z.enum(["development", "testing", "production"]),
      enabled: z.boolean(),
    })
  )
  .mutation(async ({ input }) => {
    const flagEnv = await db
      .select({ flagId: flagEnvs.flagId, envId: flagEnvs.envId })
      .from(flagEnvs)
      .innerJoin(flags, eq(flagEnvs.flagId, flags.id))
      .innerJoin(envs, eq(flagEnvs.envId, envs.id))
      .where(and(eq(envs.type, input.env), eq(flags.uuid, input.uuid)));

    return db
      .update(flagEnvs)
      .set({ enabled: input.enabled })
      .where(
        and(
          eq(flagEnvs.flagId, flagEnv[0].flagId!),
          eq(flagEnvs.envId, flagEnv[0].envId!)
        )
      );
  });
