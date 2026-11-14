"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Could not sign in");
        setPin("");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Network error - please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white border p-6 sm:p-8 shadow-soft">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="text-lg font-semibold text-center">Admin access</h1>
        <p className="text-sm text-neutral-500 text-center mt-1 mb-6">Enter your admin PIN to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              autoFocus
              autoComplete="current-password"
              placeholder="PIN"
              aria-label="Admin PIN"
              className="w-full border rounded-xl px-4 py-3 pr-16 text-center tracking-[0.3em] text-lg focus:outline-none focus:ring-2 focus:ring-brand-light"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !pin}
            className="w-full bg-brand-dark text-white py-3 rounded-xl font-medium disabled:opacity-50"
          >
            {loading ? "Checking..." : "Unlock admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
