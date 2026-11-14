import { createHmac, timingSafeEqual } from "node:crypto";

// Signs an order id so the order confirmation page can't be opened by
// guessing sequential ids (it shows the customer's name, phone and address).
function secret() {
  const s = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!s) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return s;
}

export function orderToken(orderId: number | string) {
  return createHmac("sha256", secret()).update(`order:${orderId}`).digest("hex").slice(0, 32);
}

export function verifyOrderToken(orderId: number | string, token: string | undefined | null) {
  if (!token || token.length !== 32) return false;
  const expected = Buffer.from(orderToken(orderId));
  const given = Buffer.from(token);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
