import db from "@/db";
import { account, session, user, verification } from "@/drizzle/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      account: account,
      session: session,
      verification: verification,
    },
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  api: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});
