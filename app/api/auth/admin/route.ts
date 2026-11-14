import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  createSessionToken,
  isPinConfigured,
  pinMatches,
} from "@/lib/admin-auth";

// POST { pin } -> sets the admin session cookie. DELETE -> logs out.
export async function POST(req: NextRequest) {
  if (!isPinConfigured()) {
    return NextResponse.json({ error: "Admin PIN is not set up on the server (ADMIN_PIN)." }, { status: 503 });
  }

  const { pin } = await req.json().catch(() => ({ pin: "" }));
  if (typeof pin !== "string" || !(await pinMatches(pin.trim()))) {
    // Slow down guessing.
    await new Promise((r) => setTimeout(r, 1000));
    return NextResponse.json({ error: "Incorrect PIN" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_SECONDS,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
