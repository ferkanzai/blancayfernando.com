import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";
import { Resend } from "resend";

import SignIn from "@/app/emails/SignIn";
import { env } from "@/env";
import { db } from "@/server/db";
import { createTable } from "@/server/db/schema";
import { api } from "@/trpc/server";

const resend = new Resend(env.RESEND_API_KEY);

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
      token,
    }),
    jwt: async ({ token, account }) => {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.RESEND_API_KEY,
        },
      },
      from: env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url }) => {
        try {
          const { canSignIn } = await api.validEmails.checkEmail.query({
            email: identifier,
          });

          if (!canSignIn) {
            throw new Error("No se permite el acceso a este email");
          }

          await resend.emails.send({
            from: `blancayfernando.com <${env.EMAIL_FROM}>`,
            to: [identifier],
            subject: `Admin login en la web de la boda de Blanca y Fernando`,
            react: SignIn({ url, to: identifier }),
            headers: {
              "X-Entity-Ref-ID": new Date().getTime() + "",
            },
          });
        } catch (error) {
          console.error(error);
          return Promise.reject(new Error((error as Error).message));
        }
      },
    }),
  ],
  pages: {
    signIn: "/acceder",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
