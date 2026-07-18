"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-navy-gradient text-white">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold">Stay in the loop</h2>
        <p className="text-white/70 mt-2">New arrivals, price drops, and project tips - straight to your inbox.</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full px-5 py-3 text-neutral-900 flex-1 max-w-sm focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-green-gradient px-8 py-3 font-semibold shadow-glow-green"
          >
            {status === "sending" ? "Joining..." : "Subscribe"}
          </button>
        </form>
        {status === "sent" && <p className="mt-3 text-accent-light text-sm">You're on the list!</p>}
        {status === "error" && <p className="mt-3 text-red-300 text-sm">Something went wrong, try again.</p>}
      </div>
    </section>
  );
}
