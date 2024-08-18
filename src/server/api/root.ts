import { rsvpRouter } from "@/server/api/routers/rsvp";
import { validEmailsRouter } from "@/server/api/routers/validEmails";
import { createTRPCRouter } from "@/server/api/trpc";
import { musicRouter } from "./routers/music";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  music: musicRouter,
  rsvp: rsvpRouter,
  validEmails: validEmailsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
