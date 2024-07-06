import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { accounts } from "@/server/db/schema";
import { addItemToPlaylist, searchItems } from "@/server/spotifyApi";

export const spotifyRouter = createTRPCRouter({
  searchItems: publicProcedure
    .input(
      z.object({ query: z.string().optional(), userId: z.string().optional() }),
    )
    .query(async ({ input, ctx }) => {
      if (!input.userId) {
        throw new TRPCError({
          message: "No se encontró ningún token de Spotify",
          code: "UNAUTHORIZED",
        });
      }

      if (!input.query) {
        return;
      }

      const [token] = await ctx.db
        .selectDistinct({ access_token: accounts.access_token })
        .from(accounts)
        .where(eq(accounts.userId, input.userId));

      if (!token?.access_token) {
        throw new TRPCError({
          message: "No se encontró ningún token de Spotify",
          code: "UNAUTHORIZED",
        });
      }

      const response = await searchItems(input.query, token.access_token);

      return response;
    }),
  addToPlaylist: publicProcedure
    .input(z.object({ id: z.string(), userId: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      try {
        if (!input.userId) {
          throw new TRPCError({
            message: "No se encontró ningún token de Spotify",
            code: "UNAUTHORIZED",
          });
        }

        const [token] = await ctx.db
          .selectDistinct({ access_token: accounts.access_token })
          .from(accounts)
          .where(eq(accounts.userId, input.userId));

        if (!token?.access_token) {
          throw new TRPCError({
            message: "No se encontró ningún token de Spotify",
            code: "UNAUTHORIZED",
          });
        }

        const response = await addItemToPlaylist(input.id, token.access_token);

        if (response?.error?.status === 401) {
          throw new TRPCError({
            message: "Error al añadir el elemento a la playlist",
            code: "UNAUTHORIZED",
          });
        }

        if (response?.error?.status === 403) {
          throw new TRPCError({
            message: "No tienes permisos para añadir el elemento a la playlist",
            code: "UNAUTHORIZED",
          });
        }

        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
      }
    }),
});
