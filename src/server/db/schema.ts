import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type AdapterAccount } from "next-auth/adapters";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `blancayfernando.com_${name}`,
);

export const formulary = createTable("formulary", {
  allergies: varchar("allergies", { length: 255 }),
  associatedTo: integer("associatedTo"),
  coming: boolean("coming").notNull(),
  createdAt: timestamp("createdAt", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  specialMenu: boolean("specialMenu").notNull().default(false),
  specialMenuValue: varchar("specialMenuValue", { length: 255 }),
});

export const formularyRelations = relations(formulary, ({ one }) => ({
  associatedTo: one(formulary, {
    fields: [formulary.associatedTo],
    references: [formulary.id],
  }),
}));

export const selectFormularySchema = createSelectSchema(formulary);
export const selectAllFormularySchema = z.array(selectFormularySchema);
export const selectFormularySchemaWithAssociated = selectFormularySchema.extend(
  {
    associated: z.array(selectFormularySchema),
    createdAt: z.string(),
  },
);
export const selectAllFormularySchemaWithAssociated = z.array(
  selectFormularySchemaWithAssociated,
);
export const insertSingleFormularySchema = createInsertSchema(formulary);
export const insertFormularySchema = z
  .array(createInsertSchema(formulary))
  .max(5);

export type FormularySelect = z.infer<
  typeof selectFormularySchemaWithAssociated
>;

export const musicForm = createTable("music", {
  song: varchar("song", { length: 255 }).notNull(),
  id: serial("id").notNull().primaryKey(),
});

export const selectMusicFormSchema = createSelectSchema(musicForm);
export const selectAllMusicFormSchema = z.array(selectMusicFormSchema);
export const insertMusicFormSchema = createInsertSchema(musicForm).omit({
  id: true,
});

export type MusicFormSelect = z.infer<typeof selectAllMusicFormSchema>;

export const validEmails = createTable("validEmails", {
  email: varchar("email", { length: 255 }).notNull().primaryKey(),
});

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    precision: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("accounts_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
