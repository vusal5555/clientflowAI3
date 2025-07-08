import { NextRequest, NextResponse } from "next/server";
import getUser from "@/actions/getUser";
import db from "@/db";
import { user as userTable } from "@/drizzle/schemas/user";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "No authenticated user" },
      { status: 401 }
    );
  }

  const userData = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, session.user.id));

  if (!userData || userData.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(userData[0]);
}
