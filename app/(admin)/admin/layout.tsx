import Link from "next/link";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "🧱" },
  { href: "/admin/orders", label: "Orders", icon: "🧾" },
  { href: "/admin/blog", label: "Blog", icon: "📝" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 border-r bg-neutral-50 p-4 hidden md:block">
        <p className="font-semibold mb-6">Chaaz Admin</p>
        <nav className="flex flex-col gap-2 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-2 rounded hover:bg-neutral-200">
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-6">{children}</main>

      {/* Mobile bottom tab bar - sidebar is md:block only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t flex">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[56px] text-xs text-neutral-600"
          >
            <span className="text-lg">{l.icon}</span>
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
