import { type DrizzleError } from "drizzle-orm";
import { ZodError, z } from "zod";

import { responseSchema } from "@/app/types/schemas/form";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  formulary,
  insertFormularySchema,
  insertSingleFormularySchema,
  selectAllFormularySchema,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

const literalFields = {
  allergies: "Alergias o intoleracias",
  name: "Nombre",
  coming: "Asistencia",
};

export const rsvpRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.array(responseSchema).max(5))
    .mutation(async ({ ctx, input }) => {
      try {
        const data = input.map((response) => ({
          ...response,
          coming: response.coming === "yes",
        }));

        if (data.length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No se ha recibido ningún dato",
          });
        }

        const parser =
          data.length !== 1
            ? insertFormularySchema
            : insertSingleFormularySchema;

        const dataToParse = data.length !== 1 ? data : data[0]!;

        const formToDb = parser.parse(dataToParse);

        if (!Array.isArray(formToDb)) {
          const insert = await ctx.db.insert(formulary).values(formToDb);

          return insert.rowCount;
        }

        const firstData = formToDb[0]!;
        const [firstGuest] = await ctx.db
          .insert(formulary)
          .values(firstData)
          .returning({ insertedId: formulary.id });

        const restOfData = formToDb.slice(1);

        if (restOfData.length > 0) {
          const restGuests = await ctx.db.insert(formulary).values(
            restOfData.map((data) => ({
              ...data,
              associatedTo: firstGuest?.insertedId,
            })),
          );

          return restGuests.rowCount + 1;
        }

        return 1;
      } catch (error) {
        console.error(
          ">>>> Error inserting data in formulary table",
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
  getData: protectedProcedure.query(async ({ ctx }) => {
    try {
      const rows = await ctx.db.select().from(formulary);

      return selectAllFormularySchema.parse(rows);
    } catch (error) {
      console.error(
        ">>>> Error querying form data",
        (error as ZodError | DrizzleError).message,
      );
      return [];
    }
  }),
});
