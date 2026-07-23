import { getServiceSupabase } from "@/lib/supabase/server";
import { toWhatsAppNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const supabase = getServiceSupabase();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  const messages = data ?? [];

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6 hidden md:block">Messages</h1>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="border rounded-lg p-4 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <p className="font-medium">{m.name}</p>
              <p className="text-xs text-neutral-400">
                {new Date(m.created_at).toLocaleString("en-KE")}
              </p>
            </div>
            <p className="text-sm text-neutral-500">
              {m.email && <span>{m.email}</span>}
              {m.email && m.phone && <span> - </span>}
              {m.phone && <span>{m.phone}</span>}
            </p>
            <p className="text-neutral-700 mt-2">{m.message}</p>
            {m.phone && (
              <a
                href={`https://wa.me/${toWhatsAppNumber(m.phone)}?text=${encodeURIComponent(
                  `Hi ${m.name}, thanks for reaching out to Chaaz Builders.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 text-sm text-green-700 underline"
              >
                Reply on WhatsApp
              </a>
            )}
          </div>
        ))}
        {messages.length === 0 && <p className="text-neutral-500">No messages yet.</p>}
      </div>
    </div>
  );
}
