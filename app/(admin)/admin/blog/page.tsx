import { getServiceSupabase } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import { BlogForm } from "./BlogForm";
import { BlogPostRow } from "./BlogPostRow";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const supabase = getServiceSupabase();
  const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  const posts = (data ?? []) as BlogPost[];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 hidden md:block">Blog</h1>

      <div className="border rounded-lg p-4 bg-white mb-8">
        <h2 className="font-medium mb-3">New post</h2>
        <BlogForm />
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <BlogPostRow key={post.id} post={post} />
        ))}
        {posts.length === 0 && <p className="text-neutral-500">No posts yet.</p>}
      </div>
    </div>
  );
}
