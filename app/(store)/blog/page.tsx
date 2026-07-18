import Link from "next/link";
import { getServiceSupabase } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as BlogPost[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-6">From the yard</h1>
      {posts.length === 0 ? (
        <p className="text-neutral-500">No posts yet - check back soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition"
            >
              <div className="h-36 bg-neutral-100 flex items-center justify-center">
                {post.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">{post.cover_icon ?? "📝"}</span>
                )}
              </div>
              <div className="p-5">
                <h2 className="font-semibold">{post.title}</h2>
                {post.excerpt && <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{post.excerpt}</p>}
                <p className="text-xs text-neutral-400 mt-2">
                  {new Date(post.created_at).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
