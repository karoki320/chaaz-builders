"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
    <div className="border rounded-lg p-4 bg-white flex items-center justify-between">
      <div>
        <p className="font-medium">
          {post.cover_icon} {post.title}
        </p>
        <p className="text-sm text-neutral-500">{post.published ? "Published" : "Draft"}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={togglePublish}
          disabled={isPending}
          className="text-sm border rounded px-3 py-1"
        >
          {post.published ? "Unpublish" : "Publish"}
        </button>
        <button onClick={handleDelete} disabled={isPending} className="text-sm text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
