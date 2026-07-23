export function formatKES(amount: number | string) {
  const n = typeof amount === "string" ? parseFloat(amount) : amount;
  return `KES ${n.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Normalizes a Kenyan phone number (e.g. "0741 164235" or "+254741164235")
// into the digits-only international format wa.me links expect.
export function toWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  return digits;
}

export function generateOrderNumber() {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CB-${stamp}-${rand}`;
}
