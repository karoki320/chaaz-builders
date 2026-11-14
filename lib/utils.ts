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

// Friendly stock label instead of exposing raw inventory numbers.
export function stockLabel(stock: number): { text: string; tone: "ok" | "low" | "out" } {
  if (stock <= 0) return { text: "Out of stock", tone: "out" };
  if (stock <= 5) return { text: `Only ${stock} left`, tone: "low" };
  return { text: "In stock", tone: "ok" };
}

// Capitalizes the first letter of a product name for display ("shower head" -> "Shower head").
export function displayName(name: string) {
  const t = name.trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}
