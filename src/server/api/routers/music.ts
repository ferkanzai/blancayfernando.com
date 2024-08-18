import { insertMusicFormSchema, musicForm } from "@/server/db/schema";
import { type DrizzleError } from "drizzle-orm";
import { ZodError } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const literalFields = {
  song: "Canción",
};

export const musicRouter = createTRPCRouter({
  create: publicProcedure
    .input(insertMusicFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const parsed = insertMusicFormSchema.parse(input);

        const { rowCount } = await ctx.db.insert(musicForm).values(parsed);

        return rowCount;
      } catch (error) {
        console.error(
          ">>>> Error inserting data in music table",
          (error as ZodError | DrizzleError).message,
        );

        if (error instanceof ZodError) {
          throw new TRPCError({
            cause: error,
            code: "PARSE_ERROR",
            message: `Hay un error en el formulario en el campo ${
              literalFields[
                (error?.issues?.[0]?.path?.[0] as keyof typeof literalFields) ??
                  ""
              ] ?? "desconocido"
            }`,
          });
        }

        throw new TRPCError({
          cause: error,
          code: "INTERNAL_SERVER_ERROR",
          message: "Error interno del servidor",
        });
      }
    }),
});