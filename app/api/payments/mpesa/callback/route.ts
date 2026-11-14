import { NextResponse } from "next/server";

// M-Pesa STK push is switched off - all payments are confirmed by staff on WhatsApp.
// This endpoint used to accept unauthenticated "payment succeeded" callbacks that
// could mark any order as paid, so it is disabled until M-Pesa is integrated
// properly (with callback verification).
export async function POST() {
  return NextResponse.json({ ResultCode: 1, ResultDesc: "M-Pesa callbacks are disabled" }, { status: 410 });
}
