"use client";

import { useRouter } from "next/navigation";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  async function logout() {
    await fetch("/api/auth/admin", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button type="button" onClick={logout} className={className}>
      Log out
    </button>
  );
}
