import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getServiceSupabase } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  const supabase = getServiceSupabase();
  const { data } = await supabase.from("categories").select("*").order("name");
  const categories = (data ?? []) as Category[];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
