import Link from "next/link";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
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
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
