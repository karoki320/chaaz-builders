"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { BlogPost } from "@/lib/types";

export function BlogPostRow({ post }: { post: BlogPost }) {
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();

  function togglePublish() {
    startTransition(async () => {
      await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${post.title}"?`)) return;
    startTransition(async () => {
      await fetch(`/api/admin/blog/${post.id}`, { method: "DELETE" });
      setDeleted(true);
      router.refresh();
    });
  }

  if (deleted) return null;

  return (
    <div className="border rounded-lg p-4 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-10 h-10 rounded bg-neutral-100 flex items-center justify-center overflow-hidden shrink-0">
          {post.cover_image_url ? (
            <Image src={post.cover_image_url} alt={post.title} fill sizes="40px" className="object-cover" />
          ) : (
            <span>{post.cover_icon ?? "📝"}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">{post.title}</p>
          <p className="text-sm text-neutral-500">{post.published ? "Published" : "Draft"}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={togglePublish}
          disabled={isPending}
          className="flex-1 sm:flex-none text-sm border rounded px-3 min-h-[40px]"
        >
          {post.published ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-sm text-red-600 px-3 min-h-[40px]"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
