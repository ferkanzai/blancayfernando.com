import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { accounts, validEmails } from "@/server/db/schema";

export const validEmailsRouter = createTRPCRouter({
  checkEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const { email } = input;
      const isEmailInDB = await ctx.db
        .select({ email: validEmails.email })
        .from(validEmails)
        .where(eq(validEmails.email, email));

      return { canSignIn: isEmailInDB.length > 0 };
    }),
  checkProvider: publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      if (!userId) {
        return null;
      }

      const accountHasProvider = await ctx.db
        .selectDistinct({ provider: accounts.provider })
        .from(accounts)
        .where(eq(accounts.userId, userId));

      return accountHasProvider[0] ?? null;
    }),
});
