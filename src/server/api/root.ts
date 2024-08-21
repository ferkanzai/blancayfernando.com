import { musicRouter } from "@/server/api/routers/music";
import { rsvpRouter } from "@/server/api/routers/rsvp";
import { spreadsheetRouter } from "@/server/api/routers/spreadsheet";
import { validEmailsRouter } from "@/server/api/routers/validEmails";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  music: musicRouter,
  rsvp: rsvpRouter,
  spreadsheet: spreadsheetRouter,
  validEmails: validEmailsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
