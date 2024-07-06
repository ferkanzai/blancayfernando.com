import { rsvpRouter } from "@/server/api/routers/rsvp";
import { spotifyRouter } from "@/server/api/routers/spotify";
import { validEmailsRouter } from "@/server/api/routers/validEmails";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  rsvp: rsvpRouter,
  validEmails: validEmailsRouter,
  spotify: spotifyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
