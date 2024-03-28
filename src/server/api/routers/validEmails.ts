import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validEmails } from "@/server/db/schema";

export const validEmailsRouter = createTRPCRouter({
  checkEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const { email } = input;
      const isEmailInDB = await ctx.db
        .select({ email: validEmails.email })
        .from(validEmails)
        .where(eq(validEmails.email, email));

      if (isEmailInDB.length > 0) {
        return { canSignIn: true };
      }

      return { canSignIn: false };
    }),
});
