import { type NeonDbError } from "@neondatabase/serverless";
import { eq, inArray, sql, type DrizzleError } from "drizzle-orm";
import { ZodError, z } from "zod";

import { responseSchema } from "@/app/types/schemas/form";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  formulary,
  insertFormularySchema,
  insertSingleFormularySchema,
  selectAllFormularySchemaWithAssociated,
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
      const query = sql`
        WITH RECURSIVE nested_formulary AS (
          SELECT 
            id::INTEGER,
            name::TEXT,
            allergies::TEXT,
            "associatedTo"::INTEGER,
            coming::BOOLEAN,
            "specialMenu"::BOOLEAN,
            "specialMenuValue"::TEXT,
            "createdAt"::TIMESTAMP,
            "updatedAt"::TIMESTAMP,
            jsonb '[]' AS associated
          FROM 
            ${formulary}
          WHERE 
            "associatedTo" IS NULL
        
          UNION ALL
        
          SELECT 
            f.id::INTEGER,
            f.name::TEXT,
            f.allergies::TEXT,
            f."associatedTo"::INTEGER,
            f.coming::BOOLEAN,
            f."specialMenu"::BOOLEAN,
            f."specialMenuValue"::TEXT,
            f."createdAt"::TIMESTAMP,
            f."updatedAt"::TIMESTAMP,
            jsonb '[]' AS associated
          FROM 
            ${formulary} f
          JOIN 
            nested_formulary nf ON f."associatedTo" = nf.id
        )
        SELECT 
          nf1.id,
          nf1.name,
          nf1.allergies,
          nf1."associatedTo",
          nf1.coming,
          nf1."specialMenu",
          nf1."specialMenuValue",
          nf1."createdAt",
          nf1."updatedAt",
          COALESCE(jsonb_agg(
            jsonb_build_object(
              'id', nf2.id,
              'name', nf2.name,
              'allergies', nf2.allergies,
              'associatedTo', nf2."associatedTo",
              'coming', nf2.coming,
              'specialMenu', nf2."specialMenu",
              'specialMenuValue', nf2."specialMenuValue",
              'createdAt', nf2."createdAt",
              'updatedAt', nf2."updatedAt"
            )
          ) FILTER (WHERE nf2.id IS NOT NULL), '[]') AS associated
        FROM 
          nested_formulary nf1
        LEFT JOIN 
          nested_formulary nf2 ON nf1.id = nf2."associatedTo"
        WHERE 
          nf1."associatedTo" IS NULL
        GROUP BY 
          nf1.id, nf1.name, nf1.allergies, nf1."associatedTo", nf1.coming, nf1."specialMenu", nf1."specialMenuValue", nf1."createdAt", nf1."updatedAt"
        ORDER BY 
          nf1.id;
      `;

      const { rows } = await ctx.db.execute(query);
      const all = await ctx.db.select().from(formulary);

      return {
        withAssociated: selectAllFormularySchemaWithAssociated.parse(rows),
        all,
      };
    } catch (error) {
      console.error(
        ">>>> Error querying form data",
        (error as ZodError | DrizzleError | NeonDbError).message,
      );

      return {
        withAssociated: [],
        all: [],
      };
    }
  }),
  deleteFormularyData: protectedProcedure
    .input(z.array(z.number()))
    .mutation(async ({ ctx, input }) => {
      try {
        const rows = await ctx.db
          .delete(formulary)
          .where(inArray(formulary.id, input));

        return rows.rowCount;
      } catch (error) {
        console.error(
          ">>>> Error deleting form data",
          (error as ZodError | DrizzleError).message,
        );
        return false;
      }
    }),
  editRow: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        allergies: z.string().max(255),
        specialMenuValue: z.string().max(255),
        name: z.string(),
        coming: z.boolean(),
        specialMenu: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...rest } = input;
        const editSpecialMenu = !!rest.specialMenuValue ?? false;

        const editedRow = await ctx.db
          .update(formulary)
          .set({
            ...rest,
            updatedAt: sql`CURRENT_TIMESTAMP`,
            specialMenu: editSpecialMenu,
          })
          .where(eq(formulary.id, id));

        return editedRow.rowCount;
      } catch (error) {
        console.error(
          ">>>> Error editing form data",
          (error as ZodError | DrizzleError).message,
        );
        return false;
      }
    }),
});
