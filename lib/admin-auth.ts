// PIN-based admin session. Works in both middleware (edge) and route handlers.
// The PIN lives in the ADMIN_PIN environment variable (set it in Vercel) - never in code,
// because the GitHub repo is public. Changing the PIN logs every admin out.

export const ADMIN_COOKIE = "chaaz_admin";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

function secret() {
  const pin = process.env.ADMIN_PIN;
  if (!pin) return null;
  return `${pin}|${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`;
}

async function hmacHex(message: string, key: string) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function isPinConfigured() {
  return Boolean(process.env.ADMIN_PIN);
}

export async function pinMatches(input: string) {
  const pin = process.env.ADMIN_PIN;
  if (!pin) return false;
  // Compare HMACs so the comparison is constant-length and constant-time.
  const [a, b] = await Promise.all([hmacHex(input, "pin-check"), hmacHex(pin, "pin-check")]);
  return safeEqual(a, b);
}

export async function createSessionToken() {
  const key = secret();
  if (!key) throw new Error("ADMIN_PIN is not set");
  const expires = String(Date.now() + ADMIN_SESSION_SECONDS * 1000);
  return `${expires}.${await hmacHex(expires, key)}`;
}

export async function verifySessionToken(token: string | undefined) {
  const key = secret();
  if (!key || !token) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  return safeEqual(sig, await hmacHex(expires, key));
}
