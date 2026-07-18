import { notFound } from "next/navigation";
import { getServiceSupabase } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!data) notFound();
  const post = data as BlogPost;

  return (
    <article className="max-w-2xl mx-auto px-4 py-10">
      {post.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image_url} alt={post.title} className="w-full h-56 object-cover rounded-lg mb-4" />
      ) : (
        <div className="text-4xl mb-3">{post.cover_icon ?? "📝"}</div>
      )}
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-xs text-neutral-400 mt-1 mb-6">
        {new Date(post.created_at).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <div className="prose whitespace-pre-wrap">{post.content}</div>
    </article>
  );
}
