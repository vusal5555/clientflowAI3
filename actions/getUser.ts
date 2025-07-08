"use server";

import db from "@/db";
import { auth } from "@/lib/auth";
import { user as userTable } from "@/drizzle/schemas/user";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userData = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, session?.user?.id as string));
  return userData;
};

export default getUser;
