import Link from "next/link";
import { AdminMobileNav } from "./AdminMobileNav";
import { LogoutButton } from "./LogoutButton";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/products", label: "Products", icon: "box" },
  { href: "/admin/categories", label: "Categories", icon: "folder" },
  { href: "/admin/orders", label: "Orders", icon: "receipt" },
  { href: "/admin/blog", label: "Blog", icon: "document" },
  { href: "/admin/messages", label: "Messages", icon: "chat" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <AdminMobileNav links={links} />

      <aside className="w-56 border-r bg-neutral-50 p-4 hidden md:block">
        <p className="font-semibold mb-6">Chaaz Admin</p>
        <nav className="flex flex-col gap-2 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-2 rounded hover:bg-neutral-200">
              {l.label}
            </Link>
          ))}
          <LogoutButton className="mt-4 px-3 py-2 rounded text-left text-red-600 hover:bg-red-50" />
        </nav>
      </aside>

      <main className="flex-1 p-4 sm:p-6 min-w-0">{children}</main>
    </div>
  );
}
