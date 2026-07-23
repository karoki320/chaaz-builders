import { getServiceSupabase } from "@/lib/supabase/server";
import { CategoryForm } from "./CategoryForm";
import { CategoryRow } from "./CategoryRow";
import type { Category } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const supabase = getServiceSupabase();
  const { data } = await supabase.from("categories").select("*").order("name");
  const categories = (data ?? []) as Category[];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 hidden md:block">Categories</h1>

      <div className="border rounded-lg p-4 bg-white mb-8">
        <h2 className="font-medium mb-3">Add category</h2>
        <CategoryForm />
      </div>

      <div className="space-y-3">
        {categories.map((c) => (
          <CategoryRow key={c.id} category={c} />
        ))}
        {categories.length === 0 && <p className="text-neutral-500">No categories yet.</p>}
      </div>
    </div>
  );
}
