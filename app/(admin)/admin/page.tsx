import { redirect } from "next/navigation";

// /admin on its own has no page - send people to the dashboard
// (the middleware sends anyone without a PIN session to /admin/login first).
export default function AdminIndex() {
  redirect("/admin/dashboard");
}
