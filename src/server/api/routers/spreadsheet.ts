import { TRPCError } from "@trpc/server";
import { eq, type DrizzleError } from "drizzle-orm";
import { type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { Common } from "googleapis";
import { ZodError, z } from "zod";

import { sheetsConfigurationSchema } from "@/app/types/schemas/sheetsConfiguration";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import * as schema from "@/server/db/schema";
import { initSheets } from "@/server/google";

const literalFields = {
  value: "ID",
};

const getSheetConfiguration = async (db: NeonHttpDatabase<typeof schema>) => {
  const sheetConfiguration = await db
    .select({ value: schema.sheetsConfiguration.value })
    .from(schema.sheetsConfiguration);

  return sheetConfiguration;
};

export const spreadsheetRouter = createTRPCRouter({
  getSheet: protectedProcedure.query(async ({ ctx }) => {
    try {
      const sheets = initSheets();

      const [spreadsheetId] = await getSheetConfiguration(ctx.db);

      if (!spreadsheetId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "La hoja de cálculo no está configurada",
        });
      }

      const spreadsheet = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId.value,
        range: "Invitados",
      });

      return spreadsheet.data.values
        ?.filter((row) => !(row[0] as string[])?.includes("ID"))
        .map((row) => parseInt(row[0] as string, 10));
    } catch (error) {
      console.error(
        ">>>> Error getting data from spreadsheet",
        (error as Common.GaxiosError).message,
      );

      if (error instanceof Common.GaxiosError) {
        if (error.status === 403) {
          throw new TRPCError({
            cause: error.response?.data,
            code: "FORBIDDEN",
            message:
              (error as TRPCError).message ??
              "Los permisos no están configurados correctamente",
          });
        }
      }

      throw new TRPCError({
        cause: error,
        code: (error as TRPCError).code ?? "INTERNAL_SERVER_ERROR",
        message: (error as TRPCError).message ?? "Error interno del servidor",
      });
    }
  }),
  addDataToSheet: protectedProcedure
    .input(
      z.array(
        z.object({
          allergies: z.string(),
          coming: z.string(),
          id: z.number(),
          name: z.string(),
          specialMenu: z.string(),
          specialMenuValue: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const sheets = initSheets();

        const [spreadsheetId] = await getSheetConfiguration(ctx.db);

        if (!spreadsheetId) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "La hoja de cálculo no está configurada",
          });
        }

        const spreadsheet = await sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId.value,
          range: "Invitados",
        });

        const values = spreadsheet.data.values
          ?.filter((row) => !(row[0] as string[])?.includes("ID"))
          .map((row) => parseInt(row[0] as string, 10));

        const toSave = input.filter((form) => !values?.includes(form.id));

        if (toSave.length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No hay datos nuevos que guardar",
          });
        }

        await sheets.spreadsheets.values.append({
          spreadsheetId: spreadsheetId.value,
          range: "Invitados",
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          requestBody: {
            values: toSave.map((form) => [
              // do not change order to match spreadsheet columns
              form.id,
              form.name,
              form.coming,
              form.allergies,
              form.specialMenu,
              form.specialMenuValue,
            ]),
          },
        });
      } catch (error) {
        console.error(
          ">>>> Error getting data from spreadsheet",
          (error as Common.GaxiosError).message,
        );

        if (error instanceof Common.GaxiosError) {
          if (error.status === 403) {
            throw new TRPCError({
              cause: error.response?.data,
              code: "FORBIDDEN",
              message: "Los permisos no están configurados correctamente",
            });
          }
        }

        throw new TRPCError({
          cause: error,
          code: (error as TRPCError).code ?? "INTERNAL_SERVER_ERROR",
          message: (error as TRPCError).message ?? "Error interno del servidor",
        });
      }
    }),
  updateSheetConfiguration: protectedProcedure
    .input(sheetsConfigurationSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const spreadsheetIds = await getSheetConfiguration(ctx.db);

        if (spreadsheetIds.length === 1) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "La hoja de cálculo ya está configurada",
          });
        }

        const toInsert = schema.insertSheetsConfigurationSchema.parse(input);
        const insert = await ctx.db
          .insert(schema.sheetsConfiguration)
          .values(toInsert);

        return insert.rowCount;
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
          code: (error as TRPCError).code ?? "INTERNAL_SERVER_ERROR",
          message: (error as TRPCError).message ?? "Error interno del servidor",
        });
      }
    }),
  getSheetConfiguration: protectedProcedure.query(async ({ ctx }) => {
    const [spreadsheetIds] = await getSheetConfiguration(ctx.db);

    return spreadsheetIds ?? null;
  }),
  getSheetConfigurationData: protectedProcedure.query(async ({ ctx }) => {
    try {
      const sheets = initSheets();

      const [spreadsheetId] = await getSheetConfiguration(ctx.db);

      if (!spreadsheetId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "La hoja de cálculo no está configurada",
        });
      }

      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: spreadsheetId.value,
      });

      return {
        title: spreadsheet.data.properties?.title,
        id: spreadsheet.data.spreadsheetId,
      };
    } catch (error) {
      console.error(
        ">>>> Error getting data from spreadsheet",
        (error as Common.GaxiosError).message,
      );

      if (error instanceof Common.GaxiosError) {
        if (error.status === 403) {
          throw new TRPCError({
            cause: error.response?.data,
            code: "FORBIDDEN",
            message: "Los permisos no están configurados correctamente",
          });
        }
      }

      throw new TRPCError({
        cause: error,
        code: (error as TRPCError).code ?? "INTERNAL_SERVER_ERROR",
        message: (error as TRPCError).message ?? "Error interno del servidor",
      });
    }
  }),
  removeSheetConfiguration: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const [spreadsheetId] = await getSheetConfiguration(ctx.db);

      if (!spreadsheetId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "La hoja de cálculo no está configurada",
        });
      }

      await ctx.db
        .delete(schema.sheetsConfiguration)
        .where(eq(schema.sheetsConfiguration.value, spreadsheetId.value));

      return true;
    } catch (error) {
      console.error(
        ">>>> Error deleting data from formulary table",
        (error as DrizzleError).message,
      );

      throw new TRPCError({
        cause: error,
        code: (error as TRPCError).code ?? "INTERNAL_SERVER_ERROR",
        message: (error as TRPCError).message ?? "Error interno del servidor",
      });
    }
  }),
});
